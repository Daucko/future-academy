"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle,
    Download,
    Eye,
    ChevronRight,
    Trophy
} from "lucide-react";

interface Assignment {
    id: string;
    title: string;
    description?: string | null;
    subject: string;
    course?: { name: string; code: string; color?: string | null } | null;
    dueDate: Date | string;
    totalPoints?: number | null;
    status: string;
    submissions?: {
        id: string;
        submissionDate: Date | string;
        grade?: number | null;
        status?: string | null;
    }[];
}

export default function StudentAssignmentsClient({ initialAssignments }: { initialAssignments: Assignment[] }) {
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    const processedAssignments = initialAssignments.map(a => {
        const submission = a.submissions?.[0];
        let status: "not-started" | "submitted" | "graded" = "not-started";

        if (submission) {
            status = submission.grade !== null && submission.grade !== undefined ? "graded" : "submitted";
        }

        return {
            ...a,
            submission,
            displayStatus: status,
            dueDateObj: new Date(a.dueDate)
        };
    });

    const filteredAssignments = processedAssignments.filter(a => {
        if (filter === "all") return true;
        if (filter === "pending") return a.displayStatus === "not-started";
        if (filter === "completed") return a.displayStatus !== "not-started";
        return true;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "graded":
                return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200">Graded</Badge>;
            case "submitted":
                return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">Submitted</Badge>;
            default:
                return <Badge variant="outline" className="text-gray-500">Not Started</Badge>;
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Assignments</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your coursework and submissions.</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border shadow-sm">
                    <Button
                        variant={filter === "all" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className="text-xs"
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "pending" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("pending")}
                        className="text-xs"
                    >
                        Pending
                    </Button>
                    <Button
                        variant={filter === "completed" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("completed")}
                        className="text-xs"
                    >
                        Completed
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => {
                        const daysLeft = Math.ceil((assignment.dueDateObj.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                        const isOverdue = daysLeft < 0 && assignment.displayStatus === "not-started";

                        return (
                            <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left Side - Info */}
                                        <div className="flex-1 p-6 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                                            {assignment.course?.name || assignment.subject}
                                                        </span>
                                                        {getStatusBadge(assignment.displayStatus)}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {assignment.title}
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {assignment.submission?.grade ?? "-"} / {assignment.totalPoints ?? 100}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Points</div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {assignment.description || "No description provided."}
                                            </p>

                                            <div className="flex flex-wrap gap-4 pt-2">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" />
                                                    Due: {assignment.dueDateObj.toLocaleDateString()}
                                                </div>
                                                <div className={`flex items-center gap-2 text-xs font-semibold ${isOverdue ? "text-rose-600" : daysLeft <= 3 && assignment.displayStatus === "not-started" ? "text-amber-600" : "text-gray-500"}`}>
                                                    <Clock className="h-4 w-4" />
                                                    {isOverdue ? "Overdue" : daysLeft === 0 ? "Due Today" : daysLeft === 1 ? "Due Tomorrow" : `${daysLeft} days left`}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Action */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 p-6 flex items-center justify-center md:w-48 shrink-0">
                                            {assignment.displayStatus === "not-started" ? (
                                                <Button className="w-full shadow-sm" variant={isOverdue ? "destructive" : "default"}>
                                                    Add Work
                                                </Button>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 w-full">
                                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                                                        {assignment.displayStatus === "graded" ? "Result Ready" : "Work Submitted"}
                                                    </p>
                                                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                                                        <Eye className="h-3 w-3" />
                                                        View Work
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <Card className="border-dashed border-2 p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Assignments Found</h3>
                        <p className="text-gray-500 max-w-xs mt-1">
                            {filter === "all"
                                ? "You don't have any assignments at the moment. Take a break!"
                                : `You don't have any ${filter} assignments.`}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
