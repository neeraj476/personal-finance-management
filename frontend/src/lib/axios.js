// src/utils/axiosInstance.js
import axios from "axios";

export const axiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:3000/api", // Your API base URL
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, 
  });
};
