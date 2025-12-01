import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from 'react-icons/bs';

export default function ModuleControlButton({ moduleId, deleteModule, editModule, publishModule }: 
{ moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; publishModule: (moduleId: string) => void; }) {

  return (
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <span onClick={() => publishModule(moduleId)}>
        <GreenCheckmark />
      </span>
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}