import { Wallet } from "lucide-react";

export function BrandLogo() {
    return (
        <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Wallet className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Wallet
            </span>
        </div>
    );
}
