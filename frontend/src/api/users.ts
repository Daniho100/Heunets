import axiosInstance from './axios';

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
