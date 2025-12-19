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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Download, FileText, Loader2 } from "lucide-react";
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";
import { getTransactionsByDate } from "@/app/actions/transaction";
import { DateRange } from "react-day-picker";

export function ReportDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reportType, setReportType] = useState<"date" | "month" | "range">("date");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const handleDownload = async () => {
        setLoading(true);
        try {
            let startDate: Date;
            let endDate: Date;

            if (reportType === "date") {
                if (!date) return;
                startDate = startOfDay(date);
                endDate = endOfDay(date);
            } else if (reportType === "month") {
                if (!date) return;
                startDate = startOfMonth(date);
                endDate = endOfMonth(date);
            } else {
                if (!range?.from || !range?.to) return;
                startDate = startOfDay(range.from);
                endDate = endOfDay(range.to);
            }

            const transactions = await getTransactionsByDate(startDate, endDate);

            // Generate CSV
            const headers = ["Date", "Type", "Category", "Description", "Amount"];
            const csvContent = [
                headers.join(","),
                ...transactions.map((t: any) =>
                    [
                        format(new Date(t.date), "yyyy-MM-dd"),
                        t.type,
                        `"${t.category}"`, // Quote to handle commas
                        `"${t.description || ""}"`,
                        t.amount,
                    ].join(",")
                ),
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);

            let filename = "report";
            if (reportType === "date") {
                filename = `report-${format(startDate, "yyyy-MM-dd")}`;
            } else if (reportType === "month") {
                filename = `report-${format(startDate, "MMM-yyyy")}`;
            } else {
                filename = `report-${format(startDate, "yyyy-MM-dd")}-to-${format(endDate, "yyyy-MM-dd")}`;
            }

            link.setAttribute("download", `${filename}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setOpen(false);
        } catch (error) {
            console.error("Failed to download report:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Download Report</DialogTitle>
                    <DialogDescription>
                        Select a date range to download your transaction report in CSV format.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={reportType}
                                onValueChange={(val: "date" | "month" | "range") =>
                                    setReportType(val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Specific Date</SelectItem>
                                    <SelectItem value="month">Entire Month</SelectItem>
                                    <SelectItem value="range">Date Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {reportType === "range" ? (
                            <Calendar
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                initialFocus
                            />
                        ) : (
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        )}
                    </div>
                    {reportType === "month" && date && (
                        <p className="text-center text-sm text-muted-foreground">
                            Report will be generated for {format(date, "MMMM yyyy")}
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={handleDownload} disabled={loading || (reportType === "range" ? (!range?.from || !range?.to) : !date)}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
