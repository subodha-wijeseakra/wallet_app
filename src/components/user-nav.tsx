"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";

export function UserNav() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        await signOut({ callbackUrl: "/sign-in" });
    };

    return (
        <div className="flex items-center gap-4">
            {session?.user && (
                <span className="text-sm text-muted-foreground hidden md:inline-block">
                    {session.user.email}
                </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <LogOut className="h-4 w-4" />
                )}
                <span className="sr-only">Log out</span>
            </Button>
        </div>
    );
}
