import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModule = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};

export const updateModule = async (module: any) => {
  const response = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};