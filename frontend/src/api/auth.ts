import axiosInstance from './axios';

export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};
