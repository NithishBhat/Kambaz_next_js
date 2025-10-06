import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function AccountNavigation() {
 return (
   <div>
       <ListGroup >

      <ListGroupItem className="border-0 bg-white text-center border-start border-2 border-dark rounded-0">
       <Link href="/Account/Signin" id="wd-account-link" className="text-black text-decoration-none ">
         Signin
       </Link>
      </ListGroupItem>
       <ListGroupItem className="border-0 bg-white text-center">
       <Link href="/Account/Signup" id="wd-account-link" className="text-danger text-decoration-none">
         Signup
       </Link>
      </ListGroupItem>
       <ListGroupItem className="border-0 bg-white text-center">
       <Link href="/Account/Profile" id="wd-account-link" className="text-danger text-decoration-none">
         Profile
       </Link>
      </ListGroupItem>
      </ListGroup>
   </div>
);}
