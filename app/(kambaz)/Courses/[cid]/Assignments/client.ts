import axios from "axios";

// Make sure your .env.local file has NEXT_PUBLIC_API_BASE=http://localhost:4000
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
const ASSIGNMENTS_API = `${API_BASE}/api/assignments`;
const COURSES_API = `${API_BASE}/api/courses`;

export const findAssignmentsForCourse = async (cid: string) => {
  const response = await axios.get(`${COURSES_API}/${cid}/assignments`);
  return response.data;
};

export const createAssignment = async (cid: string, assignment: any) => {
  const response = await axios.post(`${COURSES_API}/${cid}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (aid: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${aid}`);
  return response.data;
};