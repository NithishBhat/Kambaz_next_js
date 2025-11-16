"use client";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
  Button,
  FormControl,
  CardFooter,
} from "react-bootstrap";
import { useState, useEffect } from "react"; // 1. Import useEffect
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import { RootState } from "../store";

// 2. Import the new client and async actions
import * as enrollmentClient from "../Enrollments/client";
import {
  addEnrollment,
  removeEnrollment,
  fetchEnrollmentsForUser,
} from "../Enrollments/reducer";

export default function Dashboard() {
  // --- Redux State ---
  const dispatch = useDispatch<any>(); // 3. Use <any> for dispatching thunks
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  // Get enrollments from Redux store
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  // --- Local State ---
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.png",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] =useState(false);

  // 4. Fetch enrollments when currentUser is available
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchEnrollmentsForUser(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // --- Enrollment Logic (no changes needed) ---
  const userEnrolledCourseIds = enrollments
    .filter((e: any) => e.user === currentUser?._id)
    .map((e: any) => e.course);

  const coursesToDisplay = showAllCourses
    ? courses
    : courses.filter((c: any) => userEnrolledCourseIds.includes(c._id));

  // --- 5. Refactor Event Handlers to be Async ---
  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      try {
        // Call server API first
        const newEnrollment = await enrollmentClient.enrollUser(
          currentUser._id,
          courseId
        );
        // Then update Redux state
        dispatch(addEnrollment(newEnrollment));
      } catch (err) {
        console.error("Failed to enroll:", err);
      }
    } else {
      alert("Please sign in to enroll.");
    }
  };

// This is the NEW corrected code
  const handleUnenroll = async (courseId: string) => {
    // Add this check
    if (!currentUser) {
      console.error("Cannot unenroll: no user logged in.");
      return;
    }
    
    try {
      // Call server API first
      await enrollmentClient.unenrollUser(currentUser._id, courseId);
      // Then update Redux state
      dispatch(removeEnrollment({ user: currentUser._id, course: courseId }));
    } catch (err) {
      console.error("Failed to unenroll:", err);
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  // --- JSX (no changes) ---
  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>
        {currentUser && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end mb-2"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({coursesToDisplay.length}
        )
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToDisplay.map((course: any) => {
            const isEnrolled = userEnrolledCourseIds.includes(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={
                      isEnrolled ? `/Courses/${course._id}/Home` : "/Dashboard"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!isEnrolled) e.preventDefault();
                    }}
                  >
                    <CardImg
                      src={`/images/${course.image}`}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                    </CardBody>
                  </Link>
                  <CardFooter>
                    {isEnrolled ? (
                      <Button
                        variant="danger"
                        className="w-100 mb-2"
                        onClick={() => handleUnenroll(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="w-100 mb-2"
                        onClick={() => handleEnroll(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                    {isFaculty && (
                      <div className="d-flex justify-content-between">
                        <button
                          id="wd-edit-course-click"
                          onClick={() => setCourse(course)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(deleteCourse(course._id))}
                          className="btn btn-danger"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}