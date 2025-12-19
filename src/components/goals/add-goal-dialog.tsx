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
import { addGoal } from "@/app/actions/goal";
import { Loader2, Plus } from "lucide-react";

export function AddGoalDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addGoal({
                title,
                targetAmount: parseFloat(targetAmount),
                currentAmount: parseFloat(currentAmount) || 0,
                deadline: deadline ? new Date(deadline) : undefined,
            });
            setOpen(false);
            setTitle("");
            setTargetAmount("");
            setCurrentAmount("");
            setDeadline("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Goal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Goal</DialogTitle>
                    <DialogDescription>
                        Set a new financial goal to track.
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
                                placeholder="New Laptop"
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
                                placeholder="2000.00"
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
                                placeholder="0.00"
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
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Goal
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
