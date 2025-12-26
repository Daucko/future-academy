"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    ClipboardList,
    Mail,
    TrendingUp,
    Settings,
    Users,
    FileText,
    Bell,
    MessageSquare,
    Search,
    Menu,
    X,
    GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StudentDashboard from "./(student-dashboard)/student-dashboard";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Timetable", href: "/dashboard/timetable", icon: Calendar },
    { name: "Exams", href: "/dashboard/exams", icon: ClipboardList },
    { name: "Assignments", href: "/dashboard/assignments", icon: FileText },
    { name: "Messages", href: "/dashboard/messages", icon: Mail, badge: 2 },
    { name: "Grades", href: "/dashboard/grades", icon: TrendingUp },
    { name: "Activities", href: "/dashboard/activities", icon: Users },
];

export default function StudentDashboardWithLayout() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                >
                    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
          fixed lg:sticky inset-y-0 left-0 z-40
          w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-200 ease-in-out
          flex flex-col h-screen
        `}>
                    {/* Logo */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-lg">EduSchool</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase px-3 py-2">
                            Main menu
                        </div>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }
                  `}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                    {item.badge && (
                                        <Badge className="ml-auto bg-rose-500 text-white text-xs">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            );
                        })}

                        <div className="mt-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase px-3 py-2">
                            Community
                        </div>

                        <Link
                            href="/dashboard/activities"
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Users className="h-5 w-5" />
                            <span className="text-sm font-medium">Activities</span>
                        </Link>
                    </nav>

                    {/* Profile Section */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-2"
                        >
                            <Settings className="h-5 w-5" />
                            <span className="text-sm font-medium">Settings</span>
                        </Link>

                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase px-3 pb-2">
                            Profile
                        </div>

                        <div className="flex items-center gap-3 px-2">
                            <Avatar>
                                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9maJJhCgsmo4OsVVZZ5_0xI0OxVy80NEnwe2XXjGa2vvy1xFhlHaWPv0LCs5Lc1Z8yBBNAQnJ1PP96ZfChsXdSKy75zcd_6E-_rl9JANbj6q1hny0yLLu9mp3GSwhbMJw0jKUiv37at7zyBEl1D8D6EPEK8m9mQ0AaE996N_bP9ih-tOCaCUh5LUJY691kRc3MtiXBiatCkIO2JPuhTBc0jHrCwAATP1Z6CB-25itrOjAiakRxlKHEBUGMHz_uPhalpZAqnTYG_o" />
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                    Amirbaqian
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    Year 12 Student
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-h-screen">
                    {/* Header */}
                    <header className="sticky top-0 z-30 h-[72px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span className="hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
                                Student
                            </span>
                            <span className="mx-2 text-gray-300 dark:text-gray-600">›</span>
                            <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                <LayoutDashboard className="h-4 w-4" />
                                {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                            </Button>

                            <Button variant="ghost" size="icon">
                                <MessageSquare className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon">
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        <StudentDashboard />
                    </div>
                </main>
            </div>
        </div>
    );
}
