import api from '@/services/api';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post('/admin/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data; // assuming it returns { id, url, name }
};

export const mediaList = async () => {
  const res = await api.get('/admin/media/get-media');
  return res.data; // assuming it returns UploadedImage[]
};
