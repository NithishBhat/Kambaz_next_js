import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// 1. Get all enrollments for a user
export const fetchEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/enrollments`);
  return data;
};

// 2. Enroll a user in a course
export const enrollUser = async (userId: string, courseId: string) => {
  const { data } = await axios.post(ENROLLMENTS_API, { user: userId, course: courseId });
  return data;
};

// 3. Unenroll a user from a course
export const unenrollUser = async (userId: string, courseId: string) => {
  // Updated to use URL parameters for clearer deletion
  const { data } = await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return data;
};

// 4. Fetch users for a specific course (For People Table)
export const findUsersForCourse = async (courseId: string) => {
  // FIX: Changed '/people' to '/users' to match your working Server Route
  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`);
  return data;
};