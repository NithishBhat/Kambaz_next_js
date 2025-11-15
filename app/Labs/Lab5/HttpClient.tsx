import React, { useEffect, useState } from "react";
import axios from "axios";
// Assuming client.js or similar exists in the same directory
// import * as client from "./client";

// Define HTTP_SERVER, fallback to a default if env var is missing
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

// --- MOCK CLIENT ---
// Mocking the client functions since client.js wasn't provided
// You can replace this with your actual import
const client = {
  fetchWelcomeMessage: async () => {
    try {
      const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
      return response.data;
    } catch (error) {
      console.error("Error fetching welcome message:", error);
      return "Error fetching message";
    }
  },
};
// --- END MOCK CLIENT ---


export default function HttpClient() {
  //
  // FIX 1: Moved useState declarations *inside* the component function.
  //
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [welcomeOnClick, setWelcomeOnClick] = useState("");

  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
    

  };

  const fetchWelcomeOnLoad = async () => {
    const welcome = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(welcome);
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3> <hr />
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>{" "}
      <br />
      Response from server: <b>{welcomeOnClick}</b>
      <h4 className="mt-3">Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}