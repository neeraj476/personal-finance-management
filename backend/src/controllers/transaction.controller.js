import mongoose from "mongoose";
import transactionModel from "../models/transaction.model.js";

// Create a new transaction (Authenticated User Only)
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const userId = req.user?.id; // Ensure user is authenticated

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (!amount || !type) {
      return res.status(400).json({ message: "Amount and type are required" });
    }

    // Create and save transaction
    const newTransaction = new transactionModel({ userId, amount, type, description });
    await newTransaction.save();

    res.status(201).json({ message: "Transaction created successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch the latest 10 transactions (Authenticated User Only)
export const getMaxTenTransactions = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const transactions = await transactionModel.find({ userId }) // Filter transactions by userId
      .sort({ date: -1 }) // Sort by latest date
      .limit(10); // Limit to max 10 transactions

    res.status(200).json({ message: "Recent transactions fetched (Max 10)", transactions });
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
export const getTransactionsSummary = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Perform aggregation to group by type, year, and month
    const result = await transactionModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // Only logged-in user's transactions
      },
      {
        $project: {
          year: { $year: "$date" }, // Extract the year
          month: { $month: "$date" }, // Extract the month
          type: 1, // Include type (Income or Expense)
          amount: 1, // Include amount
        },
      },
      {
        $group: {
          _id: {
            year: "$year", // Group by year
            type: "$type", // Group by type (Income or Expense)
            month: "$month", // Group by month
          },
          amount: { $push: "$amount" }, // Collect all amounts for this type, month, and year
          NumberOfTransaction: { $sum: 1 }, // Count transactions for this group
          totalAmount: { $sum: "$amount" }, // Sum the total amount for this group
        },
      },
      {
        $group: {
          _id: "$_id.year", // Group by year
          transactions: {
            $push: {
              type: "$_id.type", // Include type
              month: "$_id.month", // Include month
              amount: "$amount", // Include amounts
              NumberOfTransaction: "$NumberOfTransaction", // Include transaction count
              totalAmount: "$totalAmount", // Include total amount
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // Remove _id
          year: "$_id", // Include the year
          transactions: 1, // Include the transactions
        },
      },
    ]);

    // Format the result into the desired structure
    const summary = {
      year: {},
    };

    result.forEach(({ year, transactions }) => {
      const yearSummary = {};
      transactions.forEach(({ type, month, amount, NumberOfTransaction, totalAmount }) => {
        if (!yearSummary[type]) {
          yearSummary[type] = [];
        }
        yearSummary[type].push({
          month,
          amount,
          NumberOfTransaction,
          totalAmount,
        });
      });

      summary.year[year] = {
        summary: yearSummary,
      };
    });

    // Send the formatted response
    res.status(200).json({
      message: "Transaction summary fetched",
      summary,
    });
  } catch (error) {
    console.error("Error fetching transactions summary:", error);
    res.status(500).json({ message: "Failed to fetch transactions summary" });
  }
};
