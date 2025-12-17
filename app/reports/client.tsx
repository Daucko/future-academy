"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    FileText,
    Plus,
    Download,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Trash2,
    Calendar,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createReport } from "@/app/actions/reports";
import { useToast } from "@/hooks/use-toast";

// Mock student mapping if real students are missing or just for ID lookup
export default function ReportsClient({ initialReports, initialStudents }: { initialReports: any[], initialStudents: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredReports = initialReports.filter((report) => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.student?.lastName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
            selectedType === "all" || report.type.toLowerCase() === selectedType.toLowerCase();

        return matchesSearch && matchesType;
    });

    async function handleAddReport(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            type: formData.get("type") as string,
            studentId: formData.get("studentId") as string,
            content: {}, // JSON content, maybe extend form?
            status: "Draft",
        };

        // Basic implementation
        const res = await createReport(data);
        if (res.success) {
            toast({ title: "Report created" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error creating report", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold" data-testid="text-page-title">
                        Student Reports
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Generate and manage academic cards and progress reports
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" data-testid="button-create-report">
                            <Plus className="h-4 w-4 mr-1" />
                            Create Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Report</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddReport} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Report Title</Label>
                                <Input name="title" placeholder="e.g., Mid-Term Progress" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Report Type</Label>
                                <Select name="type" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Academic">Academic Performance</SelectItem>
                                        <SelectItem value="Behavioral">Behavioral Report</SelectItem>
                                        <SelectItem value="Attendance">Attendance Summary</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="student">Student</Label>
                                <Select name="studentId" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {initialStudents.map(s => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.firstName} {s.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Report</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
                    <CardTitle className="text-lg font-semibold">Reports List</CardTitle>
                    <div className="flex items-center gap-3 flex-wrap">
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-32" data-testid="select-filter-type">
                                <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Academic">Academic</SelectItem>
                                <SelectItem value="Behavioral">Behavioral</SelectItem>
                                <SelectItem value="Attendance">Attendance</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-48"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredReports.map((report) => (
                            <Card key={report.id} className="hover-elevate cursor-pointer">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2 rounded-lg bg-primary/10`}>
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download PDF
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold">{report.title}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                            <Badge variant="secondary" className="font-normal text-xs">
                                                {report.type}
                                            </Badge>
                                            <span>•</span>
                                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-[10px]">
                                                    {report.student?.firstName?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">
                                                {report.student?.firstName} {report.student?.lastName}
                                            </span>
                                        </div>
                                        <Badge
                                            variant={report.status === "Published" ? "default" : "outline"}
                                            className="text-xs"
                                        >
                                            {report.status || "Draft"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {filteredReports.length === 0 && (
                            <div className="col-span-full py-8 text-center text-muted-foreground">
                                No reports found.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`inline-flex items-center justify-center rounded-full bg-muted ${className}`}>
            {children}
        </div>
    )
}

function AvatarFallback({ className, children }: { className?: string; children: React.ReactNode }) {
    return <span className={className}>{children}</span>
}
