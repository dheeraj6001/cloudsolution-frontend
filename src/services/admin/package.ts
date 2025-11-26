import api from '@/services/api';
import { PaginationParams, Course } from '@/types/common';

interface TestSeriesParams {
  currentPage: number;
  pageSize: number;
  tsId: string;
}

export const createTestSeries = async (data: Partial<Course>) => {
  return api.post(`/admin/package/addtestseries`, data);
};

export const testSeriesList = async ({ currentPage, pageSize }: PaginationParams) => {
  const response = await api.get(
    `/admin/package/getTestSeries?page=${currentPage}&limit=${pageSize}`
  );
  return response.data;
};

export const deleteTestSeries = async ({ tsId }: { tsId: string }) => {
  const response = await api.delete(`/admin/package/deleteTestSeries/${tsId}`);
  return response;
};

export const getTestsByTestSeriesId = async ({
  currentPage,
  pageSize,
  tsId,
}: TestSeriesParams) => {
  const response = await api.get(
    `/admin/package/getTestsByTestSeriesId?tsid=${tsId}&page=${currentPage}&limit=${pageSize}`
  );
  return response.data;
};
