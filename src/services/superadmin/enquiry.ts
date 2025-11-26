import axios from '../axiosClient';

export const fetchEnquiries = async (page = 1, limit = 10) => {
  const res = await axios.get(`/superadmin/enquiry?page=${page}&limit=${limit}`);
  return res.data; // Expected: { results: Enquiry[], totalPages: number, currentPage: number }
};

export const deleteEnquiry = async (id: number) => {
  const res = await axios.delete(`/superadmin/enquiry/${id}`);
  return res.data;
};

export const replyToEnquiry = async (id: number, message: string) => {
  const res = await axios.post(`/superadmin/enquiry/${id}/reply`, { message });
  return res.data;
};
