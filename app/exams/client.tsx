"use client";

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
import { createExam } from "@/app/actions/exams";
import { useToast } from "@/hooks/use-toast";

const examColors = [
    "bg-pastel-lavender border-pastel-lavender-border",
    "bg-pastel-mint border-pastel-mint-border",
    "bg-pastel-peach border-pastel-peach-border",
    "bg-pastel-cream border-pastel-cream-border",
    "bg-pastel-sky border-pastel-sky-border",
];

const months = ["Jan", "Feb", "March", "April", "May", "June", "July"];

interface Exam {
    id: string;
    classId: string;
    subject: string;
    examType: string;
    examDate: Date;
    startTime: string;
    endTime?: string | null;
    confirmed: boolean;
    studentCount?: number | null;
    class?: { className: string; grade: number } | null;
}

interface ExamCardProps {
    exam: Exam & { colorIndex: number };
}

function ExamCard({ exam }: ExamCardProps) {
    return (
        <div
            className={`p-4 rounded-xl border ${examColors[exam.colorIndex % examColors.length]} transition-all hover:shadow-md`}
            data-testid={`card-exam-${exam.id}`}
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <Badge
                    variant="outline"
                    className="text-xs font-medium bg-white/50 dark:bg-black/20"
                >
                    {exam.class?.className || "Class"}
                </Badge>
                <span className="text-xs text-muted-foreground">{exam.class?.className || "Unknown Class"}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{exam.startTime}</p>

            <div className="mt-3 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                <p className="font-medium text-sm">{exam.examType}</p>
                <p className="text-xs text-muted-foreground">Grade {exam.class?.grade || "?"}</p>
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
                        <span className="text-xs">{exam.studentCount || 0}</span>
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

export default function ExamsClient({ initialExams }: { initialExams: (Omit<Exam, "examDate"> & { examDate: string | Date })[] }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedMonth, setSelectedMonth] = useState("Feb");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    // Map initial exams to include colorIndex and group them
    // Logic from original: ensure exams are grouped by row?
    // Original mock data had 'row' property. We will simulate rows based on index.
    const processedExams = initialExams.map((exam, index) => ({
        ...exam,
        colorIndex: index % examColors.length,
        row: Math.floor(index / 3) + 1, // 3 exams per row roughly
        // Ensure Date types
        examDate: new Date(exam.examDate),
    }));

    const groupedExams = processedExams.reduce((acc, exam) => {
        if (!acc[exam.row]) acc[exam.row] = [];
        acc[exam.row].push(exam);
        return acc;
    }, {} as Record<number, typeof processedExams>);

    async function handleAddExam(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            classId: formData.get("classId") as string, // We need valid class IDs in real app
            subject: formData.get("subject") as string,
            examType: formData.get("subject") as string, // Using subject as type for now
            examDate: formData.get("date") as string,
            startTime: formData.get("time") as string,
            room: formData.get("room") as string,
            confirmed: false,
        };

        // In a real scenario, we'd need a Select with real Class IDs. 
        // For now we might just allow text or hardcode if we don't have classes fetched.
        // Ideally we should fetch classes too in layout or page.

        const res = await createExam(data);
        if (res.success) {
            toast({ title: "Exam added (Note: Ensure Class ID is valid)" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error adding exam", variant: "destructive" });
        }
    }

    // Simplified upcoming exams for now
    const upcomingExams = processedExams.slice(0, 2).map((exam) => ({
        id: exam.id,
        classNumber: exam.class?.className || "Class",
        title: exam.subject,
        date: exam.examDate.toLocaleDateString(),
        time: exam.startTime,
        daysLeft: Math.ceil((exam.examDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
        color: examColors[exam.colorIndex % examColors.length].split(" ")[0], // Extract bg color
    }));

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
                        Manage examination schedules
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
                            <form onSubmit={handleAddExam} className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="class">Class ID</Label>
                                    {/* In real app, fetch classes */}
                                    <Input name="classId" placeholder="Class UUID" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input name="subject" id="subject" placeholder="e.g., Math Exam" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input name="date" id="date" type="date" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input name="time" id="time" type="time" required />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="room">Room</Label>
                                    <Input name="room" id="room" placeholder="e.g., Room 101" />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Exam</Button>
                                </div>
                            </form>
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
                                    {processedExams.length}
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
                                                Row {row}
                                            </span>
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {exams.map((exam) => (
                                                    <ExamCard key={exam.id} exam={exam} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {processedExams.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No exams scheduled.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                            {/* Calendar Widget placeholder */}
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-base font-semibold">Calendar</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-2">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">*</span>
                                <CardTitle className="text-sm font-medium">
                                    {processedExams.length} Exams total
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
