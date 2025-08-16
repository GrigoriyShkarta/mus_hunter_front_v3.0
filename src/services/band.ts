import { CreateBandFormData } from '@/lib/validations';
import axiosInstance from '@/services/axios';

export async function createBand(
  data: CreateBandFormData
): Promise<{ id: string }> {
  let body: BodyInit;
  let headers = {};

  if (data?.avatar) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data?.description ?? '');
    formData.append('city', data.city ? `${data.city}` : '');
    formData.append('avatar', data.avatar);
    data?.styles?.forEach((style) =>
      formData.append('styles[]', style ? `${style}` : '')
    );
    data?.links?.forEach((link) => formData.append('links[]', link));
    body = formData;
    headers = { 'Content-Type': 'multipart/form-data' };
  } else {
    body = JSON.stringify(data);
    headers = { 'Content-Type': 'application/json' };
  }

  return await axiosInstance.post(`/band/create`, body, { headers });
}
