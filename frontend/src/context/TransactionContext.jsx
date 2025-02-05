import React, { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { showErrorToast, showSuccessToast } from "../components/toastify";
import { processYearlyData } from "../utils/processYearlyData";
import { extractMonthlyInfo } from "../utils/processMonthly";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear()); // Default year: current year
  const [processedData, setProcessedData] = useState({});
  const [month, setMonth] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance().get("/transactions/summary"); // API request
        const data = response.data.summary;
        setTransactions(data);
        setIsLoading(false);

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

  // Process yearly and monthly data when transactions or year changes
  useEffect(() => {
    if (!transactions || Object.keys(transactions).length === 0) return;

    const yearlyData = processYearlyData(transactions, year);
    const monthlyData = extractMonthlyInfo(yearlyData);

    setProcessedData(yearlyData);
    setMonth(monthlyData);
  }, [transactions, year]); // Runs when transactions or year changes

  return (
    <TransactionContext.Provider value={{ transactions, isLoading, year, setYear, processedData, month }}>
      {children}
    </TransactionContext.Provider>
  );
};
