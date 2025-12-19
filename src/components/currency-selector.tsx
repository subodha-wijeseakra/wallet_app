"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateCurrency } from "@/app/actions/user";

const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

export function CurrencySelector({ initialCurrency = "USD" }: { initialCurrency?: string }) {
    const [currency, setCurrency] = React.useState(initialCurrency);
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        setCurrency(initialCurrency);
    }, [initialCurrency]);

    const handleValueChange = (value: string) => {
        setCurrency(value);
        startTransition(async () => {
            await updateCurrency(value);
        });
    };

    return (
        <Select value={currency} onValueChange={handleValueChange} disabled={isPending}>
            <SelectTrigger className="w-[100px] h-9 text-xs">
                <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent align="end">
                {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code} className="text-xs">
                        <span className="font-medium mr-2">{c.symbol}</span>
                        {c.code}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
