"use client";

// Import useRouter for client-side navigation
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";

import Link from "next/link";
import { FormControl, Button, Alert } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  // Add state for handling login errors
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  
  // Get the router instance
  const router = useRouter();

  const handleSignin = async () => {
    try {
      // Reset any previous errors
      setError(null);
      
      const user = await client.signin(credentials);

      if (user) {
        // If user is found, dispatch to Redux store
        dispatch(setCurrentUser(user));
        
        // Use router.push() for client-side navigation
        // This is the correct way to navigate after an event
        router.push("/Dashboard");
      } else {
        // If no user is found, set an error message to display
        setError("Invalid username or password.");
      }
    } catch (err) {
      // Handle any other errors (e.g., network issues)
      setError("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen" className="col-5 align-items-center">
      <h1>Sign in</h1>

      {/* Display the error message if it exists */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <FormControl
        // Use `value` for a controlled component
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        // Use `value` for a controlled component
        value={credentials.password}
        onChange={(e) =>
          // Corrected typo: e.g.target.value -> e.target.value
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Button onClick={handleSignin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>
      <Link href="/Account/Signup" className="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}