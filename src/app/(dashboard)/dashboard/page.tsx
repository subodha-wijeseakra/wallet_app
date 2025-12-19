import {
    getDashboardStats,
    getAllTransactions,
} from "@/app/actions/transaction";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { EditTransactionDialog } from "@/components/edit-transaction-dialog";
import { ReportDialog } from "@/components/report-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";
import { getUserSettings } from "@/app/actions/user";
import { formatCurrency } from "@/lib/utils";
import { OverviewChart } from "@/components/overview-chart";
import { DashboardCalendar } from "@/components/dashboard-calendar";

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const settings = await getUserSettings();
    const allTransactions = await getAllTransactions();

    return (
        <div className="flex-1 space-y-4 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <ReportDialog />
                    <AddTransactionDialog />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                            {formatCurrency(stats.balance, settings.currency)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Current available balance
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(stats.income, settings.currency)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total income this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(stats.expenses, settings.currency)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total expenses this month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart data={stats.chartData} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {stats.recentTransactions.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No transactions found.</p>
                            ) : (
                                stats.recentTransactions.map((t: any) => (
                                    <div key={t._id} className="flex items-center">
                                        <div className={`p-2 rounded-full mr-4 ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {t.type === 'income' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{t.category}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {format(new Date(t.date), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium flex items-center gap-2">
                                            <span className={t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}>
                                                {t.type === 'income' ? "+" : "-"}{formatCurrency(t.amount, settings.currency)}
                                            </span>
                                            <EditTransactionDialog transaction={t} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1">
                <DashboardCalendar transactions={allTransactions} currency={settings.currency} />
            </div>
        </div>
    );
}
