"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">Wallet</span>
                </div>
                <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="#features" className="hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#testimonials" className="hover:text-primary transition-colors">
                        Testimonials
                    </Link>
                    <Link href="#pricing" className="hover:text-primary transition-colors">
                        Pricing
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <div className="hidden sm:flex gap-2">
                        <Link href="/sign-in">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
