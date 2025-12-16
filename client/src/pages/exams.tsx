import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Filter,
  Check,
  Users,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const examColors = [
  "bg-pastel-lavender border-pastel-lavender-border",
  "bg-pastel-mint border-pastel-mint-border",
  "bg-pastel-peach border-pastel-peach-border",
  "bg-pastel-cream border-pastel-cream-border",
  "bg-pastel-sky border-pastel-sky-border",
];

const months = ["Jan", "Feb", "March", "April", "May", "June", "July"];

const mockExams = [
  {
    id: 1,
    classNumber: "302",
    className: "Class 302",
    time: "8:00 am",
    examType: "Math Exam",
    grade: "Grade 12",
    confirmed: true,
    studentCount: 19,
    row: 1,
    colorIndex: 0,
  },
  {
    id: 2,
    classNumber: "303",
    className: "Class 303",
    time: "9:00 am",
    examType: "Physics Exam",
    grade: "Grade 10",
    confirmed: true,
    studentCount: 18,
    row: 1,
    colorIndex: 2,
  },
  {
    id: 3,
    classNumber: "304",
    className: "Class 304",
    time: "8:00 am",
    examType: "Art Exam",
    grade: "Grade 9",
    confirmed: true,
    studentCount: 20,
    row: 3,
    colorIndex: 1,
  },
  {
    id: 4,
    classNumber: "302",
    className: "Class 302",
    time: "9:00 am",
    examType: "Math Exam",
    grade: "Grade 12",
    confirmed: true,
    studentCount: 19,
    row: 3,
    colorIndex: 3,
  },
  {
    id: 5,
    classNumber: "305",
    className: "Class 305",
    time: "10:00 am",
    examType: "English Exam",
    grade: "Grade 11",
    confirmed: true,
    studentCount: 18,
    row: 3,
    colorIndex: 4,
  },
  {
    id: 6,
    classNumber: "303",
    className: "Class 303",
    time: "8:00 am",
    examType: "Physics Exam",
    grade: "Grade 10",
    confirmed: false,
    studentCount: 0,
    row: 6,
    colorIndex: 2,
  },
];

const upcomingExams = [
  {
    id: 1,
    classNumber: "302",
    title: "Math Exam",
    date: "10 Feb",
    time: "7:30am - 9:00am",
    daysLeft: 4,
    color: "bg-pastel-lavender",
  },
  {
    id: 2,
    classNumber: "303",
    title: "English Exam",
    date: "11 Feb",
    time: "7:30am - 9:00am",
    daysLeft: 5,
    color: "bg-pastel-peach",
  },
];

interface ExamCardProps {
  exam: typeof mockExams[0];
}

function ExamCard({ exam }: ExamCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border ${examColors[exam.colorIndex]} transition-all hover:shadow-md`}
      data-testid={`card-exam-${exam.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <Badge
          variant="outline"
          className="text-xs font-medium bg-white/50 dark:bg-black/20"
        >
          {exam.classNumber}
        </Badge>
        <span className="text-xs text-muted-foreground">{exam.className}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-1">{exam.time}</p>

      <div className="mt-3 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
        <p className="font-medium text-sm">{exam.examType}</p>
        <p className="text-xs text-muted-foreground">{exam.grade}</p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5 dark:border-white/10">
        <div className="flex items-center gap-3">
          {exam.confirmed ? (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Confirmed</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Pending</span>
          )}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span className="text-xs">{exam.studentCount}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              data-testid={`button-exam-menu-${exam.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function Exams() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState("Feb");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const groupedExams = mockExams.reduce((acc, exam) => {
    if (!acc[exam.row]) acc[exam.row] = [];
    acc[exam.row].push(exam);
    return acc;
  }, {} as Record<number, typeof mockExams>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Maham</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Exams</span>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Exams
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            On the attendance page, you can easily track student attendance and
            monitor absences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-search">
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 w-40 border-0 bg-transparent focus-visible:ring-0"
            />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" data-testid="button-add-exam">
                <Plus className="h-4 w-4 mr-1" />
                Add new exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Exam</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger id="class" data-testid="select-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="302">Class 302</SelectItem>
                      <SelectItem value="303">Class 303</SelectItem>
                      <SelectItem value="304">Class 304</SelectItem>
                      <SelectItem value="305">Class 305</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Math Exam" data-testid="input-subject" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" data-testid="input-date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" data-testid="input-time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room">Room</Label>
                  <Input id="room" placeholder="e.g., Room 101" data-testid="input-room" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button data-testid="button-submit-exam">Add Exam</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <CardTitle className="text-lg font-semibold">
                Exam Calendar
              </CardTitle>
              <Button variant="outline" size="sm" data-testid="button-filter">
                <Filter className="h-4 w-4 mr-1" />
                Filter
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  1
                </Badge>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {months.map((month) => (
                  <Button
                    key={month}
                    variant={selectedMonth === month ? "default" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setSelectedMonth(month)}
                    data-testid={`button-month-${month.toLowerCase()}`}
                  >
                    {month}
                  </Button>
                ))}
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedExams).map(([row, exams]) => (
                  <div key={row} className="space-y-2">
                    <div className="flex items-start gap-4">
                      <span className="text-sm text-muted-foreground w-6 pt-4 shrink-0">
                        {row}
                      </span>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exams.map((exam) => (
                          <ExamCard key={exam.id} exam={exam} />
                        ))}
                      </div>
                    </div>
                    {row === "2" && (
                      <div className="flex items-center gap-4 pl-10">
                        <span className="text-sm text-muted-foreground">
                          No exam.
                        </span>
                      </div>
                    )}
                    {(row === "4" || row === "5") && (
                      <div className="flex items-center gap-4 pl-10">
                        <span className="text-sm text-muted-foreground">
                          Weekend
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-base font-semibold">
                  February
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  1
                </Badge>
              </Button>
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
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">*</span>
                <CardTitle className="text-sm font-medium">
                  9 Exams for this month
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <CardTitle className="text-base font-semibold">
                Upcoming exams
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className={`p-4 rounded-xl ${exam.color} border border-transparent`}
                  data-testid={`card-upcoming-exam-${exam.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium bg-white/50 dark:bg-black/20"
                      >
                        {exam.classNumber}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{exam.title}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {exam.date} - {exam.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {exam.daysLeft} Days left
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
