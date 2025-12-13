"use client";
import { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import * as client from "../client";
import PeopleDetails from "../../Courses/[cid]/People/Details";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
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
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-users">
      <h3>Users</h3>
      
      {/* PeopleDetails sidebar */}
      {selectedUid && (
        <PeopleDetails
          uid={selectedUid}
          onClose={() => {
            setSelectedUid(null);
            fetchUsers();
          }}
        />
      )}

      {/* Filters and Add Button */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Control
            placeholder="Search by name..."
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={role}
            onChange={(e) => filterUsersByRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </Form.Select>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="danger" onClick={createUser}>
            <FaPlus className="me-2" />
            People
          </Button>
        </Col>
      </Row>

      {/* Users Table */}
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr 
              key={user._id}
              onClick={() => setSelectedUid(user._id)}
              style={{ cursor: "pointer" }}
            >
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name text-danger">{user.firstName}</span>{" "}
                <span className="wd-last-name text-danger">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}