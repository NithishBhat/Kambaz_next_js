"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { FormControl, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    course: cid as string,
    due: "",
    available: "",
    points: 100,
  });

  useEffect(() => {
    if (!isNew && existingAssignment) {
      setAssignment(existingAssignment);
    } else if (isNew) {
      setAssignment({
        _id: new Date().getTime().toString(),
        title: "New Assignment",
        description: "",
        course: cid as string,
        due: "",
        available: "",
        points: 100,
      });
    }
  }, [aid, existingAssignment, isNew, cid]);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label"><strong>Assignment Name</strong></label>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label"><strong>Description</strong></label>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        />
      </div>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="number"
            id="wd-points"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </Col>
        <Col md={9}>
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
          </select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
        </Col>
        <Col md={9}>
          <select id="wd-display-grade-as" className="form-select" defaultValue="PERCENTAGE">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
          </select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
        </Col>
        <Col md={9}>
          <select id="wd-submission-type" className="form-select" defaultValue="ONLINE">
            <option value="ONLINE">Online</option>
            <option value="PAPER">Paper</option>
          </select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}></Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <label className="form-label"><strong>Online Entry Options</strong></label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-text-entry" />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-website-url" defaultChecked />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-file-upload" />
              <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="date"
            id="wd-available-from"
            value={assignment.available}
            onChange={(e) => setAssignment({ ...assignment, available: e.target.value })}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end">
          <label htmlFor="wd-due-date" className="form-label">Due Date</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="date"
            id="wd-due-date"
            value={assignment.due}
            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
          />
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}