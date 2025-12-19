import mongoose, { Schema, Model, Types } from "mongoose";

export interface ITransaction {
    userId: Types.ObjectId;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: Date;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: [true, "Please provide an amount"],
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: [true, "Please specify transaction type"],
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            maxlength: [200, "Description cannot be more than 200 characters"],
        },
    },
    { timestamps: true }
);

const Transaction: Model<ITransaction> =
    mongoose.models.Transaction ||
    mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
