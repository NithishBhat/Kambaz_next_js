"use client";
import { FormControl} from "react-bootstrap";
import { Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {  Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignments = db.assignments.filter((a) => a.course === cid && a._id===aid);
    console.log(assignments)
  return (
    <Form>
    <div id="wd-assignments-editor">
      
      <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
      <FormControl id="wd-name" placeholder="A1" className="mb-2" value={assignments[0].title}/>
      <FormControl id="wd-name" placeholder="The assignment is available online Submit a link to the landing page of
      The assignment is available online Submit a link to the landing page of
      The assignment is available online Submit a link to the landing page of
      The assignment is available online Submit a link to the landing page of"
       className="mb-2" as="textarea" value={assignments[0].description} cols={80} rows={10}/>
      <div className="container text-end">
  <div className="row mb-3">
    <label htmlFor="wd-points" className="col-sm-3 col-form-label">Points</label>
    <div className="col-sm-9">
      <FormControl id="wd-points" placeholder="100" value={assignments[0].points} />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="wd-group" className="col-sm-3 col-form-label">Assignment Group</label>
    <div className="col-sm-9">
      <Form.Select id="wd-group"  defaultValue="ASSIGNMENT">
        <option>ASSIGNMENT</option>
        <option>QUIZ</option>
        <option>EXAM</option>
      </Form.Select>
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="wd-display" className="col-sm-3 col-form-label">Display Grade as</label>
    <div className="col-sm-9">
      <Form.Select id="wd-display"  defaultValue="Percentage">
        <option>Percentage</option>
        <option>Complete/Incomplete</option>
        <option>Points</option>
      </Form.Select>
    </div>
  </div>

  <div className="row mb-3">
    <label className="col-sm-3 col-form-label">Submission Type</label>
    <div className="col-sm-9">
      <div className="border p-3 text-start" >
        <Form.Select  className="mb-3" defaultValue="Online">
          <option>Online</option>
          <option>On Paper</option>
          <option>External Tool</option>
        </Form.Select>
        
        <label className="mb-2 fw-bold">Online Entry Options</label>
        <Form.Check label="Text Entry" className="mb-2" />
        <Form.Check label="Website URL" className="mb-2" />
        <Form.Check label="Media Recordings" className="mb-2" />
        <Form.Check label="Student Annotation" className="mb-2" />
        <Form.Check label="File Uploads" />
      </div>
      
      </div>
      </div>
       <div className="row mb-3 ">
    <label className="col-sm-3 col-form-label">Assign</label>
    <div className="col-sm-9 text-start">
      <div className="border p-3">
       
        <label className="mb-2 fw-bold">Assign to</label>
         <Form.Select as="select" className="mb-3" defaultValue="Online">
          <option>EveryOne</option>
          <option>On Paper</option>
          <option>External Tool</option>
        </Form.Select>
        <label className="mb-2 fw-bold">Due</label>
        <Form.Control type="date" className="mb-3" value={assignments[0].due} />
        <div className="row mb-3">
        <div className="col">
          <label className="mb-2 fw-bold">Available From</label>
          <Form.Control type="date" value={assignments[0].available} />
        </div>

        <div className="col">
          <label className="mb-2 fw-bold">Until</label>
          <Form.Control type="date" />
        </div>
      </div>
      </div>
      
      </div>

      </div>
      <hr/>
      <div className="Row">
              <Button className="btn btn-secondary w-2 mb-2 me-2" href={`/Courses/${cid}/Assignments`}>Cancel</Button>
              <Button className="btn btn-danger w-2 mb-2 me-2" type="submit">Save</Button>
      </div>
</div>


    </div>
    </Form>
);}
