import api from '@/services/api';
import { PackageDetailParams } from '@/types/common';



export const PackageDetails = async ({ packageId }: PackageDetailParams) => {
  const response = await api.get(`/student/package-details?packageId=${packageId}`);
  return response.data;
};