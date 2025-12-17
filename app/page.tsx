import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    BookOpen,
    ClipboardCheck,
    TrendingUp,
    Calendar,
    Clock,
    ArrowRight,
    Bell,
} from "lucide-react";

const quickStats = [
    {
        title: "Total Students",
        value: "1,234",
        change: "+12%",
        icon: Users,
        color: "bg-pastel-lavender",
        iconColor: "text-pastel-lavender-foreground",
    },
    {
        title: "Classes Today",
        value: "8",
        change: "+2",
        icon: BookOpen,
        color: "bg-pastel-mint",
        iconColor: "text-pastel-mint-foreground",
    },
    {
        title: "Attendance Rate",
        value: "96.5%",
        change: "+1.2%",
        icon: ClipboardCheck,
        color: "bg-pastel-peach",
        iconColor: "text-pastel-peach-foreground",
    },
    {
        title: "Exams This Week",
        value: "12",
        change: "3 confirmed",
        icon: TrendingUp,
        color: "bg-pastel-sky",
        iconColor: "text-pastel-sky-foreground",
    },
];

const upcomingEvents = [
    {
        id: 1,
        title: "Math Exam - Grade 12",
        time: "09:00 AM",
        date: "Today",
        type: "exam",
        color: "bg-pastel-lavender",
    },
    {
        id: 2,
        title: "Physics Lab - Grade 11",
        time: "11:30 AM",
        date: "Today",
        type: "class",
        color: "bg-pastel-mint",
    },
    {
        id: 3,
        title: "Parent Meeting",
        time: "02:00 PM",
        date: "Tomorrow",
        type: "meeting",
        color: "bg-pastel-peach",
    },
    {
        id: 4,
        title: "Science Fair Preparation",
        time: "10:00 AM",
        date: "Dec 18",
        type: "activity",
        color: "bg-pastel-cream",
    },
];

const recentActivities = [
    {
        id: 1,
        action: "Attendance marked",
        subject: "Class 302 - Grade 12",
        time: "5 mins ago",
    },
    {
        id: 2,
        action: "Exam confirmed",
        subject: "Physics Exam - Grade 10",
        time: "1 hour ago",
    },
    {
        id: 3,
        action: "New assignment created",
        subject: "Math Homework - Grade 11",
        time: "2 hours ago",
    },
    {
        id: 4,
        action: "Message received",
        subject: "From: Principal Office",
        time: "3 hours ago",
    },
];

export default function Overview() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold" data-testid="text-welcome">
                        Welcome back, Amirbaqian
                    </h1>
                    <p className="text-muted-foreground" data-testid="text-date">
                        {currentDate}
                    </p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                    <Badge variant="secondary" className="ml-2">
                        3
                    </Badge>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat) => (
                    <Card key={stat.title} data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <Badge variant="secondary" className="text-xs">
                                        {stat.change}
                                    </Badge>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.color}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                            <CardTitle className="text-lg font-semibold">
                                Upcoming Events
                            </CardTitle>
                            <Button variant="ghost" size="sm" data-testid="button-view-calendar">
                                View Calendar
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl ${event.color} border border-transparent`}
                                    data-testid={`card-event-${event.id}`}
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{event.title}</p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{event.date}</span>
                                            <Clock className="h-3 w-3 ml-2" />
                                            <span>{event.time}</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="capitalize">
                                        {event.type}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 py-4"
                                    data-testid="button-add-exam"
                                >
                                    <ClipboardCheck className="h-5 w-5 text-primary" />
                                    <span className="text-xs">Add Exam</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 py-4"
                                    data-testid="button-mark-attendance"
                                >
                                    <Users className="h-5 w-5 text-primary" />
                                    <span className="text-xs">Attendance</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 py-4"
                                    data-testid="button-new-message"
                                >
                                    <Bell className="h-5 w-5 text-primary" />
                                    <span className="text-xs">Message</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto flex-col gap-2 py-4"
                                    data-testid="button-view-reports"
                                >
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <span className="text-xs">Reports</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold">
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex flex-col gap-1 pb-4 border-b border-border last:border-0 last:pb-0"
                                data-testid={`activity-${activity.id}`}
                            >
                                <p className="text-sm font-medium">{activity.action}</p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.subject}
                                </p>
                                <p className="text-xs text-muted-foreground/70">
                                    {activity.time}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
