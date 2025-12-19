import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        targetAmount: {
            type: Number,
            required: true,
        },
        currentAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        deadline: {
            type: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
