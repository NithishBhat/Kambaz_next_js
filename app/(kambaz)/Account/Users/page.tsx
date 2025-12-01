"use client";
import { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaPlus, FaUser, FaCheck, FaTrash, FaPencilAlt } from "react-icons/fa";
import * as client from "../client";
import { useRouter } from "next/navigation";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  
  // State for the user currently being edited/created
  const [user, setUser] = useState<any>({
    username: "", password: "", firstName: "", lastName: "", role: "STUDENT", email: ""
  });

  const router = useRouter();

  const fetchUsers = async () => {
    const users = await client.findAllUsers(); //heelo
    setUsers(users);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = await client.createUser(user);
    setUsers([...users, newUser]);
    // Reset form
    setUser({ username: "", password: "", firstName: "", lastName: "", role: "STUDENT", email: "" });
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    setUsers(users.filter((u) => u._id !== uid));
  };

  const updateUser = async () => {
    const updatedUser = await client.updateUser(user);
    setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
    // Reset form after update
    setUser({ username: "", password: "", firstName: "", lastName: "", role: "STUDENT", email: "" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Users</h3>
        {/* Toggle between Create and Update buttons based on whether we have an ID */}
        {user._id ? (
           <Button variant="warning" onClick={updateUser}>
             <FaCheck className="me-2" /> Update User
           </Button>
        ) : (
           <Button variant="success" onClick={createUser}>
             <FaPlus className="me-2" /> Add User
           </Button>
        )}
      </div>
      
      <Row className="mb-3 mt-3">
        <Col md={12}>
           {/* Form to Create/Edit User */}
           <div className="d-flex gap-2 mb-3">
             <Form.Control 
                placeholder="First Name" 
                value={user.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value})} 
             />
             <Form.Control 
                placeholder="Last Name" 
                value={user.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value})} 
             />
             <Form.Control 
                placeholder="Username" 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})} 
             />
             <Form.Control 
                placeholder="Password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})} 
             />
             <Form.Select
                value={user.role}
                onChange={(e) => setUser({...user, role: e.target.value})}
             >
                <option value="STUDENT">Student</option>
                <option value="TA">TA</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
             </Form.Select>
           </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={role}
            onChange={(e) => filterUsersByRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            placeholder="Search people"
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u._id}>
              <td>
                <FaUser className="me-2 fs-1 text-secondary" />
                {u.firstName} {u.lastName}
              </td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => setUser(u)}>
                  <FaPencilAlt />
                </Button>
                <Button variant="danger" onClick={() => deleteUser(u._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}