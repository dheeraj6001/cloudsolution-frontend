import api from '@/services/api';
import { PaginationParams,Course } from '@/types/common';


export const courseList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/misc/courses?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const updateCourse = async (id: string, data: Partial<Course>) => {
  return api.put(`/admin/misc/course/${id}`, data);
};

export const deleteCourse = async ({courseId} : { courseId: String }) => {
  return api.delete(`/admin/misc/course/${courseId}`);
}

export const createCourse = async (data:Partial<Course>) => {
  return api.post(`/admin/misc/course`, data);
};

export const createSubject = async (data:Partial<Course>) => {
  return api.post(`/admin/misc/subjects`, data);
};


export const subjectList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/subjects?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const topicsList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/topicss?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const instatructionList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/instatructions?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const documentsList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/documentss?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const newsList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/newss?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const notificationList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/notifications?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

