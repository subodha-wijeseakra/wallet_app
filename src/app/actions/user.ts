"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateCurrency(currency: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await dbConnect();

    await User.findByIdAndUpdate(session.user.id, { currency });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
    revalidatePath("/goals");

    return { success: true };
}

export async function getUserSettings() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return { currency: "USD" };
    }

    await dbConnect();

    const user = await User.findById(session.user.id);

    return {
        currency: user?.currency || "USD",
    };
}
