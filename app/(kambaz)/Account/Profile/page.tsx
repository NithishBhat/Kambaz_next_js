"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl, Alert } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  const handleUpdate = async () => {
    try {
      const updatedUser = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedUser));
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to update profile." });
    }
  };

  const handleSignout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {message && (
        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
          {message.text}
        </Alert>
      )}
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={handleUpdate} className="w-100 mb-2 btn-primary" id="wd-update-btn">
            Update Profile
          </Button>
          <Button onClick={handleSignout} className="w-100 mb-2 btn-danger" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}