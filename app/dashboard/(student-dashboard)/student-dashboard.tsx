"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    BookOpen,
    FileText,
    TrendingUp,
    Users,
    Award,
    CheckCircle,
    AlertCircle,
    Bell,
    MapPin,
    Users as GroupsIcon
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }));
            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 space-y-8">
            {/* Welcome Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, Amir! 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        You have 2 classes and 3 assignments pending today. Have a great day!
                    </p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentTime}</p>
                    <p className="text-sm text-gray-500">{currentDate}</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column - 8 cols */}
                <div className="col-span-12 xl:col-span-8 space-y-8">
                    {/* Today's Timetable */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1 overflow-hidden">
                        <Card className="border-0 shadow-none">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-gray-900 dark:text-white" />
                                        Today's Timetable
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-xs font-medium">
                                        View full week
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-0 relative">
                                    {/* Timeline line */}
                                    <div className="absolute top-4 bottom-4 left-[4.5rem] w-px bg-gray-200 dark:bg-gray-700" />

                                    {/* Class 1 - Completed */}
                                    <div className="flex gap-6 items-start opacity-50 hover:opacity-100 transition-opacity">
                                        <div className="w-16 flex-shrink-0 text-right pt-2 relative z-10">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">08:00</div>
                                            <div className="text-[10px] text-gray-500">09:00</div>
                                        </div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-3 flex-shrink-0 relative z-10 -ml-[1.2rem]" />
                                        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Mathematics</h3>
                                                    <p className="text-xs text-gray-500">Room 302 • Mr. Anderson</p>
                                                </div>
                                                <Badge variant="secondary" className="text-[10px] font-medium">
                                                    Completed
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Class 2 - Current */}
                                    <div className="flex gap-6 items-start relative mt-4">
                                        <div className="w-16 flex-shrink-0 text-right pt-2 relative z-10">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">09:15</div>
                                            <div className="text-[10px] text-gray-500">10:15</div>
                                        </div>
                                        <div className="w-3 h-3 bg-gray-900 dark:bg-white border-2 border-white dark:border-gray-900 rounded-full mt-2.5 flex-shrink-0 relative z-10 -ml-[1.35rem] shadow-md" />
                                        <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm relative">
                                            <div className="absolute left-0 top-4 bottom-4 w-1 bg-blue-500 rounded-r" />
                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">Physics Lab</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">Science Wing A • Ms. Sarah</p>
                                                </div>
                                                <Badge className="text-xs font-bold bg-white dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 shadow-sm animate-pulse">
                                                    Now
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 pl-2">
                                                <Badge variant="outline" className="text-[10px] font-semibold">
                                                    <AlertCircle className="h-3 w-3 mr-1" /> Lab Coat
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Class 3 - Upcoming */}
                                    <div className="flex gap-6 items-start relative mt-4 group">
                                        <div className="w-16 flex-shrink-0 text-right pt-2 relative z-10">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">10:30</div>
                                            <div className="text-[10px] text-gray-500">11:30</div>
                                        </div>
                                        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-3 flex-shrink-0 relative z-10 -ml-[1.2rem] group-hover:bg-gray-900 transition-colors" />
                                        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-900/20 hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">English Literature</h3>
                                                    <p className="text-xs text-gray-500">Room 105 • Mrs. Davis</p>
                                                </div>
                                                <Badge variant="outline" className="text-[10px] font-medium">
                                                    Upcoming
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pending Assignments */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pending Assignments</h2>
                            <Button variant="link" className="text-sm font-medium">
                                View all
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Assignment 1 */}
                            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-300 group-hover:scale-110 transition-transform">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <Badge variant="destructive" className="text-[10px] font-bold">
                                            Due Tomorrow
                                        </Badge>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">History Essay: WWII</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                        Write a 1000-word essay analyzing the causes of World War II focusing on political tensions.
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <span className="text-xs font-semibold text-gray-500">History</span>
                                        <span className="text-xs font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                                            Details →
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assignment 2 */}
                            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-300 group-hover:scale-110 transition-transform">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <Badge variant="outline" className="text-[10px] font-bold">
                                            3 Days left
                                        </Badge>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Biology Report</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                        Complete the lab report on photosynthesis experiments conducted last week.
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <span className="text-xs font-semibold text-gray-500">Biology</span>
                                        <span className="text-xs font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                                            Details →
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Right Column - 4 cols */}
                <div className="col-span-12 xl:col-span-4 space-y-6">
                    {/* Announcements */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-bold text-gray-900 dark:text-white">
                                    Announcements
                                </CardTitle>
                                <Bell className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex gap-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 animate-pulse" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white hover:text-gray-900 cursor-pointer transition-colors">
                                            Sports Day Postponed
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            Due to heavy rain forecast, the annual sports day is moved to next Friday, Nov 3rd.
                                        </p>
                                        <span className="text-[10px] text-gray-400 mt-2 block">2 hours ago • Admin Office</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white hover:text-gray-900 cursor-pointer transition-colors">
                                            Science Fair Registration
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            Deadline for project submission is this Friday. Don't forget to submit your abstracts.
                                        </p>
                                        <span className="text-[10px] text-gray-400 mt-2 block">Yesterday • Science Dept</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full text-sm border-t border-dashed">
                                View all announcements
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Grades */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-bold text-gray-900 dark:text-white">
                                    Recent Grades
                                </CardTitle>
                                <Button variant="ghost" size="sm" className="text-xs">
                                    View Report
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { subject: "Mathematics", grade: "92%", type: "Mid-term Exam", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
                                    { subject: "English", grade: "88%", type: "Poetry Essay", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
                                    { subject: "Physics", grade: "76%", type: "Lab Report 3", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm">
                                                {item.subject.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-900 dark:text-white">{item.subject}</div>
                                                <div className="text-[10px] text-gray-500">{item.type}</div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold px-2 py-1 rounded ${item.color}`}>
                                            {item.grade}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Study Group */}
                    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
                        <CardContent className="p-5 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-1">Study Group</h3>
                                <p className="text-xs text-gray-300 mb-4">
                                    Library meeting at 4 PM today. Bring your Physics notes.
                                </p>
                                <Button className="bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold px-4 py-2 rounded-lg shadow-md">
                                    Join now
                                </Button>
                            </div>
                            <GroupsIcon className="absolute -bottom-4 -right-4 h-32 w-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}