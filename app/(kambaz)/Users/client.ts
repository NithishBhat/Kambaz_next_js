import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
const USERS_API = `${API_BASE}/api/users`;
const COURSES_API = `${API_BASE}/api/courses`;

export const findUsersForCourse = async (cid: string) => {
  const response = await axios.get(`${COURSES_API}/${cid}/users`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (uid: string) => {
  const response = await axios.delete(`${USERS_API}/${uid}`);
  return response.data;
};