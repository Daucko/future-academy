"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    Users,
    Clock,
    Award,
    ChevronRight,
    Search,
    LayoutGrid,
    List,
    Database,
    Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { seedCoursesAndLinkData } from "@/server/seed-utility";

interface Course {
    id: string;
    code: string;
    name: string;
    description?: string | null;
    credits: number;
    color: string;
    teacherName?: string;
    teacherAvatar?: string;
    progress?: number;
    attendance?: string;
    nextLesson?: string;
}

const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    pink: "bg-pink-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
};

export default function StudentCoursesClient({ initialCourses }: { initialCourses: Course[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isSeeding, setIsSeeding] = useState(false);

    const filteredCourses = initialCourses.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            const res = await seedCoursesAndLinkData();
            if (res.success) {
                window.location.reload();
            } else {
                alert("Error: " + (res.error || "Unknown error"));
            }
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Courses</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your enrolled subjects and track your academic progress.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleSeed} disabled={isSeeding} className="gap-2 border-dashed group">
                        <Zap className={`h-4 w-4 ${isSeeding ? "animate-pulse" : "group-hover:text-yellow-500"}`} />
                        {isSeeding ? "Syncing..." : "Sync & Seed Data"}
                    </Button>
                    <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border">
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search by course name or code..."
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {initialCourses.length > 0 ? (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {filteredCourses.map(course => (
                        <Card key={course.id} className="group hover:shadow-xl transition-all border-0 shadow-lg overflow-hidden flex flex-col">
                            <div className={`h-2 ${colorMap[course.color] || "bg-blue-500"}`} />
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">{course.code}</Badge>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{course.credits} Credits</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                    {course.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 h-10">
                                    {course.description || "Comprehensive curriculum covering key aspects of the subject."}
                                </p>

                                <div className="space-y-4 mt-auto">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-gray-400 uppercase tracking-wide">Course Progress</span>
                                            <span className="text-blue-600">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-1.5" />
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <Users className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instructor</p>
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{course.teacherName}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="group/btn hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                            <ChevronRight className="h-5 w-5 text-gray-300 group-hover/btn:text-blue-500 transition-colors" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center bg-gray-50/50 dark:bg-gray-900/20 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 shadow-inner">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                        <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Build Your Academic Registry</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed">
                        Transitioning to the new Course System. Synchronize your class schedule to automatically populate your course dashboard.
                    </p>
                    <Button
                        size="lg"
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="gap-3 bg-primary text-primary-foreground px-8 h-14 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        {isSeeding ? <Clock className="h-5 w-5 animate-spin" /> : <Database className="h-5 w-5" />}
                        <span className="font-bold uppercase tracking-widest text-xs">
                            {isSeeding ? "Synchronizing..." : "Sync Schedule & Seed"}
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
}
