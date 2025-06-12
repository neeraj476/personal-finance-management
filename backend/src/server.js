import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import userRouter from "./routes/user.router.js";  // Import user routes
import connectDB from "./db/db.js";  // Database connection
import authUser from "./middleware/authUser.js";  // Authentication middleware
import transactionRouter from "./routes/transaction.router.js";
import budgetRouter from './routes/budget.router.js'
const app = express();

app.use(cors({ origin: "*", credentials: true }));  // Allow frontend requests
app.use(express.json());
app.use(cookieParser());

// Use userRouter for user-related routes
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter);
// Protect /authuser route using authUser middleware
app.get('/api/users/authuser', authUser, (req, res) => {
  res.json(req.user);  // Respond with the authenticated user data
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();  // Ensure the database connection is established
  console.log(`🚀 Server running on port ${PORT}`);
});
