"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email to sign in to your account
                </p>
            </div>
            <div className="grid gap-6 p-6 border rounded-xl bg-card shadow-sm text-card-foreground relative overflow-hidden">
                <BorderBeam duration={6} delay={0} colorFrom="#3b82f6" colorTo="#06b6d4" />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
                <Link
                    href="/sign-up"
                    className="hover:text-brand underline underline-offset-4"
                >
                    Don&apos;t have an account? Sign Up
                </Link>
            </p>
        </div>
    );
}
