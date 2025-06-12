// src/utils/axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const axiosInstance = () => {
  return axios.create({
    baseURL, // dynamic URL: uses .env value in production
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // use only if using cookies/session
  });
};
