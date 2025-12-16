import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockLessonPlans = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    class: "302",
    grade: 12,
    lessonDate: "2024-12-16",
    duration: 60,
    status: "completed",
    objectives: "Students will be able to solve quadratic equations using the quadratic formula",
    materials: "Textbook Chapter 5, Worksheets, Calculator",
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    subject: "Physics",
    topic: "Newton's Laws of Motion",
    class: "302",
    grade: 12,
    lessonDate: "2024-12-17",
    duration: 45,
    status: "draft",
    objectives: "Understand and apply Newton's three laws of motion",
    materials: "Physics textbook, Lab equipment, Video demonstrations",
    color: "bg-pastel-mint",
  },
  {
    id: "3",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    class: "303",
    grade: 11,
    lessonDate: "2024-12-18",
    duration: 60,
    status: "ready",
    objectives: "Explain ionic and covalent bonding",
    materials: "Molecular model kits, Periodic table, Worksheets",
    color: "bg-pastel-peach",
  },
  {
    id: "4",
    subject: "English",
    topic: "Shakespeare's Hamlet",
    class: "302",
    grade: 12,
    lessonDate: "2024-12-19",
    duration: 50,
    status: "draft",
    objectives: "Analyze key themes in Hamlet Act III",
    materials: "Hamlet copies, Discussion questions, Video clips",
    color: "bg-pastel-cream",
  },
  {
    id: "5",
    subject: "Biology",
    topic: "Cell Division",
    class: "304",
    grade: 10,
    lessonDate: "2024-12-20",
    duration: 60,
    status: "ready",
    objectives: "Describe the stages of mitosis and meiosis",
    materials: "Microscopes, Prepared slides, Diagrams",
    color: "bg-pastel-sky",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case "ready":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          Ready
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="secondary">
          Draft
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function ClassPreparation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPlans = mockLessonPlans.filter((plan) => {
    const matchesSearch =
      plan.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || plan.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockLessonPlans.length,
    completed: mockLessonPlans.filter((p) => p.status === "completed").length,
    ready: mockLessonPlans.filter((p) => p.status === "ready").length,
    draft: mockLessonPlans.filter((p) => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Class Preparation
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Plan and organize your lessons
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-lesson">
              <Plus className="h-4 w-4 mr-1" />
              New Lesson Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Lesson Plan</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Mathematics" data-testid="input-subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger data-testid="select-class">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="302">Class 302</SelectItem>
                      <SelectItem value="303">Class 303</SelectItem>
                      <SelectItem value="304">Class 304</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder="e.g., Quadratic Equations" data-testid="input-topic" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" data-testid="input-date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input id="duration" type="number" placeholder="60" data-testid="input-duration" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Textarea
                  id="objectives"
                  placeholder="What will students learn?"
                  data-testid="textarea-objectives"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materials">Materials Needed</Label>
                <Textarea
                  id="materials"
                  placeholder="List required materials"
                  data-testid="textarea-materials"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button data-testid="button-submit-lesson">Create Plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Plans</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <BookOpen className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-mint border-pastel-mint-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <CheckCircle2 className="h-5 w-5 text-pastel-mint-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-peach border-pastel-peach-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold">{stats.ready}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <FileText className="h-5 w-5 text-pastel-peach-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-cream border-pastel-cream-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Edit className="h-5 w-5 text-pastel-cream-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">Lesson Plans</CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32" data-testid="select-status">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48"
                data-testid="input-search"
              />
            </div>
            <Button variant="outline" size="icon" data-testid="button-filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`${plan.color} border hover-elevate`}
                data-testid={`card-lesson-${plan.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-semibold">{plan.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {plan.topic}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{plan.lessonDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{plan.duration} minutes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10">
                    <Badge variant="outline">Class {plan.class}</Badge>
                    {getStatusBadge(plan.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No lesson plans found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
