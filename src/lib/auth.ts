import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";


if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please define the NEXTAUTH_SECRET environment variable inside .env.local");
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Missing credentials");
                    throw new Error("Invalid credentials");
                }

                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).select(
                    "+password"
                );

                if (!user || !user.password) {
                    console.error(`User not found or no password hash for email: ${credentials.email}`);
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    console.error(`Password mismatch for user: ${credentials.email}`);
                    throw new Error("Invalid credentials");
                }

                console.log(`User logged in successfully: ${credentials.email}`);

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
};
