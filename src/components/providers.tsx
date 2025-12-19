"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <SessionProvider>{children}</SessionProvider>;
    }

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>
    );
}
