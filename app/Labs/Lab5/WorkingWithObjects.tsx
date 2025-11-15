"use client";

import { Row, Col, FormControl } from "react-bootstrap";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to React",
    description: "Learn the fundamentals of React, hooks, and state.",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <hr />

      <h4>Module: {module.name}</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary me-2 mb-2"
        href={MODULE_API_URL}
      >
        Get Module
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-info mb-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>

      <h5 className="mt-2">Edit Module Name</h5>
      <Row className="mb-2">
        <Col>
          <FormControl
            id="wd-module-name"
            value={module.name}
            onChange={(e) => setModule({ ...module, name: e.target.value })}
          />
        </Col>
        <Col xs="auto">
          <a
            id="wd-update-module-name"
            className="btn btn-success"
            href={`${MODULE_API_URL}/name/${module.name}`}
          >
            Update Name
          </a>
        </Col>
      </Row>

      <h5 className="mt-3">Edit Module Description</h5>
      <Row className="mb-3">
        <Col>
          <FormControl
            id="wd-module-description"
            as="textarea"
            value={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
          />
        </Col>
        <Col xs="auto">
          <a
            id="wd-update-module-description"
            className="btn btn-warning"
            href={`${MODULE_API_URL}/description/${module.description}`}
          >
            Update Desc
          </a>
        </Col>
      </Row>
      <hr />

      <h4>Assignment: {assignment.title}</h4>
      <a
        id="wd-retrieve-assignment"
        className="btn btn-primary me-2 mb-2"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-info mb-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Assignment Title
      </a>

      <h5 className="mt-2">Edit Assignment Title</h5>
      <Row className="mb-2">
        <Col>
          <FormControl
            id="wd-assignment-title"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Col>
        <Col xs="auto">
          <a
            id="wd-update-assignment-title"
            className="btn btn-success"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
          >
            Update Title
          </a>
        </Col>
      </Row>

      <h5 className="mt-2">Edit Assignment Score</h5>
      <Row className="mb-2">
        <Col>
          <FormControl
            id="wd-assignment-score"
            type="number"
            value={assignment.score}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                score: parseInt(e.target.value),
              })
            }
          />
        </Col>
        <Col xs="auto">
          <a
            id="wd-update-assignment-score"
            className="btn btn-danger"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
          >
            Update Score
          </a>
        </Col>
      </Row>

      <h5 className="mt-3">Edit Assignment Completed Status</h5>
      <Row className="mb-3">
        <Col xs="auto">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-assignment-completed"
              checked={assignment.completed}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  completed: e.target.checked,
                })
              }
            />
            <label
              className="form-check-label"
              htmlFor="wd-assignment-completed"
            >
              Completed
            </label>
          </div>
        </Col>
        <Col>
          <a
            id="wd-update-assignment-completed"
            className="btn btn-dark"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
          >
            Update Completed
          </a>
        </Col>
      </Row>
      <hr />
    </div>
  );
}