import api from '@/services/api';
import { PaginationParams } from '@/types/common';


export const freetestList = async ({ currentPage, pageSize }: PaginationParams) => {
  const response = await api.get(`/student/tests?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};
export const bookmarksQuestion = async ({ currentPage, pageSize }: PaginationParams) => {
  const response = await api.get(`/student/tests/bookmarked-question?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const viewReports = async ({ TestID }: { TestID: string }) => {
  const response = await api.get(`/student/tests/view-reports?testId=${TestID}`);
  return response.data;
};

export const reports = async ({ currentPage, pageSize }: PaginationParams) => {
  const response = await api.get(`/student/reports?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};


