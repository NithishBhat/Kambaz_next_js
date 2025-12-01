"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as enrollmentClient from "../../../../Enrollments/client";
import PeopleDetails from "../Details"; 

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!cid) return;
    try {
      const users = await enrollmentClient.findUsersForCourse(cid as string);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-people-table">
      {selectedUid && (
        <PeopleDetails 
          uid={selectedUid} 
          onClose={() => { setSelectedUid(null); fetchUsers(); }} 
        />
      )}

      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {/* FIX: Filter out null users (orphaned enrollments) to prevent crash */}
          {users
            .filter((usr: any) => usr) 
            .map((user: any, index: number) => (
            <tr 
              key={user._id || user.id || index}
              onClick={() => setSelectedUid(user._id || user.id)} 
              style={{ cursor: "pointer" }}
            >
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.username}</td>
              <td className="wd-section">S101</td>
              <td className="wd-role">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}