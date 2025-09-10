// src/api/api.js
import axios from "axios";

const API_BASE = "https://survey-server-m884.onrender.com/api"; // đổi lại nếu backend chạy trong Docker

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để log lỗi chi tiết
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ⚡ Sửa key gửi đúng với backend
export const apiRegister = (email, password) =>
  axiosClient
    .post("/auth/register", { email, mat_khau: password })
    .then((res) => res.data);

export const apiLogin = (email, password) =>
  axiosClient
    .post("/auth/login", { email, mat_khau: password })
    .then(res => res.data);
    

export const apiGetMe = (token) =>
  axiosClient
    .get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default axiosClient;
