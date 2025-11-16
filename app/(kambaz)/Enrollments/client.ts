import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${API_BASE}/api/users`;
const ENROLLMENTS_API = `${API_BASE}/api/enrollments`;

// 1. Get all enrollments for a user
export const findEnrollmentsForUser = async (uid: string) => {
  const response = await axios.get(`${USERS_API}/${uid}/enrollments`);
  return response.data;
};

// 2. Enroll in a course (sends { user, course })
export const enrollUser = async (user: string, course: string) => {
  const response = await axios.post(ENROLLMENTS_API, { user, course });
  return response.data;
};

// 3. Unenroll from a course (sends { user, course } in the body)
export const unenrollUser = async (user: string, course: string) => {
  const response = await axios.delete(ENROLLMENTS_API, {
    data: { user, course },
  });
  return response.data;
};