// src/utils/dataUtils.js

export const extractMonthlyInfo = (data) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const monthlyData = {
      months: months,
      income: new Array(12).fill(0),  // Initialize all months with 0 income
      expense: new Array(12).fill(0),  // Initialize all months with 0 expense
      savings: new Array(12).fill(0),  // Initialize all months with 0 savings
    };
  
    // Process Income data
    if (data.Income) {
      data.Income.forEach((item) => {
        const monthIndex = item.month - 1; // month is 1-indexed, so subtract 1 for array index
        monthlyData.income[monthIndex] = item.totalAmount;
      });
    }
  
    // Process Expense data
    if (data.Expense) {
      data.Expense.forEach((item) => {
        const monthIndex = item.month - 1;
        monthlyData.expense[monthIndex] = item.totalAmount;
      });
    }
  
    // Calculate Savings for each month
    monthlyData.savings = monthlyData.income.map((income, index) => {
      return income - monthlyData.expense[index];
    });
  
    return monthlyData;
  };
  