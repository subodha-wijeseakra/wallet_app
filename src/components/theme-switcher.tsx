"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    const icon = () => {
        if (theme === 'system') return <Laptop className="h-[1.2rem] w-[1.2rem]" />;
        if (resolvedTheme === 'dark') return <Moon className="h-[1.2rem] w-[1.2rem]" />;
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {icon()}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
