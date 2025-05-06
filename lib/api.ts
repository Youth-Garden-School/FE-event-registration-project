// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Bật interceptor để đính kèm bearer token từ localStorage
api.interceptors.request.use((cfg) => {
  // 1) In ra debug
  const url = `${cfg.baseURL ?? ""}${cfg.url ?? ""}`;
  console.log("⮕ REQUEST:", url);

  // 2) Lấy token từ localStorage (chỉ client)
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("ACCESS_TOKEN");
  }

  // 3) Đính kèm nếu có
  if (token) {
    cfg.headers = {
      ...cfg.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  console.log("⮕ HEADERS:", cfg.headers);
  return cfg;
});

export default api;
