import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import Overview from "@/pages/overview";
import Exams from "@/pages/exams";
import Attendance from "@/pages/attendance";
import Students from "@/pages/students";
import Messages from "@/pages/messages";
import Schedule from "@/pages/schedule";
import ClassPreparation from "@/pages/class-preparation";
import Assignments from "@/pages/assignments";
import Analytics from "@/pages/analytics";
import Reports from "@/pages/reports";
import SchoolNews from "@/pages/news";
import SchoolActivities from "@/pages/activities";
import WhatsNew from "@/pages/whats-new";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Overview} />
      <Route path="/exams" component={Exams} />
      <Route path="/attendance" component={Attendance} />
      <Route path="/students" component={Students} />
      <Route path="/messages" component={Messages} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/class-preparation" component={ClassPreparation} />
      <Route path="/assignments" component={Assignments} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/reports" component={Reports} />
      <Route path="/news" component={SchoolNews} />
      <Route path="/activities" component={SchoolActivities} />
      <Route path="/whats-new" component={WhatsNew} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 w-64 bg-muted/50"
                  data-testid="input-global-search"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="button-notifications"
              >
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  3
                </Badge>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="school-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppLayout />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
