"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }: { uid: string; onClose: () => void; }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  // Check if current user can edit/delete
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
  };

  const deleteUser = async () => {
    if (!canEdit) return;
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    if (!canEdit) return;
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      
      <div className="text-center mt-2">
        {!editing && (
          <h4 className="wd-user-name" onClick={() => canEdit && setEditing(true)} style={{ cursor: canEdit ? "pointer" : "default" }}>
            {user.firstName} {user.lastName}
          </h4>
        )}
        {editing && canEdit && (
          <Form.Control
            className="mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          />
        )}
      </div>
      
      <div className="text-center mb-4">
        <span className="wd-role p-1 border rounded fs-6 ps-2 pe-2 text-danger border-danger">
          {user.role}
        </span>
      </div>

      <b>Login ID:</b> <span className="wd-login-id">{user.loginId || user.username}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section || "S101"}</span> <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity || "N/A"}</span> <hr />
      
      {/* Only show edit/delete buttons for Faculty/Admin */}
      {canEdit && (
        <>
          <Button variant="danger" onClick={deleteUser} className="w-100 mb-2">
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setEditing(!editing)} className="w-100 mb-2">
            {editing ? "Cancel Edit" : "Edit"}
          </Button>
          {editing && (
            <Button variant="success" onClick={saveUser} className="w-100">
              Save
            </Button>
          )}
        </>
      )}
      
      {/* Show close button for non-faculty */}
      {!canEdit && (
        <Button variant="secondary" onClick={onClose} className="w-100">
          Close
        </Button>
      )}
    </div>
  );
}