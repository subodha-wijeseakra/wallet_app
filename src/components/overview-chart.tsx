"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewChartProps {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

export function OverviewChart({ data }: OverviewChartProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                Income
                                            </span>
                                            <span className="font-bold text-emerald-500">
                                                {/* @ts-ignore */}
                                                +{payload[0].value}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                Expenses
                                            </span>
                                            <span className="font-bold text-red-500">
                                                {/* @ts-ignore */}
                                                -{payload[1].value}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar
                    dataKey="income"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    className="fill-emerald-500"
                />
                <Bar
                    dataKey="expenses"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    className="fill-red-500"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
