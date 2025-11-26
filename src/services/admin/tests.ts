import api from '@/services/api';
import { PaginationParams } from '@/types/common';

export const testList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/tests?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};

export const TestQuestions = async (testId:String) => {
  const response = await api.get(`/admin/tests/${testId}/viewquestion`);
  return response.data;
};

export const fetchAvailableSubjects = async () => {
  const response = await api.get(`/admin/misc/subjects`);
  return response.data;
};

export const createTest = async (data:Partial<Course>) => {
  return api.post(`/admin/tests/addtest`, data);
};

export const addSubjecttoTest = async (data: any) => {
  return api.post(`/admin/tests/addsubjecttotest`, data);
}

export const fatchTestSubject = async (testId:String) =>{
  return api.get(`/admin/tests/fatchTestSubject/${testId}`);
}

export async function deleteQuestionFromSubject(
  testId: string,
  subjectId: string,
  questionId: string
) {
  return api.delete(`/admin/tests/${testId}/subjects/${subjectId}/questions/${questionId}`);
}


export async function fetchTestQuestionsBySubject(
  testId: string,
  subjectId: string
) {
  try {
    const res = await api.get(
      `/admin/tests/${testId}/subjects/${subjectId}/questions`
    );
    return { status: true, data: res.data };
  } catch (err) {
    console.error("Failed to fetch questions", err);
    return { status: false, data: null };
  }
}

// -------------------------------
// Add a question to a subject
// -------------------------------
export async function addQuestionToSubject(
  testId: string,
  subjectId: string,
  payload: any
) {
  try {
    const res = await api.post(
      `/admin/tests/${testId}/subjects/${subjectId}/questions`,
      payload
    );
    return { status: true, data: res.data };
  } catch (err) {
    console.error("Failed to add question", err);
    return { status: false };
  }
}

// -------------------------------
// Update existing question
// -------------------------------
export async function updateQuestionInSubject(
  testId: string,
  subjectId: string,
  payload: any
) {
  try {
    const res = await api.put(
      `/admin/tests/${testId}/subjects/${subjectId}/questions/${payload._id}`,
      payload
    );
    return { status: true, data: res.data };
  } catch (err) {
    console.error("Failed to update question", err);
    return { status: false };
  }
}


interface Course {
  name: string;
  description?: string;
  duration?: number;
  categoryId?: string;
}