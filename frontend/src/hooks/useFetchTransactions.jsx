// src/hooks/useFetchTransactions.js
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { showErrorToast, showSuccessToast } from "../components/toastify";
import { processYearlyData } from "../utils/processYearlyData.js"; // Import the new function

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // New state for loading

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance().get("/transactions/summary"); // API URL
        const data = response.data.summary; // Accessing the `summary` field
        setTransactions(data);  // Updating the state with fetched data
        setIsLoading(false); // Set loading to false after data is fetched

        // Process the yearly data and set it to state

        if (!isFetched) {
          showSuccessToast("Transactions fetched successfully");
          setIsFetched(true);
        }
      } catch (error) {
        showErrorToast("Error fetching transactions");
        console.error("Error fetching transactions:", error);
        setIsLoading(false); 
      }
    };

    fetchTransactions();
  }, []); 

  return { transactions, isLoading }; 
};

export default useFetchTransactions;
