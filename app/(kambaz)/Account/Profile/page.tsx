"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
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

  const saveProfile = async () => {
    try {
      await client.updateUser(profile);
      dispatch(setCurrentUser(profile));
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    } catch (error) {
      dispatch(setCurrentUser(null));
      router.push("/Account/Signin");
    }
  };

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl 
            id="wd-username" 
            className="mb-2"
            placeholder="Username"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} 
          />
          <FormControl 
            id="wd-password" 
            className="mb-2"
            placeholder="Password"
            type="password"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} 
          />
          <FormControl 
            id="wd-firstname" 
            className="mb-2"
            placeholder="First Name"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} 
          />
          <FormControl 
            id="wd-lastname" 
            className="mb-2"
            placeholder="Last Name"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} 
          />
          <FormControl 
            id="wd-dob" 
            className="mb-2" 
            type="date"
            value={profile.dob?.substring(0, 10) || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} 
          />
          <FormControl 
            id="wd-email" 
            className="mb-2"
            placeholder="Email"
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
            <option value="TA">TA</option>
          </select>
          <Button 
            onClick={saveProfile} 
            className="w-100 mb-2 btn-primary" 
            id="wd-save-btn"
          >
            Save
          </Button>
          <Button 
            onClick={signout} 
            className="w-100 mb-2 btn-danger" 
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}