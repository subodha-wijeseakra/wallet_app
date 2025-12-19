import { getGoals } from "@/app/actions/goal";
import { AddGoalDialog } from "@/components/goals/add-goal-dialog";
import { GoalCard } from "@/components/goals/goal-card";
import { getUserSettings } from "@/app/actions/user";

export default async function GoalsPage() {
    const goals = await getGoals();
    const settings = await getUserSettings();

    return (
        <div className="flex-1 space-y-4 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Financial Goals</h2>
                <div className="flex items-center space-x-2">
                    <AddGoalDialog />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {goals.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                        <p>No goals yet.</p>
                        <p className="text-sm">Start tracking your saving targets to reach financial freedom.</p>
                    </div>
                ) : (
                    goals.map((goal: any) => (
                        <GoalCard key={goal._id} goal={goal} currency={settings.currency} />
                    ))
                )}
            </div>
        </div>
    );
}
