"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    BookOpen,
    ClipboardList,
    TrendingUp,
    Clock,
    GraduationCap,
    Calendar,
    MessageSquare
} from "lucide-react";

export default function TeacherOverview() {
    const stats = [
        { title: "Total Students", value: "156", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Active Courses", value: "8", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Pending Assignments", value: "24", icon: ClipboardList, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Average Class Performance", value: "82%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Teacher Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Welcome back! Here's what's happening in your classes today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Classes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Upcoming Classes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "09:00 AM", subject: "Advanced Mathematics", room: "Room 302", students: 42 },
                                { time: "11:30 AM", subject: "Physics Honors", room: "Lab A", students: 35 },
                                { time: "02:00 PM", subject: "Pre-Calculus", room: "Room 105", students: 38 },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm font-bold w-20">{item.time}</div>
                                        <div>
                                            <div className="font-bold text-sm">{item.subject}</div>
                                            <div className="text-xs text-gray-500">{item.room}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Users className="h-4 w-4" />
                                        {item.students} Students
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: "Post Announcement", icon: MessageSquare },
                                { name: "Track Attendance", icon: Users },
                                { name: "Create Assignment", icon: ClipboardList },
                                { name: "Input Grades", icon: TrendingUp },
                            ].map((action) => (
                                <button
                                    key={action.name}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 group"
                                >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <action.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{action.name}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
