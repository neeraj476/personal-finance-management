import express from "express";
import { createTransaction, getMaxTenTransactions, getTransactionsSummary } from "../controllers/transaction.controller.js";
import authUser from "../middleware/authUser.js"; 

const router = express.Router();

// Create transaction (Protected Route)
router.use(authUser);
router.post("/create",  createTransaction);
router.get("/recent",  getMaxTenTransactions);
// router.get("/view",  getTransactionsByView);
router.get("/summary" , getTransactionsSummary);

export default router;