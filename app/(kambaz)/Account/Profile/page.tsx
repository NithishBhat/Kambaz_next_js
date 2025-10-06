import Link from "next/link";
import {Form ,FormControl} from "react-bootstrap";
export default function Profile() {
  return (
    <div className="col-5 align-items-center">
      <h1>Profile</h1>

      <FormControl id="wd-username"
             placeholder="Alice"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="123" type="password"
             className="mb-2"/>
      <FormControl id="wd-firstname"
             placeholder="Alice"
             className="mb-2"/>
      <FormControl id="wd-lastname"
             placeholder="Wonderland"
             className="mb-2"/>
      <FormControl id="wd-date"
             placeholder="DD/MM/YYYY" type="date"
             className="mb-2"/>
      <FormControl id="wd-email"
             placeholder="alice@wonderland"
             className="mb-2"/>
      <Form.Select id="wd-role" className="mb-2" defaultValue="FACULTY">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>
      <Link id="wd-signout-btn"
            href="/Account/signin"
            className="btn btn-danger w-100 mb-2 ">
            Signout </Link>

    </div>
);}
