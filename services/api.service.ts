import { deleteItem, getItem } from "@/helpers/localstorage.helper";
import axios from "axios";

// Base URL API (gantilah sesuai API-mu)
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan Interceptor untuk Request
api.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token?.token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Tambahkan Interceptor untuk Response
api.interceptors.response.use(
  (response) => response, // Jika response sukses, langsung dikembalikan
  (error) => {
    if (error.response?.status === 401) {
      // Jika token expired atau tidak valid, hapus token dan redirect ke login
      deleteItem("token");
      window.location.href = "/login"; // Sesuaikan dengan halaman login Anda
    }
    return Promise.reject(error);
  }
);

export default api;
