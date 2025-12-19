import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password?: string;
    image?: string;
    currency?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            maxlength: [100, "Email cannot be more than 100 characters"],
        },
        password: {
            type: String, // Optional for OAuth
            select: false,
        },
        image: {
            type: String,
        },
        currency: {
            type: String,
            default: "USD",
        },
    },
    { timestamps: true }
);

// Prevent overwrite of the model if it already exists (Next.js hot reloading)
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
