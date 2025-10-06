import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";

export default function AssignmentControl(){
    return(
        <div className="row align-items-center">
            <div className="col">
                <FormControl type="text" placeholder="Search..."className="mb-2 w-50  " />
                {/* 
                 <Form>
                  <InputGroup>
                  <InputGroup.Text>
                    <AiOutlineSearch />
                  </InputGroup.Text>
                  <FormControl type="text" placeholder="Search..." />
                  </InputGroup>
                </Form>*/}
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