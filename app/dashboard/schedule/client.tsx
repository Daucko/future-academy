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
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    User,
} from "lucide-react";
import { createSchedule } from "@/app/dashboard/actions/schedules";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const scheduleColors = [
    "bg-pastel-lavender",
    "bg-pastel-mint",
    "bg-pastel-peach",
    "bg-pastel-sky",
    "bg-pastel-cream",
    "bg-pastel-rose",
];

export default function ScheduleClient({ initialSchedules, initialClasses }: { initialSchedules: any[], initialClasses: any[] }) {
    const [selectedClass, setSelectedClass] = useState(initialClasses[0]?.id || "");
    const [currentWeek, setCurrentWeek] = useState("Dec 16 - 20, 2024"); // Mock date for now
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredSchedule = initialSchedules.filter((s) => s.classId === selectedClass).map((s, i) => ({
        ...s,
        color: scheduleColors[i % scheduleColors.length]
    }));

    const getScheduleForSlot = (day: number, time: string) => {
        // day is 0-4 (Mon-Fri)
        // Need to parse startTime to match slot
        return filteredSchedule.find(
            (s) => s.dayOfWeek === day && s.startTime.startsWith(time.split(":")[0])
        );
    };

    async function handleAddSchedule(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            classId: formData.get("classId") as string,
            subject: formData.get("subject") as string,
            dayOfWeek: parseInt(formData.get("dayOfWeek") as string),
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
            room: formData.get("room") as string,
        };

        const res = await createSchedule(data);
        if (res.success) {
            toast({ title: "Schedule added" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error adding schedule", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold" data-testid="text-page-title">
                        Schedule
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        View and manage class timetables
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" data-testid="button-add-schedule">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add Schedule Entry</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddSchedule} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input name="subject" placeholder="e.g., Mathematics" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="dayOfWeek">Day</Label>
                                    <Select name="dayOfWeek" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {weekDays.map((day, index) => (
                                                <SelectItem key={day} value={index.toString()}>
                                                    {day}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="classId">Class</Label>
                                    <Select name="classId" defaultValue={selectedClass} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {initialClasses.map(c => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="startTime">Start Time</Label>
                                    <Input name="startTime" type="time" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="endTime">End Time</Label>
                                    <Input name="endTime" type="time" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="room">Room</Label>
                                <Input name="room" placeholder="e.g., Room 101" />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add Entry</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
                    <div className="flex items-center gap-4">
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-32" data-testid="select-filter-class">
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {initialClasses.map(c => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.className}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium px-2">{currentWeek}</span>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-6 gap-2">
                                <div className="p-2"></div>
                                {weekDays.map((day, index) => (
                                    <div
                                        key={day}
                                        className="p-3 text-center font-medium text-sm bg-muted/50 rounded-lg"
                                    >
                                        <span className="text-muted-foreground">{day}</span>
                                        <p className="text-lg font-semibold">{16 + index}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2 space-y-1">
                                {timeSlots.map((time) => (
                                    <div key={time} className="grid grid-cols-6 gap-2">
                                        <div className="p-2 text-sm text-muted-foreground text-right pr-4">
                                            {time}
                                        </div>
                                        {weekDays.map((_, dayIndex) => {
                                            const schedule = getScheduleForSlot(dayIndex, time);
                                            return (
                                                <div
                                                    key={`${dayIndex}-${time}`}
                                                    className="min-h-[80px] rounded-lg border border-dashed border-border/50 p-1"
                                                >
                                                    {schedule && (
                                                        <div
                                                            className={`h-full ${schedule.color} rounded-lg p-3 hover-elevate cursor-pointer`}
                                                            data-testid={`schedule-${schedule.id}`}
                                                        >
                                                            <p className="font-medium text-sm">
                                                                {schedule.subject}
                                                            </p>
                                                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                                <Clock className="h-3 w-3" />
                                                                <span>
                                                                    {schedule.startTime} - {schedule.endTime}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                                <MapPin className="h-3 w-3" />
                                                                <span>{schedule.room}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                            Today's Classes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {filteredSchedule
                                .filter((s) => s.dayOfWeek === new Date().getDay() - 1) // Crude today check
                                .map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className={`p-3 rounded-lg ${schedule.color}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{schedule.subject}</p>
                                            <Badge variant="outline" className="text-xs">
                                                {schedule.startTime}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{schedule.room}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span>{schedule.teacher || "Teacher"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {filteredSchedule.filter(s => s.dayOfWeek === new Date().getDay() - 1).length === 0 && (
                                <div className="text-sm text-muted-foreground text-center py-4">No classes today</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                            Class Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total Classes/Week
                                </span>
                                <span className="font-semibold">{filteredSchedule.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Unique Subjects
                                </span>
                                <span className="font-semibold">
                                    {new Set(filteredSchedule.map((s) => s.subject)).size}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                Print Schedule
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
