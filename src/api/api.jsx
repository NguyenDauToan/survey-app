// src/api/index.js
const API_BASE = "http://localhost:8081/api";

export const apiRegister = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Đăng ký thất bại!");
  }

  return res.json();
};

export const apiLogin = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Đăng nhập thất bại!");
  }

  return res.json();
};

export const apiGetMe = async (token) => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy thông tin user!");
  }

  return res.json();
};
