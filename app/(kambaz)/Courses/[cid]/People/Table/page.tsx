"use client";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaUserCircle, FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as enrollmentClient from "../../../../Enrollments/client";
import * as userClient from "../../../../Account/client";
import PeopleDetails from "../Details";

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState("");

  // Check if current user can manage enrollments
  const canManageEnrollments = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // Fetch users enrolled in this course
  const fetchUsers = async () => {
    if (!cid) return;
    try {
      const users = await enrollmentClient.findUsersForCourse(cid as string);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all users (for adding to course)
  const fetchAllUsers = async () => {
    try {
      const users = await userClient.findAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (canManageEnrollments) {
      fetchAllUsers();
    }
  }, [cid]);

  // Enroll a user in this course
  const handleEnrollUser = async () => {
    if (!selectedUserToAdd || !cid) return;
    try {
      await enrollmentClient.enrollUser(selectedUserToAdd, cid as string);
      await fetchUsers();
      setSelectedUserToAdd("");
      setShowAddUser(false);
    } catch (error) {
      console.error(error);
      alert("Failed to enroll user. They may already be enrolled.");
    }
  };

  // Unenroll a user from this course
  const handleUnenrollUser = async (userId: string) => {
    if (!cid) return;
    if (!window.confirm("Are you sure you want to remove this user from the course?")) return;
    try {
      await enrollmentClient.unenrollUser(userId, cid as string);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Get users not enrolled in this course (for dropdown)
  const enrolledUserIds = users.filter(u => u).map(u => u._id);
  const usersNotEnrolled = allUsers.filter(u => !enrolledUserIds.includes(u._id));

  return (
    <div id="wd-people-table">
      {selectedUid && (
        <PeopleDetails
          uid={selectedUid}
          onClose={() => { setSelectedUid(null); fetchUsers(); }}
        />
      )}

      {/* Add User Controls - Only for Faculty/Admin */}
      {canManageEnrollments && (
        <div className="mb-3">
          {!showAddUser ? (
            <Button variant="danger" onClick={() => setShowAddUser(true)}>
              <FaPlus className="me-2" />
              People
            </Button>
          ) : (
            <Row className="align-items-center">
              <Col md={6}>
                <Form.Select
                  value={selectedUserToAdd}
                  onChange={(e) => setSelectedUserToAdd(e.target.value)}
                >
                  <option value="">Select a user to enroll...</option>
                  {usersNotEnrolled.map((user: any) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName} ({user.username}) - {user.role}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Button variant="success" className="me-2" onClick={handleEnrollUser}>
                  Enroll
                </Button>
                <Button variant="secondary" onClick={() => { setShowAddUser(false); setSelectedUserToAdd(""); }}>
                  Cancel
                </Button>
              </Col>
            </Row>
          )}
        </div>
      )}

      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            {canManageEnrollments && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((usr: any) => usr)
            .map((user: any, index: number) => (
              <tr key={user._id || user.id || index}>
                <td
                  className="wd-full-name text-nowrap"
                  onClick={() => setSelectedUid(user._id || user.id)}
                  style={{ cursor: "pointer" }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name text-danger">{user.firstName}</span>{" "}
                  <span className="wd-last-name text-danger">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId || user.username}</td>
                <td className="wd-section">{user.section || "S101"}</td>
                <td className="wd-role">{user.role}</td>
                {canManageEnrollments && (
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUnenrollUser(user._id)}
                    >
                      <FaTrash />
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