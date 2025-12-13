"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import { profile } from "./Account/client";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("SessionProvider: Checking session...");
        const currentUser = await profile();
        console.log("SessionProvider: Got user:", currentUser);
        dispatch(setCurrentUser(currentUser));
      } catch (error) {
        console.log("SessionProvider: Error:", error);
        dispatch(setCurrentUser(null));
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}