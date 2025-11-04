import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized - redirect to login");
      }
      if (error.response.status === 500) {
        console.log("Server error");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
