"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Transaction from "@/models/Transaction";
import { revalidatePath } from "next/cache";

export async function getDashboardStats() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    const transactions = await Transaction.find({ userId: session.user.id });

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    const recentTransactions = await Transaction.find({ userId: session.user.id })
        .sort({ date: -1 })
        .limit(5);

    // Aggregate transactions by date for the last 30 days
    const chartDataMap = new Map<string, { date: string; income: number; expenses: number }>();

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., "Jan 1"
        // Use a key that sorts correctly or just rely on insertion order for now (last 30 days)
        chartDataMap.set(dateStr, { date: dateStr, income: 0, expenses: 0 });
    }

    transactions.forEach((t) => {
        const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (chartDataMap.has(dateStr)) {
            const entry = chartDataMap.get(dateStr)!;
            if (t.type === "income") {
                entry.income += t.amount;
            } else {
                entry.expenses += t.amount;
            }
        }
    });

    const chartData = Array.from(chartDataMap.values());

    return {
        income: totalIncome,
        expenses: totalExpense,
        balance,
        recentTransactions: JSON.parse(JSON.stringify(recentTransactions)),
        chartData,
    };
}

export async function getRecentTransactions() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    const transactions = await Transaction.find({ userId: session.user.id })
        .sort({ date: -1 })
        .limit(5);

    // Convert Mongoose documents to plain objects to avoid serialization issues
    return JSON.parse(JSON.stringify(transactions));
}

export async function addTransaction(formData: {
    amount: number;
    type: "income" | "expense";
    category: string;
    description?: string;
    date: Date;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await Transaction.create({
        userId: session.user.id,
        ...formData,
    });

    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    return { success: true };
}

export async function getAllTransactions() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    const transactions = await Transaction.find({ userId: session.user.id })
        .sort({ date: -1 });

    return JSON.parse(JSON.stringify(transactions));
}

export async function updateTransaction(
    id: string,
    formData: {
        amount: number;
        type: "income" | "expense";
        category: string;
        description?: string;
        date: Date;
    }
) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await Transaction.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        formData
    );

    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    return { success: true };
}


export async function getTransactionsByDate(startDate: Date, endDate: Date) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    const transactions = await Transaction.find({
        userId: session.user.id,
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    }).sort({ date: -1 });

    return JSON.parse(JSON.stringify(transactions));
}
