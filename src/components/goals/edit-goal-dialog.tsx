"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateGoal, deleteGoal } from "@/app/actions/goal";
import { Loader2, Pencil, Trash } from "lucide-react";

interface EditGoalDialogProps {
    goal: {
        _id: string;
        title: string;
        targetAmount: number;
        currentAmount: number;
        deadline?: string;
    };
    trigger?: React.ReactNode;
}

export function EditGoalDialog({ goal, trigger }: EditGoalDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(goal.title);
    const [targetAmount, setTargetAmount] = useState(goal.targetAmount.toString());
    const [currentAmount, setCurrentAmount] = useState(goal.currentAmount.toString());
    const [deadline, setDeadline] = useState(goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateGoal(goal._id, {
                title,
                targetAmount: parseFloat(targetAmount),
                currentAmount: parseFloat(currentAmount),
                deadline: deadline ? new Date(deadline) : undefined,
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this goal?")) return;
        setLoading(true);
        try {
            await deleteGoal(goal._id);
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Goal</DialogTitle>
                    <DialogDescription>
                        Update goal details or add funds.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="target" className="text-right">
                                Target ($)
                            </Label>
                            <Input
                                id="target"
                                type="number"
                                step="0.01"
                                className="col-span-3"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="current" className="text-right">
                                Current ($)
                            </Label>
                            <Input
                                id="current"
                                type="number"
                                step="0.01"
                                className="col-span-3"
                                value={currentAmount}
                                onChange={(e) => setCurrentAmount(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deadline" className="text-right">
                                Deadline
                            </Label>
                            <Input
                                id="deadline"
                                type="date"
                                className="col-span-3"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex items-center justify-between sm:justify-between">
                        <Button type="button" variant="destructive" size="icon" onClick={handleDelete} disabled={loading}>
                            <Trash className="h-4 w-4" />
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
