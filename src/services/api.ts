import axios from 'axios';

const API_BASE = 'https://manage-quiz-fastapi.onrender.com';

export const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.params = { ...config.params, token }; // For query params, as per your API
  }
  return config;
});

// Auth APIs
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (username: string, email: string, password: string) =>
  api.post('/auth/register', { username, email, password });

export const logout = (token: string) =>
  api.delete('/auth/logout', { data: { token } });

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (data: any) => api.put('/profile', data);

// Groups
export const createGroup = (data: any) => api.post('/group', data);
export const getMyGroups = () => api.get('/groups');
export const getGroup = (groupId: number) => api.get(`/group/${groupId}`);
export const deleteGroup = (groupId: number) => api.delete(`/group/${groupId}`);
export const joinGroup = (data: any) => api.post('/group/join', data);
export const listGroupMembers = (groupId: number) => api.get(`/group/${groupId}/members`);

// Tasks
export const createTask = (data: any) => api.post('/task', data);
export const listTasks = (groupId: number) => api.get(`/group/${groupId}/tasks`);
export const getTask = (taskId: number) => api.get(`/task/${taskId}`);
export const deleteTask = (taskId: number) => api.delete(`/task/${taskId}`);

// Submissions
export const submitTask = (taskId: number, data: any) => api.post(`/task/${taskId}/submit`, data);
export const listSubmissions = (taskId: number) => api.get(`/task/${taskId}/submissions`);
export const getMySubmission = (taskId: number) => api.get(`/task/${taskId}/my-submission`);
export const updateSubmissionScore = (submissionId: number, data: any) => api.put(`/submission/${submissionId}/score`, data);