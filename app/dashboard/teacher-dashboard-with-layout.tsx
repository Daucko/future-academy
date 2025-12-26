"use client";

import { ThemeProvider } from '@/lib/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import TeacherDashboard from './(teacher-dashboard)/teacher-dashboard';

export default function TeacherDashboardWithLayout() {
    const style = {
        '--sidebar-width': '16rem',
        '--sidebar-width-icon': '3.5rem',
    } as React.CSSProperties;

    return (
        <ThemeProvider defaultTheme="light" storageKey="school-ui-theme">
            <TooltipProvider>
                <SidebarProvider style={style}>
                    <div className="flex h-screen w-full bg-background/95">
                        <AppSidebar />
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
                                <div className="flex items-center gap-4">
                                    <SidebarTrigger />
                                    <div className="relative hidden md:block">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search..."
                                            className="pl-9 w-64 bg-muted/50"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative flex items-center justify-center "
                                    >
                                        <Bell className="absolute size-6 " />
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 h-4 w-4 p-0 border border-black-500 flex items-center justify-center text-[10px]"
                                        >
                                            3
                                        </Badge>
                                    </Button>
                                    <ThemeToggle />
                                </div>
                            </header>
                            <main className="flex-1 overflow-auto p-6">
                                <TeacherDashboard />
                            </main>
                        </div>
                    </div>
                </SidebarProvider>
                <Toaster />
            </TooltipProvider>
        </ThemeProvider>
    );
}
