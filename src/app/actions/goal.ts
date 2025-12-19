"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Goal from "@/models/Goal";
import { revalidatePath } from "next/cache";

export async function addGoal(formData: {
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: Date;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await Goal.create({
        userId: session.user.id,
        ...formData,
    });

    revalidatePath("/goals");

    return { success: true };
}

export async function getGoals() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    const goals = await Goal.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(goals));
}

export async function updateGoal(
    id: string,
    formData: {
        title: string;
        targetAmount: number;
        currentAmount: number;
        deadline?: Date;
    }
) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await Goal.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        formData
    );

    revalidatePath("/goals");

    return { success: true };
}

export async function deleteGoal(id: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await Goal.findOneAndDelete({ _id: id, userId: session.user.id });

    revalidatePath("/goals");

    return { success: true };
}
