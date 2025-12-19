import { getUserSettings } from "@/app/actions/user";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Wallet } from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import Link from "next/link";

export async function Navbar() {
    const settings = await getUserSettings();

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center gap-2 font-semibold">
                    <Wallet className="h-6 w-6" />
                    <span>Wallet</span>
                </div>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <CurrencySelector initialCurrency={settings.currency} />
                    <ThemeSwitcher />
                    <UserNav />
                </div>
            </div>
        </div>
    );
}
