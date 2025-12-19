"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    BookOpen,
    Search,
    Filter,
    FileText,
    Calendar,
    MoreVertical,
    Edit,
    Trash2
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { createLessonPlan } from "@/app/dashboard/actions/lesson-plans";
import { useToast } from "@/hooks/use-toast";

export default function ClassPreparationClient({ initialPlans }: { initialPlans: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredPlans = initialPlans.filter((plan) =>
        plan.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleAddPlan(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            subject: formData.get("subject") as string,
            topic: formData.get("topic") as string,
            grade: parseInt(formData.get("grade") as string),
            date: formData.get("date") as string,
            duration: parseInt(formData.get("duration") as string),
            objectives: (formData.get("objectives") as string).split('\n'),
            materials: (formData.get("materials") as string)?.split('\n') || [],
            activities: [], // Complex structure, simplifying for form
            assessment: formData.get("assessment") as string || ""
        };

        const res = await createLessonPlan(data);
        if (res.success) {
            toast({ title: "Lesson Plan created" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error creating lesson plan", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold">Class Preparation</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage lesson plans and teaching materials
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            New Lesson Plan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create Lesson Plan</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddPlan} className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input name="subject" required placeholder="e.g. Math" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="grade">Grade</Label>
                                    <Input name="grade" type="number" required placeholder="10" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="topic">Topic</Label>
                                <Input name="topic" required placeholder="e.g. Calculus" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input name="date" type="date" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration (mins)</Label>
                                    <Input name="duration" type="number" required defaultValue="60" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="objectives">Objectives (one per line)</Label>
                                <Textarea name="objectives" required placeholder="Student will be able to..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="materials">Materials (one per line)</Label>
                                <Textarea name="materials" placeholder="Textbook, Projector..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="assessment">Assessment</Label>
                                <Input name="assessment" placeholder="Quiz, Homework..." />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Plan</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search lesson plans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 max-w-sm"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPlans.map((plan) => (
                        <Card key={plan.id} className="hover-elevate cursor-pointer">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline">{plan.subject}</Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <h3 className="font-semibold text-lg mb-1">{plan.topic}</h3>
                                <p className="text-sm text-muted-foreground mb-4">Grade {plan.grade} • {plan.duration} mins</p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 pt-4 border-t">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(plan.date).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredPlans.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No lesson plans found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
