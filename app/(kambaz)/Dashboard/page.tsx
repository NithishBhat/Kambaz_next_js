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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as courseClient from "../Courses/client";
import * as enrollmentClient from "../Enrollments/client";

export default function Dashboard() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.jpg",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const fetchCourses = async () => {
    try {
      const coursesData = await courseClient.fetchAllCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      if (currentUser) {
        const enrollmentsData = await enrollmentClient.fetchEnrollments(currentUser._id);
        setEnrollments(enrollmentsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    await fetchCourses();
    await fetchEnrollments();
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
    // Refresh enrollments so the new course shows as enrolled immediately
    await fetchEnrollments();
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  // Enroll using new route (Page 245)
  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.enrollUser(currentUser._id, courseId);
    await fetchEnrollments();
  };

  // Unenroll using new route (Page 245)
  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.unenrollUser(currentUser._id, courseId);
    await fetchEnrollments();
  };

  const isFaculty = currentUser?.role === "FACULTY";
  
  const myEnrollments = enrollments.filter((enrollment) => enrollment.user === currentUser?._id);
  const myCourseIds = myEnrollments.map((e) => e.course);
  
  const coursesToDisplay = showAllCourses
    ? courses
    : courses.filter((c) => myCourseIds.includes(c._id));

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        {currentUser && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "My Courses" : "All Courses"}
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
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
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
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({coursesToDisplay.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToDisplay.map((course: any) => {
            const isEnrolled = myCourseIds.includes(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={isEnrolled ? `/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!isEnrolled) e.preventDefault();
                    }}
                  >
                    <CardImg
                      src={`/images/${course.image || "reactjs.jpg"}`}
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
                    {/* Only show Enroll/Unenroll buttons when viewing All Courses */}
                    {showAllCourses && (
                      isEnrolled ? (
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
                      )
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
                          onClick={() => deleteCourse(course._id)}
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