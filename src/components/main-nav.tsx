"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href="/dashboard"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/dashboard"
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Dashboard
            </Link>
            <Link
                href="/transactions"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/transactions"
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Transactions
            </Link>
            <Link
                href="/goals"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/goals"
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Goals
            </Link>
        </nav>
    );
}
