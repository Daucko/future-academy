"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
    Clock,
    MapPin,
    Calendar as CalendarIcon,
    AlertCircle,
    CheckCircle2,
    BookOpen
} from "lucide-react";

interface Exam {
    id: string;
    classId: string;
    subject: string;
    course?: { name: string; code: string; color?: string | null } | null;
    examType: string;
    examDate: Date | string;
    startTime: string;
    endTime?: string | null;
    confirmed: boolean;
    room?: string | null;
    class?: { className: string; grade: number } | null;
}

const examColors = [
    "bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/20",
    "bg-purple-50 border-purple-100 dark:bg-purple-900/10 dark:border-purple-900/20",
    "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20",
    "bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20",
];

export default function StudentExamsClient({ initialExams }: { initialExams: Exam[] }) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const processedExams = initialExams.map((exam, index) => ({
        ...exam,
        colorClass: examColors[index % examColors.length],
        dateObj: new Date(exam.examDate),
    }));

    const upcomingExams = processedExams.filter(exam => exam.dateObj >= new Date()).sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Exams</h1>
                    <p className="text-gray-500 dark:text-gray-400">View your upcoming examination schedule and details.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1">
                        {upcomingExams.length} Upcoming Exams
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main List */}
                <div className="lg:col-span-8 space-y-6">
                    {upcomingExams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {upcomingExams.map((exam) => {
                                const daysLeft = Math.ceil((exam.dateObj.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                return (
                                    <Card key={exam.id} className={`${exam.colorClass} border-2 hover:shadow-lg transition-all group overflow-hidden`}>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                                    <BookOpen className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                                </div>
                                                {daysLeft <= 7 && daysLeft >= 0 && (
                                                    <Badge variant="destructive" className="animate-pulse">
                                                        Next Week
                                                    </Badge>
                                                )}
                                                {daysLeft < 0 && (
                                                    <Badge variant="secondary">
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {exam.course?.name || exam.subject}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{exam.examType}</p>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    {exam.dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <Clock className="h-4 w-4" />
                                                    {exam.startTime} {exam.endTime ? `- ${exam.endTime}` : ''}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <MapPin className="h-4 w-4" />
                                                    {exam.room || "Room TBA"}
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? "Today" : "Finished"}
                                                </div>
                                                {exam.confirmed ? (
                                                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Confirmed
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold">
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        Pending
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card className="border-dashed border-2 p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <CalendarIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Upcoming Exams</h3>
                            <p className="text-gray-500 max-w-xs mt-1">You don't have any exams scheduled at the moment. Enjoy your study time!</p>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Calendar View</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex justify-center pb-4">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm"
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-0">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Exam Preparation
                            </h3>
                            <p className="text-indigo-100 text-sm mb-4">
                                Make sure to check your room assignments and bring all necessary materials.
                            </p>
                            <ul className="space-y-2 text-xs text-indigo-100">
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-white rounded-full" />
                                    Arrive 15 minutes early
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-white rounded-full" />
                                    Bring your Student ID
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
