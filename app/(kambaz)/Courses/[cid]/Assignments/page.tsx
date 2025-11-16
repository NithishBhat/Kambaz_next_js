"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../../store";
import { Button } from "react-bootstrap";
import { useEffect } from "react"; // Import useEffect

// Import the new client and async actions
import * as client from "./client";
import { deleteAssignment, fetchAssignmentsForCourse } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>(); // Use <any> for dispatching thunks

  // 1. Fetch data on component load
  useEffect(() => {
    if (cid) {
      dispatch(fetchAssignmentsForCourse(cid as string));
    }
  }, [cid, dispatch]);

  // 2. Get data from Redux state
  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  // 3. Update handleDelete to call client API first
  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await client.deleteAssignment(assignmentId); // Call API
        dispatch(deleteAssignment(assignmentId)); // Update Redux
      } catch (err) {
        console.error("Failed to delete assignment", err);
      }
    }
  };

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <Button
        id="wd-add-assignment"
        onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        className="float-end"
      >
        + Assignment
      </Button>
      <Button id="wd-add-assignment-group" className="float-end me-2">
        + Group
      </Button>

      <h3 id="wd-assignments-title">ASSIGNMENTS 40% of Total <button>+</button></h3>
      <ul id="wd-assignment-list" className="list-group">
        {assignments.map((assignment: any) => (
          <li
            key={assignment._id}
            className="wd-assignment-list-item list-group-item"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link"
                >
                  {assignment.title}
                </Link>
                <br />
                <small>
                  Mutliple Modules | <strong>Not Available Until</strong>{" "}
                  {assignment.availableFromDate} |
                  <br />
                  <strong> Due</strong> {assignment.dueDate} | {assignment.points} pts
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