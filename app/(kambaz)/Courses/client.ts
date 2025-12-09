import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchAllCourses = async () => {
  const response = await axiosWithCredentials.get(COURSES_API);
  return response.data;
};

export const fetchCourseById = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(COURSES_API, course);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};