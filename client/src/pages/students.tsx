import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockStudents = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Thompson",
    studentId: "STD001",
    email: "emma.t@school.edu",
    phone: "+1 234 567 890",
    class: "302",
    grade: 12,
    avatar: null,
    parentName: "Robert Thompson",
    parentPhone: "+1 234 567 891",
    address: "123 Oak Street, Springfield",
    enrolledAt: "2022-09-01",
    status: "active",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    studentId: "STD002",
    email: "michael.c@school.edu",
    phone: "+1 234 567 892",
    class: "302",
    grade: 12,
    avatar: null,
    parentName: "Wei Chen",
    parentPhone: "+1 234 567 893",
    address: "456 Maple Avenue, Springfield",
    enrolledAt: "2022-09-01",
    status: "active",
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Williams",
    studentId: "STD003",
    email: "sarah.w@school.edu",
    phone: "+1 234 567 894",
    class: "303",
    grade: 11,
    avatar: null,
    parentName: "Jennifer Williams",
    parentPhone: "+1 234 567 895",
    address: "789 Pine Road, Springfield",
    enrolledAt: "2023-09-01",
    status: "active",
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Rodriguez",
    studentId: "STD004",
    email: "james.r@school.edu",
    phone: "+1 234 567 896",
    class: "303",
    grade: 11,
    avatar: null,
    parentName: "Maria Rodriguez",
    parentPhone: "+1 234 567 897",
    address: "321 Elm Street, Springfield",
    enrolledAt: "2023-09-01",
    status: "active",
  },
  {
    id: "5",
    firstName: "Olivia",
    lastName: "Davis",
    studentId: "STD005",
    email: "olivia.d@school.edu",
    phone: "+1 234 567 898",
    class: "304",
    grade: 10,
    avatar: null,
    parentName: "Mark Davis",
    parentPhone: "+1 234 567 899",
    address: "654 Cedar Lane, Springfield",
    enrolledAt: "2024-09-01",
    status: "active",
  },
  {
    id: "6",
    firstName: "David",
    lastName: "Kim",
    studentId: "STD006",
    email: "david.k@school.edu",
    phone: "+1 234 567 900",
    class: "304",
    grade: 10,
    avatar: null,
    parentName: "Sung Kim",
    parentPhone: "+1 234 567 901",
    address: "987 Birch Court, Springfield",
    enrolledAt: "2024-09-01",
    status: "active",
  },
];

interface StudentCardProps {
  student: (typeof mockStudents)[0];
}

function StudentCard({ student }: StudentCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <Card className="hover-elevate" data-testid={`card-student-${student.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar || ""} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {student.firstName} {student.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{student.studentId}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-testid={`button-menu-${student.id}`}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Class {student.class}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Grade {student.grade}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>{student.phone}</span>
          </div>
        </div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.avatar || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.studentId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">Class {student.class}</Badge>
                    <Badge variant="secondary">Grade {student.grade}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{student.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Enrolled: {student.enrolledAt}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Parent/Guardian</p>
                <p className="text-sm">{student.parentName}</p>
                <p className="text-sm text-muted-foreground">
                  {student.parentPhone}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade =
      selectedGrade === "all" || student.grade.toString() === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  const gradeStats = [
    { grade: 12, count: mockStudents.filter((s) => s.grade === 12).length },
    { grade: 11, count: mockStudents.filter((s) => s.grade === 11).length },
    { grade: 10, count: mockStudents.filter((s) => s.grade === 10).length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage student records and information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-student">
              <Plus className="h-4 w-4 mr-1" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" data-testid="input-first-name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" data-testid="input-last-name" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.d@school.edu"
                  data-testid="input-email"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select>
                    <SelectTrigger data-testid="select-grade">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  data-testid="input-phone"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input id="parentName" placeholder="Parent name" data-testid="input-parent-name" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button data-testid="button-submit-student">Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{mockStudents.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Users className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        {gradeStats.map((stat, index) => (
          <Card
            key={stat.grade}
            className={
              index === 0
                ? "bg-pastel-mint border-pastel-mint-border"
                : index === 1
                ? "bg-pastel-peach border-pastel-peach-border"
                : "bg-pastel-cream border-pastel-cream-border"
            }
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Grade {stat.grade}
                  </p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">
            Student Directory
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-32" data-testid="select-filter-grade">
                <SelectValue placeholder="All grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No students found</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
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
