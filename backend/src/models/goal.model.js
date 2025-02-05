import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalName: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["in-progress", "achieved"], default: "in-progress" },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", GoalSchema);
