"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { BrandLogo } from "@/components/brand-logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-background overflow-hidden">
            <div className="absolute inset-0 bg-vercel-mesh z-0 opacity-0 dark:opacity-30 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-grid-small z-0 opacity-0 dark:opacity-[0.2] transition-opacity duration-1000" />
            <div className="absolute top-4 right-4 z-50">
                <ThemeSwitcher />
            </div>
            <div className="z-10 flex flex-col items-center w-full max-w-md px-4 sm:px-0">
                <BrandLogo />
                {children}
            </div>
        </div>
    );
}

