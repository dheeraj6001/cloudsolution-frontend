import api from '@/services/api';
import { PaginationParams } from '@/types/common';

export const studentList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/students?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const deleteStudent = async ({sid} : { sid :string}) => {
  const response = await api.delete(`/admin/students/${sid}`);
  return response;
}

export const deleteStudentsBulk = async (ids: string[]) => {
  return await api.post('/admin/students/delete-multiple', { ids });
};