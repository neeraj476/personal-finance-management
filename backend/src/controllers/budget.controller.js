import budgetModel from "../models/budget.model.js";

/**
 * @desc Create a new budget for a user
 * @route POST /api/budgets
 * @access Private
 */
export const createBudget = async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from authentication middleware
    const { category, limit, startDate,spent, endDate } = req.body;

    if (!category || !limit || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBudget = new budgetModel({
      userId,
      category,
      limit,
      spent, // Default spent is 0
      startDate: startDate || new Date(), // Default to current date
      endDate,
    });

    await newBudget.save();
    return res.status(201).json({ message: "Budget created successfully", budget: newBudget });
  } catch (error) {
    console.error("Error creating budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get all budgets for a user
 * @route GET /api/budgets
 * @access Private
 */
export const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user?.id;
    const budgets = await budgetModel.find({ userId });

    if (!budgets.length) {
      return res.status(404).json({ message: "No budgets found for this user" });
    }

    return res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get a single budget by ID
 * @route GET /api/budgets/:id
 * @access Private
 */
export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await budgetModel.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Update an existing budget
 * @route PUT /api/budgets/:id
 * @access Private
 */
export const updateBudget = async (req, res) => {
    try {
      const { id } = req.params;
      const { category, limit, startDate, endDate } = req.body;
  
      const updatedBudget = await budgetModel.findByIdAndUpdate(
        id,
        { category, limit, startDate, endDate },
        { new: true, runValidators: true }
      );
  
      if (!updatedBudget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      return res.status(200).json({ message: "Budget updated successfully", budget: updatedBudget });
    } catch (error) {
      console.error("Error updating budget:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  /**
   * @desc Delete a budget
   * @route DELETE /api/budgets/:id
   * @access Private
   */
  export const deleteBudget = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBudget = await budgetModel.findByIdAndDelete(id);
  
      if (!deletedBudget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      return res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
      console.error("Error deleting budget:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  /**
   * @desc Add an expense to a budget
   * @route POST /api/budgets/:id/expense
   * @access Private
   */
  export const addExpense = async (req, res) => {
    try {
      const { id } = req.params; // Budget ID
      const { amount } = req.body; // Expense amount
  
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Valid expense amount is required" });
      }
  
      const budget = await budgetModel.findById(id);
  
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      if (budget.spent + amount > budget.limit) {
        return res.status(400).json({ message: "Expense exceeds budget limit" });
      }
  
      // Update spent amount
      budget.spent += amount;
      await budget.save();
  
      return res.status(200).json({ message: "Expense added successfully", budget });
    } catch (error) {
      console.error("Error adding expense:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  