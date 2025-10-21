"use client";
import Link from "next/link";
import { FaAngleDown, FaEdit } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import AssignmentControl from "./AssignmentControl";
import AssignmentNav from "./AssignmentNav";
import LessonControlButtons from "../Modules/LessonControlButtons";


export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments">
      <AssignmentControl />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-0 fs-5 border-gray">
          <div className="row g-0 p-3 bg-secondary align-items-center">
            <div className="col-auto">
              <BsGripVertical className="me-2 fs-3" />
            </div>
            <div className="col-auto">
              <FaAngleDown className="me-2 fs-3" />
            </div>
            <div className="col-8">
              <span>ASSIGNMENTS</span>
            </div>
            <div className="col">
              <AssignmentNav />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1"
              >
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <BsGripVertical className="me-2 fs-3" />
                  </div>
                  <div className="col-1">
                    <FaEdit className="me-2 fs-3 text-success" />
                  </div>
                  <div className="col-6">
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none text-dark fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not Available Until</strong>{" "}
                    {new Date(assignment.available).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    | <br />
                    <strong>Due</strong>{" "}
                    {new Date(assignment.due).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    | {assignment.points} pts
                  </div>
                  <div className="col">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
