"use client";

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
import { createAttendance, updateAttendance } from "@/app/actions/attendance";
import { useToast } from "@/hooks/use-toast";

// Types
interface Student {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
    classId: string | null;
    avatarUrl: string | null;
    class?: { className: string } | null;
}

interface AttendanceRecord {
    id: string;
    studentId: string;
    date: Date;
    status: string;
    checkInTime?: string | null;
    checkOutTime?: string | null;
}

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

export default function AttendanceClient({
    initialAttendance,
    initialStudents
}: {
    initialAttendance: any[],
    initialStudents: any[]
}) {
    const [selectedClass, setSelectedClass] = useState("302"); // Should use real class IDs or filter by logic
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    // Combine Students with their attendance for Selected Date
    const combinedData = initialStudents.map(student => {
        // Find attendance record for this student on selected date
        const record = initialAttendance.find(a =>
            a.studentId === student.id &&
            new Date(a.date).toISOString().split("T")[0] === selectedDate
        );
        return {
            ...student,
            status: record?.status || "present", // Default to present or 'unknown' if no record? Original mock had status.
            checkIn: record?.checkInTime,
            checkOut: record?.checkOutTime,
            recordId: record?.id
        };
    });

    const filteredStudents = combinedData.filter((student) => {
        // Basic filter by class if we had class ID. 
        // Since we don't know real class IDs mapping to "302", we might skip class filter or try to match className
        // For prototype, we filter if className includes selectedClass
        const classMatch = !selectedClass || (student.class?.className || "").includes(selectedClass) || selectedClass === "all";

        const matchesSearch =
            student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch; // && classMatch; // Enable class match when real data aligns
    });

    const presentCount = filteredStudents.filter((s) => s.status === "present").length;
    const totalCount = filteredStudents.length;

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
                                    {filteredStudents.filter((s) => s.status === "absent").length}
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
                                    {totalCount ? Math.round((presentCount / totalCount) * 100) : 0}%
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
                                {/* Need real classes here */}
                                <SelectItem value="302">Class 302</SelectItem>
                                <SelectItem value="303">Class 303</SelectItem>
                                <SelectItem value="304">Class 304</SelectItem>
                                <SelectItem value="all">All</SelectItem>
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
                                                    <AvatarImage src={student.avatarUrl || ""} />
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                        {student.firstName[0]}
                                                        {student.lastName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">
                                                    {student.firstName} {student.lastName}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {student.studentId}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{student.class?.className || "Class"}</Badge>
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
                </CardContent>
            </Card>
        </div>
    );
}
