import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import InputGroupText from "react-bootstrap/InputGroup";

export default function AssignmentControl(){
    return(
        <div className="row ">
            <div className="col-auto align-items-center">

                  <InputGroup>
                  <InputGroupText>
                    <AiOutlineSearch className="position-relative me-2"  style={{ bottom: "1px" }} />
                  </InputGroupText>
                  <FormControl type="text" placeholder="Search..." />
                  </InputGroup>
                  
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