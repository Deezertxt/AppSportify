import axios from 'axios';

const baseURL =  "http://localhost:3000"

const api = axios.create({
    baseURL: baseURL,
    responseType: "json",
    withCredentials: true,

    timeout: 100000,

});

export default api;

export const getTasks = (id) => api.get(`/api/user/get/${id}`);
export const getTask = (id) => api.get(`/api/task/get/${id}`);
export const createTask = (data) => api.post("/api/task/create", data);
export const updateTask = (id, data) => api.put(`/api/task/update/${id}`, data);
export const deleteTask = (id) => api.delete(`/api/task/delete/${id}`);
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const logout = () => api.get("/api/user/logout");
export const getUser = () => api.get("/api/user/get");
export const getCategories = () => api.get("/api/category/get");
export const createCategory = (data) => api.post("/api/category/create", data);
export const updateCategory = (id, data) => api.put(`/api/category/update/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/category/delete/${id}`);
export const getUploads = () => api.get("/api/upload/get");
export const uploadFilesToFirebase = (data) => api.post("/api/uploads/upload", data);
export const getAudiobooks = () => api.get("/api/audiobook/get");
export const getAudiobookById = (id) => api.get(`/api/audiobook/get/${id}`);
export const createAudiobook = (data) => api.post("/api/audiobook/register", data);
export const updateAudiobook = (id, data) => api.put(`/api/audiobook/update/${id}`, data);
export const deleteAudiobook = (id) => api.delete(`/api/audiobook/delete/${id}`);
export const getAudiobooksByCategory = (id) => api.get(`/api/audiobook/get/category/${id}`);
export const getAudiobooksByUser = (id) => api.get(`/api/audiobook/get/user/${id}`);
export const getAudiobooksByTitle = (title) => api.get(`/api/audiobook/get/title/${title}`);
export const getAudiobooksByAuthor = (author) => api.get(`/api/audiobook/get/author/${author}`);    
export const getAudiobooksByDescription = (description) => api.get(`/api/audiobook/get/description/${description}`);