import axiosInstance from './axios';

export const getProjects = async () => {
  const response = await axiosInstance.get('/projects');
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: { title: string; description?: string }) => {
  const response = await axiosInstance.post('/projects', data);
  return response.data;
};

export const updateProject = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};
