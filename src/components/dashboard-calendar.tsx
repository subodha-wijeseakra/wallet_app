"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    addMonths,
    subMonths
} from "date-fns"
import { ArrowDownIcon, ArrowUpIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Transaction {
    _id: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string | Date;
}

interface DashboardCalendarProps {
    transactions: Transaction[];
    currency?: string;
}

export function DashboardCalendar({ transactions, currency = "USD" }: DashboardCalendarProps) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Generate calendar grid
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Group transactions by date for easy lookup
    const transactionsByDate = React.useMemo(() => {
        const map = new Map<string, Transaction[]>();
        transactions.forEach(t => {
            const d = new Date(t.date);
            const key = d.toDateString();
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(t);
        });
        return map;
    }, [transactions]);

    const selectedTransactions = selectedDate ? (transactionsByDate.get(selectedDate.toDateString()) || []) : [];

    return (
        <div className="grid gap-6 lg:grid-cols-7">
            {/* Calendar Section - Takes up 4 columns on large screens */}
            <Card className="lg:col-span-4 border-none shadow-none lg:border lg:shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-bold">
                        {format(currentMonth, "MMMM yyyy")}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 pt-0">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 mb-2">
                        {weekDays.map((day) => (
                            <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                        {calendarDays.map((day, dayIdx) => {
                            const dateKey = day.toDateString();
                            const dayTransactions = transactionsByDate.get(dateKey) || [];
                            const hasIncome = dayTransactions.some(t => t.type === 'income');
                            const hasExpense = dayTransactions.some(t => t.type === 'expense');
                            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                            const isCurrentMonth = isSameMonth(day, currentMonth);

                            return (
                                <button
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={cn(
                                        "relative h-12 sm:h-20 w-full flex flex-col items-center justify-start pt-1 sm:pt-2 rounded-lg sm:rounded-xl transition-all border",
                                        !isCurrentMonth && "text-muted-foreground/30 bg-muted/5 border-transparent",
                                        isCurrentMonth && "bg-background/40 hover:bg-muted/50 border-border/50",
                                        isSelected && "ring-1 sm:ring-2 ring-primary border-primary bg-primary/10 z-10",
                                        isToday(day) && !isSelected && "bg-muted/30 font-semibold"
                                    )}
                                >
                                    <span className={cn(
                                        "text-xs sm:text-base font-medium",
                                        !isCurrentMonth && "font-normal"
                                    )}>
                                        {format(day, "d")}
                                    </span>

                                    {/* Indicators */}
                                    <div className="mt-auto mb-2 flex gap-1">
                                        {hasIncome && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm" />
                                        )}
                                        {hasExpense && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-sm" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Selected Date Details - Takes up 3 columns */}
            <Card className="lg:col-span-3 h-fit sticky top-24">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a date"}</span>
                        {selectedTransactions.length > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                {selectedTransactions.length} transaction{selectedTransactions.length !== 1 && 's'}
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {selectedTransactions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                    <span className="text-2xl">📅</span>
                                </div>
                                <p>No transactions found for this date.</p>
                            </div>
                        ) : (
                            selectedTransactions.map((t) => (
                                <div key={t._id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center",
                                            t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                        )}>
                                            {t.type === 'income' ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="font-medium text-sm">{t.category}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{t.type}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "font-semibold text-sm",
                                        t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                                    )}>
                                        {t.type === 'income' ? "+" : "-"}{formatCurrency(t.amount, currency)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
