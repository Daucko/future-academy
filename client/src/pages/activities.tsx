import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  CalendarIcon,
  Clock,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  PartyPopper,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockActivities = [
  {
    id: "1",
    title: "Winter Concert",
    description: "Annual winter concert featuring performances by the school choir and orchestra",
    activityDate: "2024-12-20",
    startTime: "18:00",
    endTime: "20:00",
    location: "School Auditorium",
    category: "performance",
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    title: "Science Club Meeting",
    description: "Weekly science club meeting - this week's topic: Astronomy",
    activityDate: "2024-12-18",
    startTime: "15:30",
    endTime: "17:00",
    location: "Lab 3",
    category: "club",
    color: "bg-pastel-mint",
  },
  {
    id: "3",
    title: "Basketball Tournament",
    description: "Inter-school basketball tournament finals",
    activityDate: "2024-12-22",
    startTime: "10:00",
    endTime: "16:00",
    location: "Sports Hall",
    category: "sports",
    color: "bg-pastel-peach",
  },
  {
    id: "4",
    title: "Art Exhibition",
    description: "Student art exhibition showcasing works from the fall semester",
    activityDate: "2024-12-19",
    startTime: "09:00",
    endTime: "17:00",
    location: "Art Gallery",
    category: "exhibition",
    color: "bg-pastel-cream",
  },
  {
    id: "5",
    title: "Debate Competition",
    description: "Annual debate competition - Topic: Technology in Education",
    activityDate: "2024-12-21",
    startTime: "14:00",
    endTime: "17:00",
    location: "Conference Room A",
    category: "competition",
    color: "bg-pastel-sky",
  },
];

const getCategoryBadge = (category: string) => {
  const colors: Record<string, string> = {
    performance: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    club: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    sports: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    exhibition: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    competition: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <Badge className={colors[category] || "bg-gray-100 text-gray-700"}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

export default function SchoolActivities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || activity.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            School Activities
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Events, clubs, and extracurricular activities
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-activity">
              <Plus className="h-4 w-4 mr-1" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Activity</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Activity title" data-testid="input-title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="club">Club</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="exhibition">Exhibition</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" data-testid="input-date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" data-testid="input-start-time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" data-testid="input-end-time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., School Auditorium" data-testid="input-location" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Activity description..."
                  data-testid="textarea-description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button data-testid="button-submit-activity">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
              <CardTitle className="text-lg font-semibold">
                Upcoming Activities
              </CardTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40" data-testid="select-filter-category">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="exhibition">Exhibition</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-40"
                    data-testid="input-search"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-xl ${activity.color} border border-transparent hover-elevate`}
                    data-testid={`card-activity-${activity.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold">{activity.title}</h3>
                          {getCategoryBadge(activity.category)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>{activity.activityDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {activity.startTime} - {activity.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <PartyPopper className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No activities found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Activity Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                data-testid="calendar-widget"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["performance", "club", "sports", "exhibition", "competition"].map(
                  (cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {getCategoryBadge(cat)}
                      <Badge variant="outline" className="text-xs">
                        {mockActivities.filter((a) => a.category === cat).length}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
