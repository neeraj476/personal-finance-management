import express from "express";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  addExpense,
} from "../controllers/budget.controller.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

// Middleware to protect routes
router.use(authUser);

// Create a new budget
router.post("/create", createBudget);

// Get all budgets for the authenticated user
router.get("/", getAllBudgets);

// Get a specific budget by ID
router.get("/:id", getBudgetById);

// Update a budget
router.put("/:id", updateBudget);

// Delete a budget
router.delete("/:id", deleteBudget);

// Add an expense to a budget
router.post("/:id/expense", addExpense);

export default router;
