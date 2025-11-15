"use client";
import Link from "next/link";
import { useReducer, useEffect, useState } from "react";
import { assignmentsReducer, Assignment } from "../reducer";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

// This is a placeholder. You would get this from a real auth context.
const useUserRole = () => {
  return "faculty"; // Change to "student" to test
};

// Placeholder for your initial data
const initialState = {
  assignments: [
    { id: "123", title: "A1 - CSS + HTML", course: "RS101" },
    { id: "124", title: "A2 - ENV + HTML", course: "RS101" },
    { id: "125", title: "A3 - REACT + HTML", course: "RS101" },
  ],
};

export default function Assignments() {
  const [state, dispatch] = useReducer(assignmentsReducer, initialState);
  const userRole = useUserRole();

  // In a real app, you'd fetch assignments here and use:
  // dispatch({ type: "SET_ASSIGNMENTS", payload: fetchedAssignments });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch({ type: "DELETE_ASSIGNMENT", payload: id });
    }
  };

  return (
    <div id="wd-assignments">
      {/* Search and buttons */}
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      {userRole === "faculty" && (
        <>
          <button id="wd-add-assignment-group">+ Group</button>
          {/* This Link goes to the editor in "create" mode */}
          <Link href="/Courses/1234/Assignments/new">
            <button id="wd-add-assignment">+ Assignment</button>
          </Link>
        </>
      )}

      <h3 id="wd-assignments-title">ASSIGNMENTS 40% of Total</h3>
      <ul id="wd-assignment-list">
        {state.assignments.map((assignment) => (
          <li key={assignment.id} className="wd-assignment-list-item">
            {/* This Link goes to the editor in "edit" mode */}
            <Link
              href={`/Courses/1234/Assignments/${assignment.id}`}
              className="wd-assignment-link"
            >
              {assignment.title}
            </Link>
            {/* ... assignment details ... */}

            {userRole === "faculty" && (
              <span className="float-end">
                <FaPencilAlt className="me-2" />
                <FaTrash
                  onClick={() => handleDelete(assignment.id)}
                  className="text-danger me-2"
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}