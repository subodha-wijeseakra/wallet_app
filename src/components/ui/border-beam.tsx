"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export function BorderBeam({
    className,
    size = 200,
    duration = 3,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
}: BorderBeamProps) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute top-0 left-0 w-full overflow-hidden",
                className
            )}
            style={{
                height: `${borderWidth}px`,
                "--duration": duration,
                "--delay": delay,
            } as React.CSSProperties}
        >
            <div
                className="absolute top-0 left-0 h-full w-full animate-border-oscillate"
                style={{
                    background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
                    width: "50%", // Length of the beam
                    opacity: 1,
                }}
            />
        </div>
    );
}
