"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EditGoalDialog } from "@/components/goals/edit-goal-dialog";
import { format } from "date-fns";
import { Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface GoalCardProps {
    goal: {
        _id: string;
        title: string;
        targetAmount: number;
        currentAmount: number;
        deadline?: string;
    };
    currency?: string;
}

export function GoalCard({ goal, currency = "USD" }: GoalCardProps) {
    const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
                <EditGoalDialog goal={goal} />
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center justify-between text-2xl font-bold">
                    <span>{formatCurrency(goal.currentAmount, currency)}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                        / {formatCurrency(goal.targetAmount, currency)}
                    </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(0)}%</span>
                    {goal.deadline && (
                        <span>Due {format(new Date(goal.deadline), "MMM d, yyyy")}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
