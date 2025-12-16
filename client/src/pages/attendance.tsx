import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mockStudents = [
  {
    id: "1",
    name: "Emma Thompson",
    studentId: "STD001",
    class: "302",
    grade: 12,
    status: "present",
    checkIn: "07:45 AM",
    checkOut: null,
    avatar: null,
  },
  {
    id: "2",
    name: "Michael Chen",
    studentId: "STD002",
    class: "302",
    grade: 12,
    status: "present",
    checkIn: "07:50 AM",
    checkOut: null,
    avatar: null,
  },
  {
    id: "3",
    name: "Sarah Williams",
    studentId: "STD003",
    class: "302",
    grade: 12,
    status: "absent",
    checkIn: null,
    checkOut: null,
    avatar: null,
  },
  {
    id: "4",
    name: "James Rodriguez",
    studentId: "STD004",
    class: "302",
    grade: 12,
    status: "late",
    checkIn: "08:15 AM",
    checkOut: null,
    avatar: null,
  },
  {
    id: "5",
    name: "Olivia Davis",
    studentId: "STD005",
    class: "302",
    grade: 12,
    status: "present",
    checkIn: "07:55 AM",
    checkOut: null,
    avatar: null,
  },
  {
    id: "6",
    name: "David Kim",
    studentId: "STD006",
    class: "302",
    grade: 12,
    status: "present",
    checkIn: "07:48 AM",
    checkOut: null,
    avatar: null,
  },
  {
    id: "7",
    name: "Isabella Martinez",
    studentId: "STD007",
    class: "302",
    grade: 12,
    status: "excused",
    checkIn: null,
    checkOut: null,
    avatar: null,
  },
  {
    id: "8",
    name: "Alexander Brown",
    studentId: "STD008",
    class: "302",
    grade: 12,
    status: "present",
    checkIn: "07:52 AM",
    checkOut: null,
    avatar: null,
  },
];

const attendanceStats = [
  { label: "Present", count: 16, percentage: 84, color: "bg-emerald-500" },
  { label: "Absent", count: 2, percentage: 11, color: "bg-red-500" },
  { label: "Late", count: 1, percentage: 5, color: "bg-amber-500" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "present":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Present
        </Badge>
      );
    case "absent":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </Badge>
      );
    case "late":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="h-3 w-3 mr-1" />
          Late
        </Badge>
      );
    case "excused":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <AlertCircle className="h-3 w-3 mr-1" />
          Excused
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("302");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = mockStudents.filter((s) => s.status === "present").length;
  const totalCount = mockStudents.length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Attendance
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track and manage student attendance records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Calendar className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-mint border-pastel-mint-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold">{presentCount}</p>
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
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold">
                  {mockStudents.filter((s) => s.status === "absent").length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <XCircle className="h-5 w-5 text-pastel-peach-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-cream border-pastel-cream-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((presentCount / totalCount) * 100)}%
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Clock className="h-5 w-5 text-pastel-cream-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">
            Student Attendance
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-32" data-testid="select-class">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="302">Class 302</SelectItem>
                <SelectItem value="303">Class 303</SelectItem>
                <SelectItem value="304">Class 304</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
              data-testid="input-date"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox data-testid="checkbox-select-all" />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-muted/30"
                    data-testid={`row-student-${student.id}`}
                  >
                    <TableCell>
                      <Checkbox data-testid={`checkbox-student-${student.id}`} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">
                          {student.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {student.studentId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Class {student.class}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell className="text-sm">
                      {student.checkIn || "-"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {student.checkOut || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid={`button-edit-${student.id}`}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredStudents.length} of {mockStudents.length} students
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="min-w-8">
                1
              </Button>
              <Button variant="ghost" size="sm" className="min-w-8">
                2
              </Button>
              <Button variant="ghost" size="sm" className="min-w-8">
                3
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
