"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input 
          placeholder="Search for Assignments"
          id="wd-search-assignment" 
          className="form-control w-50"
        />
        <div>
          <button className="btn btn-secondary me-2" id="wd-add-assignment-group">+ Group</button>
          {isFaculty && (
            <Link href={`/Courses/${cid}/Assignments/new`} className="btn btn-danger" id="wd-add-assignment">
              + Assignment
            </Link>
          )}
        </div>
      </div>

      <h3 id="wd-assignments-title" className="bg-secondary p-3 ps-2">
        <BsGripVertical className="me-2 fs-3" />
        ASSIGNMENTS 40% of Total
        {isFaculty && <button className="btn btn-sm float-end">+</button>}
      </h3>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {courseAssignments.map((assignment: any) => (
          <ListGroupItem key={assignment._id} className="wd-assignment-list-item p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <div>
                {isFaculty ? (
                  <Link 
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  >
                    {assignment.title}
                  </Link>
                ) : (
                  <span className="fw-bold">{assignment.title}</span>
                )}
                <br />
                <span className="text-muted">
                  Multiple Modules | <strong>Not Available Until</strong> {assignment.available} |{" "}
                  <strong>Due</strong> {assignment.due} | {assignment.points} pts
                </span>
              </div>
            </div>
            {isFaculty && (
              <div className="d-flex align-items-center">
                <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="btn btn-warning me-2">
                  <FaPencilAlt />
                </Link>
                <button 
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(assignment._id)}
                >
                  <FaTrash />
                </button>
                <IoEllipsisVertical className="fs-4" />
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}