"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Button, Form } from "react-bootstrap";
import * as client from "../client";
import { addAssignment, updateAssignment, fetchAssignmentsForCourse } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const { assignments, status } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Check if user can edit (FACULTY, ADMIN, or TA)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

  const defaultAssignmentState = {
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "2025-12-31",
    availableFromDate: "2025-01-01",
    availableUntilDate: "2025-12-31",
    course: cid,
  };

  const [assignment, setAssignment] = useState<any>(defaultAssignmentState);

  // Redirect students trying to create new assignments
  useEffect(() => {
    if (!canEdit && aid === "new") {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [canEdit, aid, cid, router]);

  useEffect(() => {
    if (status === "idle" && cid) {
      dispatch(fetchAssignmentsForCourse(cid as string));
    }
  }, [status, cid, dispatch]);

  useEffect(() => {
    if (aid !== "new" && assignments.length > 0) {
      const found = assignments.find((a: any) => a._id === aid);
      if (found) {
        setAssignment(found);
      }
    }
  }, [aid, assignments]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAssignment((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return; // Extra safety check
    try {
      if (aid === "new") {
        const newAssignment = await client.createAssignment(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
      } else {
        await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment:", err);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // If student is viewing an existing assignment, show read-only view
  if (!canEdit && aid !== "new") {
    return (
      <div id="wd-assignments-editor">
        <h3>{assignment.title}</h3>
        <p>{assignment.description}</p>
        <p><strong>Points:</strong> {assignment.points}</p>
        <p><strong>Due:</strong> {assignment.dueDate || "N/A"}</p>
        <p><strong>Available From:</strong> {assignment.availableFromDate || "N/A"}</p>
        <p><strong>Available Until:</strong> {assignment.availableUntilDate || "N/A"}</p>
        <Button variant="secondary" onClick={handleCancel}>Back</Button>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor">
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title"><h3>Assignment Name</h3></Form.Label>
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
          <Form.Label htmlFor="points" className="col-sm-3 col-form-label text-end">Points</Form.Label>
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
          <Button variant="secondary" onClick={handleCancel} className="me-2">Cancel</Button>
          <Button variant="danger" type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}