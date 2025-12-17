"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  ClipboardList,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  FileBarChart,
  Newspaper,
  PartyPopper,
  Sparkles,
  Settings,
  GraduationCap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Class Preparation", url: "/class-preparation", icon: BookOpen },
  { title: "Attendance", url: "/attendance", icon: UserCheck },
  { title: "Exams", url: "/exams", icon: ClipboardList },
  { title: "Assignment management", url: "/assignments", icon: FileText },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Students", url: "/students", icon: Users },
  { title: "Messages", url: "/messages", icon: MessageSquare, badge: 2 },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileBarChart },
];

const settingsMenuItems = [
  { title: "School News", url: "/news", icon: Newspaper },
  { title: "School Activities", url: "/activities", icon: PartyPopper },
  { title: "What's New", url: "/whats-new", icon: Sparkles },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sidebar-border bg-sidebar">
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Main menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="relative"
                    >
                      <Link
                        href={item.url}
                        data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto h-5 min-w-5 rounded-full px-1.5 text-xs font-medium"
                            data-testid={`badge-${item.title.toLowerCase()}-count`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Settings and news
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.url}
                        data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/settings"}
                >
                  <Link href="/settings" data-testid="link-settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarGroupLabel className="px-0 text-xs font-medium text-muted-foreground mb-2">
          Account
        </SidebarGroupLabel>
        <div
          className="flex items-center gap-3 rounded-lg p-2 hover-elevate cursor-pointer"
          data-testid="user-profile-sidebar"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              AB
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium" data-testid="text-username">
              Amirbaqian
            </span>
            <span className="text-xs text-muted-foreground" data-testid="text-role">
              Teacher
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
