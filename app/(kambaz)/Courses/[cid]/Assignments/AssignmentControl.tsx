import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaPlus} from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
import InputGroupText from "react-bootstrap/InputGroup";

export default function AssignmentControl(){
    return(
        <div className="row align-items-center g-0">
            
             <div className="col-auto">
                <FaSearch size={38} className="p-1 border border-end-0 rounded "/> 
            </div>
            <div className="col ">
             <FormControl type="search" placeholder="Search..." className=" border border-start-0" />
            </div>
            <div className="col">
           
            <Button variant="secondary" size="lg" className="me-1 float-end"  >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
            <Button variant="danger" size="lg" className="me-1 float-end" >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Button>
            </div>
        </div>
    )
}