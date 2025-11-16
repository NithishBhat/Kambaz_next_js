"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Button, Form } from "react-bootstrap";

// Import new client and async actions
import * as client from "../client";
import {
  addAssignment,
  updateAssignment,
  fetchAssignmentsForCourse,
} from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>();

  // --- Data Fetching ---
  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );
  const status = useSelector(
    (state: RootState) => state.assignmentsReducer.status
  );
  const assignmentToEdit = assignments.find((a: any) => a._id === aid);

  // 1. Fetch assignments if not already loaded (e.g., on page refresh)
  useEffect(() => {
    if (status === 'idle' && cid) {
      dispatch(fetchAssignmentsForCourse(cid as string));
    }
  }, [status, cid, dispatch]);

  // --- Form State ---
  const defaultAssignmentState = {
    _id: "",
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "2025-12-31",
    availableFromDate: "2025-01-01",
    availableUntilDate: "2025-12-31",
    course: cid,
  };

  const [assignment, setAssignment] = useState(defaultAssignmentState);

  // 2. Populate form once data is loaded
  useEffect(() => {
    if (aid !== "new" && assignmentToEdit) {
      setAssignment({
        ...defaultAssignmentState,
        ...assignmentToEdit,
      });
    } else {
      setAssignment({ ...defaultAssignmentState, course: cid as string });
    }
  }, [aid, assignmentToEdit, cid]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setAssignment((prev) => ({ ...prev, [id]: value }));
  };

  // 3. Update handleSave to call client API first
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (aid === "new") {
        const newAssignment = await client.createAssignment(cid as string, assignment);
        dispatch(addAssignment(newAssignment)); // Update Redux
      } else {
        const updatedAssignment = await client.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment)); // Update Redux
      }
      router.push(`/Courses/${cid}/Assignments`); // Navigate back
    } catch (err) {
      console.error("Failed to save assignment", err);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // --- JSX (no changes) ---
  return (
    <div id="wd-assignments-editor">
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">
            <h3>Assignment Name</h3>
          </Form.Label>
          <Form.Control
            id="title"
            value={assignment.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="description"
            rows={5}
            value={assignment.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label htmlFor="points" className="col-sm-3 col-form-label text-end">
            Points
          </Form.Label>
          <div className="col-sm-9">
            <Form.Control
              type="number"
              id="points"
              value={assignment.points}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <div className="border rounded p-3 mb-3">
          <h5>Assign</h5>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="dueDate">Due</Form.Label>
            <Form.Control
              type="date"
              id="dueDate"
              value={assignment.dueDate || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="row">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label htmlFor="availableFromDate">Available From</Form.Label>
              <Form.Control
                type="date"
                id="availableFromDate"
                value={assignment.availableFromDate || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label htmlFor="availableUntilDate">Until</Form.Label>
              <Form.Control
                type="date"
                id="availableUntilDate"
                value={assignment.availableUntilDate || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleCancel} className="me-2">
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}