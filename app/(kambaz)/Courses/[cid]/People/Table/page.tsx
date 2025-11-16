"use client";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../../../store";
import * as client from "../../../../Users/client"; // Import the client
import {
  fetchUsersForCourse,
  addUser,
  removeUser,
  editUser,
  setUser,
  resetUser,
} from "../../../../Users/reducer"; // Import actions

export default function PeopleTable() {
  const { cid } = useParams();
  const dispatch = useDispatch<any>();

  // Get data from Redux
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { users, user } = useSelector(
    (state: RootState) => state.usersReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  // Fetch users on load
  useEffect(() => {
    if (cid) {
      dispatch(fetchUsersForCourse(cid as string));
    }
  }, [cid, dispatch]);

  // --- Handlers for CRUD ---
  const handleCreateUser = async () => {
    try {
      const newUser = await client.createUser(user);
      dispatch(addUser(newUser));
      dispatch(resetUser());
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await client.updateUser(user);
      dispatch(editUser(updatedUser));
      dispatch(resetUser());
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm("Delete this user?")) {
      try {
        await client.deleteUser(uid);
        dispatch(removeUser(uid));
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  // Handler for the form input
  const setFormUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser({ ...user, [e.target.id]: e.target.value }));
  };

  return (
    <div id="wd-people-table">
      {/* === FACULTY: ADD/EDIT FORM === */}
      {isFaculty && (
        <Row className="mb-4">
          <h4>{user._id ? "Edit User" : "Add User"}</h4>
          <Col md={3}>
            <Form.Control id="username" value={user.username} onChange={setFormUser} placeholder="Username" />
          </Col>
          <Col md={3}>
            <Form.Control id="firstName" value={user.firstName} onChange={setFormUser} placeholder="First Name" />
          </Col>
          <Col md={3}>
            <Form.Control id="lastName" value={user.lastName} onChange={setFormUser} placeholder="Last Name" />
          </Col>
          <Col md={3}>
            <Button onClick={handleCreateUser} variant="success" className="me-2">Add</Button>
            <Button onClick={handleUpdateUser} variant="warning" className="me-2">Update</Button>
            <Button onClick={() => dispatch(resetUser())} variant="secondary">Clear</Button>
          </Col>
        </Row>
      )}

      {/* === PEOPLE TABLE === */}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{u.firstName}</span>{" "}
                <span className="wd-last-name">{u.lastName}</span>
              </td>
              <td className="wd-login-id">{u.username}</td>
              <td className="wd-section">S101</td> {/* This is static, update if needed */}
              <td className="wd-role">{u.role}</td>
              {isFaculty && (
                <td className="text-nowrap">
                  <Button
                    onClick={() => dispatch(setUser(u))}
                    variant="warning"
                    size="sm"
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(u._id)}
                    variant="danger"
                    size="sm"

                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}