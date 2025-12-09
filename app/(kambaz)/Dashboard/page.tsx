"use client"
import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addEnrollment } from "../enrollmentsReducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY";

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "reactjs.png", description: "New Description"
  });

  const handleAddCourse = () => {
    const newCourseId = new Date().getTime().toString();
    dispatch(addNewCourse({ ...course, _id: newCourseId }));
    if (currentUser) {
      dispatch(addEnrollment({ user: currentUser._id, course: newCourseId }));
    }
  };

  const filteredCourses = courses.filter((c: any) =>
    currentUser &&
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === c._id
    )
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end mb-2"
                    id="wd-add-new-course-click"
                    onClick={handleAddCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                  onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
            Update </button>
          </h5>

          <FormControl value={course.name} className="mb-2"
               onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl as="textarea" value={course.description} rows={3}
               onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${c._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src={`/images/${c.image}`} variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {c.description} </CardText>
                    <Button variant="primary"> Go </Button>
                    {isFaculty && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(c._id));
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}