import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme-provider";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    messages: true,
    reminders: false,
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                  AB
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                data-testid="button-change-avatar"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue="Amirbaqian"
                    data-testid="input-full-name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="amirbaqian@school.edu"
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    defaultValue="Teacher"
                    disabled
                    data-testid="input-role"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 234 567 890"
                    data-testid="input-phone"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button data-testid="button-save-profile">
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Palette className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32" data-testid="select-theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-sm text-muted-foreground">
                  Use smaller spacing and fonts
                </p>
              </div>
              <Switch data-testid="switch-compact-mode" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, email: checked }))
                }
                data-testid="switch-email-notifications"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive browser notifications
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, push: checked }))
                }
                data-testid="switch-push-notifications"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Message Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified for new messages
                </p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, messages: checked }))
                }
                data-testid="switch-message-alerts"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Receive exam and deadline reminders
                </p>
              </div>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, reminders: checked }))
                }
                data-testid="switch-reminders"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Language & Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your password regularly
                </p>
              </div>
              <Button variant="outline" data-testid="button-change-password">
                Change
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch data-testid="switch-2fa" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">
                  Manage your active login sessions
                </p>
              </div>
              <Button variant="outline" data-testid="button-manage-sessions">
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
