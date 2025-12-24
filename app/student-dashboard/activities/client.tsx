"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MapPin,
    Clock,
    Tag,
    ChevronRight,
    Search,
    Filter,
    Star,
    Music,
    Trophy,
    BookOpen,
    Users
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Activity {
    id: string;
    title: string;
    description?: string | null;
    activityDate: Date | string;
    startTime?: string | null;
    endTime?: string | null;
    location?: string | null;
    category?: string | null;
}

export default function StudentActivitiesClient({ initialActivities }: { initialActivities: Activity[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(initialActivities.map(a => a.category).filter(Boolean))) as string[];

    const processedActivities = initialActivities.map(a => ({
        ...a,
        dateObj: new Date(a.activityDate),
    })).sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

    const filteredActivities = processedActivities.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryIcon = (category: string | null | undefined) => {
        switch (category?.toLowerCase()) {
            case 'sports': return <Trophy className="h-4 w-4" />;
            case 'music': return <Music className="h-4 w-4" />;
            case 'academic': return <BookOpen className="h-4 w-4" />;
            case 'social': return <Users className="h-4 w-4" />;
            default: return <Star className="h-4 w-4" />;
        }
    };

    const getCategoryColor = (category: string | null | undefined) => {
        switch (category?.toLowerCase()) {
            case 'sports': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'music': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
            case 'academic': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'social': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">School Activities</h1>
                    <p className="text-gray-500 dark:text-gray-400">Discover upcoming events, clubs, and extracurricular activities.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search activities..."
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <Button
                        variant={selectedCategory === null ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className="rounded-full text-xs shadow-sm"
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="rounded-full text-xs shadow-sm"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                        <Card key={activity.id} className="overflow-hidden group hover:shadow-xl transition-all border-0 shadow-md flex flex-col">
                            <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                                <Badge className={`absolute bottom-3 left-4 border-0 shadow-sm ${getCategoryColor(activity.category)}`}>
                                    <span className="flex items-center gap-1.5 py-0.5">
                                        {getCategoryIcon(activity.category)}
                                        {activity.category || 'Event'}
                                    </span>
                                </Badge>
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                        {activity.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                        {activity.description || "Join us for this exciting school activity!"}
                                    </p>
                                </div>

                                <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="h-4 w-4 text-indigo-500" />
                                        {activity.dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <Clock className="h-4 w-4 text-indigo-500" />
                                        {activity.startTime || "TBA"} {activity.endTime ? `- ${activity.endTime}` : ''}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <MapPin className="h-4 w-4 text-indigo-500" />
                                        {activity.location || "School Campus"}
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full mt-6 group/btn text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 gap-2">
                                    Learn More
                                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Activities Found</h3>
                        <p className="text-gray-500">Try adjusting your search or category filters.</p>
                    </div>
                )}
            </div>

            {/* Featured Section */}
            <Card className="bg-slate-900 text-white border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/20 skew-x-12 translate-x-1/2" />
                <CardContent className="p-8 relative z-10">
                    <div className="max-w-2xl">
                        <Badge className="bg-indigo-500 text-white border-0 mb-4">Coming Soon</Badge>
                        <h2 className="text-2xl font-bold mb-4">School Annual Fest 2026</h2>
                        <p className="text-slate-400 mb-6">
                            Get ready for the biggest event of the year! Preparations are underway for the annual school festival.
                            Interested in volunteering or performing? Registration opens next month.
                        </p>
                        <Button className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-white/10">
                            Get Notified
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
