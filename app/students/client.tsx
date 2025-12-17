"use client";

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
import { createStudent } from "@/app/actions/students";
import { useToast } from "@/hooks/use-toast";

interface Student {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
    email: string | null;
    phone: string | null;
    classId: string | null; // class is reserved
    grade: number;
    avatarUrl: string | null;
    parentName: string | null;
    parentPhone: string | null;
    address: string | null;
    enrolledAt: Date;
    class?: { className: string } | null;
}

interface StudentCardProps {
    student: Student;
}

function StudentCard({ student }: StudentCardProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <Card className="hover-elevate" data-testid={`card-student-${student.id}`}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={student.avatarUrl || ""} />
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
                            {student.class?.className || "No Class"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            Grade {student.grade}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{student.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{student.phone || "N/A"}</span>
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
                                    <AvatarImage src={student.avatarUrl || ""} />
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
                                        <Badge variant="outline">{student.class?.className || "No Class"}</Badge>
                                        <Badge variant="secondary">Grade {student.grade}</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.email || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.phone || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.address || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {/* Handle Date object safely */}
                                    <span>Enrolled: {student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString() : "N/A"}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm font-medium mb-2">Parent/Guardian</p>
                                <p className="text-sm">{student.parentName || "N/A"}</p>
                                <p className="text-sm text-muted-foreground">
                                    {student.parentPhone || "N/A"}
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default function StudentsClient({ initialStudents }: { initialStudents: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredStudents = initialStudents.filter((student) => {
        const matchesSearch =
            student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesGrade =
            selectedGrade === "all" || student.grade.toString() === selectedGrade;

        return matchesSearch && matchesGrade;
    });

    const gradeStats = [
        { grade: 12, count: initialStudents.filter((s) => s.grade === 12).length },
        { grade: 11, count: initialStudents.filter((s) => s.grade === 11).length },
        { grade: 10, count: initialStudents.filter((s) => s.grade === 10).length },
    ];

    async function handleAddStudent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            studentId: "STD" + Math.floor(Math.random() * 10000), // simplistic ID generation
            grade: parseInt(formData.get("grade") as string),
            phone: formData.get("phone") as string,
            parentName: formData.get("parentName") as string,
            // Add other fields as needed
        };

        const res = await createStudent(data);
        if (res.success) {
            toast({ title: "Student added" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error adding student", variant: "destructive" });
        }
    }

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
                        <form onSubmit={handleAddStudent} className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input name="firstName" id="firstName" placeholder="John" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input name="lastName" id="lastName" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" id="email" type="email" placeholder="john.d@school.edu" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="grade">Grade</Label>
                                <Select name="grade" defaultValue="10">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">Grade 10</SelectItem>
                                        <SelectItem value="11">Grade 11</SelectItem>
                                        <SelectItem value="12">Grade 12</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input name="phone" id="phone" type="tel" placeholder="+1 234 567 890" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                                <Input name="parentName" id="parentName" placeholder="Parent name" />
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add Student</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stats cards same as before */}
                <Card className="bg-pastel-lavender border-pastel-lavender-border">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Students</p>
                                <p className="text-2xl font-bold">{initialStudents.length}</p>
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
                            <SelectTrigger className="w-32">
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
                            />
                        </div>
                        <Button variant="outline" size="icon">
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
                </CardContent>
            </Card>
        </div>
    );
}
