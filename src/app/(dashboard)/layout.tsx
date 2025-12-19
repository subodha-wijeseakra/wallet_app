import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background relative">


            <div className="relative z-10 flex min-h-screen flex-col">
                <Suspense fallback={<div className="h-16 border-b bg-background/60" />}>
                    <Navbar />
                </Suspense>
                <div className="flex-1 space-y-4 p-8 pt-6 z-10 relative">{children}</div>
            </div>
        </div>
    );
}
