// src/utils/fetchTransactions.js
import { axiosInstance } from '../lib/axios';

// Function to fetch recent transactions
export const fetchTransactions = async () => {
  try {
    const response = await axiosInstance().get('/transactions/recent', {
      withCredentials: true, // Ensure cookie authentication
    });

    return response.data.transactions; // Return transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return empty array on failure
  }
};
