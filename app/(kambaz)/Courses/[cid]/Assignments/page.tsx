"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../../store"; 
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import * as client from "./client";
import { deleteAssignment, setAssignments } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const fetchAssignments = async () => {
    if (cid) {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
      } catch (err) {
        console.error("Failed to delete assignment", err);
      }
    }
  };

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" className="form-control w-50 d-inline-block" />
      <Button
        id="wd-add-assignment"
        onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        className="float-end btn-danger"
      >
        + Assignment
      </Button>
      <Button id="wd-add-assignment-group" className="float-end me-2 btn-secondary">
        + Group
      </Button>

      <h3 id="wd-assignments-title" className="mt-3">
        ASSIGNMENTS 40% of Total <Button variant="secondary" size="sm">+</Button>
      </h3>
      <ul id="wd-assignment-list" className="list-group mt-3">
        {assignments.map((assignment: any) => (
          <li
            key={assignment._id}
            className="wd-assignment-list-item list-group-item border-left-green"
            style={{ borderLeft: "3px solid green" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link fw-bold text-black text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <br />
                <small>
                  Multiple Modules | <strong>Not Available Until</strong>{" "}
                  {assignment.availableFromDate || "N/A"} |
                  <br />
                  <strong> Due</strong> {assignment.dueDate || "N/A"} | {assignment.points} pts
                </small>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(assignment._id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}