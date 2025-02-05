export const processYearlyData = (transactions, yearInput) => {
    const yearlySummary = {};  // Object to store yearly data for each year
    console.log(transactions)
    // Ensure the transactions object has a 'year' key and the specified year exists
    if (!transactions.year || !transactions.year[yearInput]) {
        console.log(`No data found for year: ${yearInput}`);
        return {};  // Return empty object if no data is found for the specified year
    }

    const yearData = transactions.year[yearInput].summary;

    // Initialize yearly data with default values
    yearlySummary[yearInput] = {
        Income: [],  // Array to store Income for each year
        Expense: [],  // Array to store Expense for each year
        Savings: 0,  // Total savings for the year
        totalIncome: 0,  // Total income for the year
        totalExpense: 0,  // Total expense for the year
        monthlyIncome: new Array(12).fill(0), // Array to hold monthly income data
        monthlyExpense: new Array(12).fill(0), // Array to hold monthly expense data
        monthlySavings: new Array(12).fill(0), // Array to hold monthly savings
    };

    // Function to process Income or Expense
    const processTransactionData = (transactionData, type) => {
        if (transactionData) {
            transactionData.forEach(({ month, amount, totalAmount }) => {
                // Add the transaction details to the corresponding array
                yearlySummary[yearInput][type].push({
                    month,
                    amount,
                    totalAmount,
                });

                // Update the total income/expense for the year
                yearlySummary[yearInput][`total${type.charAt(0).toUpperCase() + type.slice(1)}`] += totalAmount;

                // Update monthly income/expense
                yearlySummary[yearInput][`monthly${type.charAt(0).toUpperCase() + type.slice(1)}`][month - 1] += totalAmount;
            });
        }
    };

    // Process Income and Expense data
    processTransactionData(yearData.Income, 'Income');
    processTransactionData(yearData.Expense, 'Expense');

    // Calculate yearly savings
    yearlySummary[yearInput].Savings = yearlySummary[yearInput].totalIncome - yearlySummary[yearInput].totalExpense;

    // Calculate monthly savings by subtracting monthly expenses from monthly income
    yearlySummary[yearInput].monthlySavings = yearlySummary[yearInput].monthlyIncome.map((income, index) => {
        return income - yearlySummary[yearInput].monthlyExpense[index];
    });

    return yearlySummary[yearInput];  // Return the aggregated yearly summary with savings
};


