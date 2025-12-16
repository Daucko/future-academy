import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  Bell,
  Palette,
} from "lucide-react";

const updates = [
  {
    id: "1",
    version: "v2.4.0",
    date: "December 15, 2024",
    title: "Enhanced Analytics Dashboard",
    description:
      "New charts and visualizations for better insights into student performance and attendance trends.",
    type: "feature",
    icon: Zap,
    color: "bg-pastel-lavender",
    items: [
      "Interactive performance charts",
      "Enrollment trend analysis",
      "Grade distribution visualization",
      "Weekly attendance breakdown",
    ],
  },
  {
    id: "2",
    version: "v2.3.5",
    date: "December 10, 2024",
    title: "Security Improvements",
    description:
      "Enhanced security measures to protect student data and improve system reliability.",
    type: "security",
    icon: Shield,
    color: "bg-pastel-mint",
    items: [
      "Two-factor authentication support",
      "Improved session management",
      "Enhanced data encryption",
    ],
  },
  {
    id: "3",
    version: "v2.3.0",
    date: "December 5, 2024",
    title: "Notification System Update",
    description:
      "Redesigned notification system with better filtering and priority management.",
    type: "improvement",
    icon: Bell,
    color: "bg-pastel-peach",
    items: [
      "Priority-based notifications",
      "Custom notification preferences",
      "Email and in-app sync",
    ],
  },
  {
    id: "4",
    version: "v2.2.0",
    date: "November 28, 2024",
    title: "Dark Mode & Theme Customization",
    description:
      "Added dark mode support and customizable theme options for better accessibility.",
    type: "feature",
    icon: Palette,
    color: "bg-pastel-cream",
    items: [
      "System-aware dark mode",
      "Custom color schemes",
      "Improved contrast ratios",
      "Accessibility enhancements",
    ],
  },
];

const getTypeBadge = (type: string) => {
  const styles: Record<string, string> = {
    feature: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    security: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    improvement: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    bugfix: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <Badge className={styles[type] || styles.improvement}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};

export default function WhatsNew() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          What's New
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Latest updates and improvements to the school management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Zap className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
              <div>
                <p className="font-semibold">4</p>
                <p className="text-xs text-muted-foreground">New Features</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-mint border-pastel-mint-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Shield className="h-5 w-5 text-pastel-mint-foreground" />
              </div>
              <div>
                <p className="font-semibold">2</p>
                <p className="text-xs text-muted-foreground">Security Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-peach border-pastel-peach-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Sparkles className="h-5 w-5 text-pastel-peach-foreground" />
              </div>
              <div>
                <p className="font-semibold">8</p>
                <p className="text-xs text-muted-foreground">Improvements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Release History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {updates.map((update) => (
                <div key={update.id} className="relative pl-14" data-testid={`update-${update.id}`}>
                  <div
                    className={`absolute left-3 -translate-x-1/2 w-6 h-6 rounded-full ${update.color} flex items-center justify-center z-10`}
                  >
                    <update.icon className="h-3 w-3" />
                  </div>

                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Badge variant="outline" className="font-mono text-xs">
                      {update.version}
                    </Badge>
                    {getTypeBadge(update.type)}
                    <span className="text-xs text-muted-foreground">
                      {update.date}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-1">{update.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {update.description}
                  </p>

                  <div className="space-y-1">
                    {update.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
