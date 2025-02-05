import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    limit: { type: Number, required: true }, // Budgeted limit
    spent: { type: Number, default: 0 }, // Amount spent
    startDate: { type: Date, default: Date.now }, // Start date of the budget
    endDate: { type: Date, required: true }, // End date of the budget
  },
  { timestamps: true }
);

// Virtual field to calculate remaining budget dynamically
BudgetSchema.virtual("remaining").get(function () {
  return this.limit - this.spent;
});

export default mongoose.model("Budget", BudgetSchema);
