import axios from 'axios';

const baseURL = "http://localhost:3000"

const api = axios.create({
    baseURL: baseURL,
    responseType: "json",
    withCredentials: true,

    timeout: 100000,

});

export default api;

export const registerOrLoginWithGoogle = (data) => api.post("/api/user/registergoogle", data);
export const registerUser = (data) => api.post("/api/user/register", data);
export const getUserById = (id) => api.get(`/api/user/get/${id}`);
export const getUserByEmail = (email) => api.get(`/api/user/getemail/${email}`);
export const updateUser = (id, data) => api.put(`/api/user/put/${id}`, data);
export const deleteUser = (id) => api.delete(`/api/user/delete/${id}`);
export const toggleProfilePrivacy = (id, isPrivate) => {
    return api.patch(`/api/user/privacy/${id}`, { isPrivate });
};

export const uploadFilesToGCS = (data) => api.post("/api/uploads/upload", data);

export const getCategories = () => api.get("/api/category/get");
export const createCategory = (data) => api.post("/api/category/create", data);
export const updateCategory = (id, data) => api.put(`/api/category/update/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/category/delete/${id}`);

export const getAudiobooks = () => api.get("/api/audiobook/get");
export const getAudiobookById = (id) => api.get(`/api/audiobook/get/${id}`);
export const getAudiobooksByCategory = (id) => api.get(`/api/audiobook/get/category/${id}`);
export const createAudiobook = (data) => api.post("/api/audiobook/register", data);
export const updateAudiobook = (id, data) => api.put(`/api/audiobook/update/${id}`, data);
export const deleteAudiobook = (id) => api.delete(`/api/audiobook/delete/${id}`);

export const getFeedbacks = (id) => api.get(`/api/feedback/get/${id}`);
export const createFeedback = (data) => api.post("/api/feedback/subir", data);
export const likeFeedback = (id) => api.patch(`/api/feedback/like/${id}`);
export const deleteFeedback = (id) => api.delete(`/api/feedback/delete/${id}`);

export const getLibrary = (userId) => api.get(`/api/library/fetch/${userId}`);
export const getUserLibraryCategory = (userId, category) => api.get(`/api/library/get/${userId}/${category}`);
export const addBookToLibraryCategory = (data) => api.post("/api/library/add", data);
export const deleteBookFromLibraryCategory = (userId, audiobookId, category) => api.patch(`/api/library/patch/${userId}/${audiobookId}/${category}`);


export const manageBookInLibrary = (data, action) => {
    // Define la URL según la acción requerida
    const endpoint = action === "add" ? "/api/library/add" : "/api/library/remove";

    // Realiza la solicitud al endpoint correspondiente
    return api.post(endpoint, data);
};