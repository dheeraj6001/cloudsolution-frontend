import api from '@/services/api';
import { PaginationParams } from '@/types/common';

export const courseList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/student/tests?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};
