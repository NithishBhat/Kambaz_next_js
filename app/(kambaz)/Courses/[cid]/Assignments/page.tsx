
import Link from "next/link";
import { FaAngleDown } from 'react-icons/fa';
import ModulesControls from "../Modules/ModulesControls";
import ModuleControlButton from "../Modules/ModulesControlButton";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import AssignmentControl from "./AssignmentControl";
import AssignmentNav from "./AssignmentNav";
import { FaEdit } from 'react-icons/fa';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Span } from "next/dist/trace";
export default function Assignments() {
  return (
    <div id="wd-assignments" >
      <AssignmentControl/>
      <br /><br /><br />
      
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroupItem className=" p-0  fs-5 border-gray ">
            <div className="row g-0 p-3  bg-secondary align-items-center"> 
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
              <AssignmentNav/>
              </div>
            </div>
            <ListGroup className="wd-lessons rounded-0 ">
              <ListGroupItem className="wd-lesson p-3 ps-1 ">
              <div className="row align-items-center g-0">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />  
                </div>
                <div className="col-1">
                  <FaEdit className="me-2 fs-3 text-success" />
                </div>
                  <div className="col-6">
                    <Link href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold" >
                    A1
                    </Link>
                    <br/>
                    <span className="text-danger"> Mutliple Modules </span> | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
                    <strong> Due</strong> May 7 at 12:00am | 100 pts
                  </div>
                  <div className="col">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
               <ListGroupItem className="wd-lesson p-3 ps-1 ">
              <div className="row align-items-center g-0">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />  
                </div>
                <div className="col-1">
                  <FaEdit className="me-2 fs-3 text-success" />
                </div>
                  <div className="col-6">
                    <Link href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold" >
                    A2
                    </Link>
                    <br/>
                    <span className="text-danger"> Mutliple Modules </span> | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
                    <strong> Due</strong> May 7 at 12:00am | 100 pts
                  </div>
                  <div className="col">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
               <ListGroupItem className="wd-lesson p-3 ps-1 ">
              <div className="row align-items-center g-0">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />  
                </div>
                <div className="col-1">
                  <FaEdit className="me-2 fs-3 text-success" />
                </div>
                  <div className="col-6">
                    <Link href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold" >
                    A3
                    </Link>
                    <br/>
                    <span className="text-danger"> Mutliple Modules </span> | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
                    <strong> Due</strong> May 7 at 12:00am | 100 pts
                  </div>
                  <div className="col">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
            </ListGroupItem>
            
          
      </ListGroup>
    
    </div>
);}
