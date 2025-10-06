import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from 'react-icons/bs';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";

export default function AssignmentNav() {
  return (
    <div className="float-end">
      <Button variant="bg-secondary" size="lg" className=" border border-2 border-dark rounded-pill " >
                40% of total
              </Button>
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}