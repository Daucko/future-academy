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

const mockSchedule = [
  {
    id: "1",
    subject: "Mathematics",
    class: "302",
    dayOfWeek: 0,
    startTime: "08:00",
    endTime: "09:00",
    room: "Room 101",
    teacher: "Mr. Johnson",
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    subject: "Physics",
    class: "302",
    dayOfWeek: 0,
    startTime: "10:00",
    endTime: "11:00",
    room: "Lab 3",
    teacher: "Dr. Smith",
    color: "bg-pastel-mint",
  },
  {
    id: "3",
    subject: "English",
    class: "302",
    dayOfWeek: 1,
    startTime: "08:00",
    endTime: "09:00",
    room: "Room 102",
    teacher: "Mrs. Brown",
    color: "bg-pastel-peach",
  },
  {
    id: "4",
    subject: "Chemistry",
    class: "302",
    dayOfWeek: 1,
    startTime: "11:00",
    endTime: "12:00",
    room: "Lab 1",
    teacher: "Dr. Wilson",
    color: "bg-pastel-sky",
  },
  {
    id: "5",
    subject: "History",
    class: "302",
    dayOfWeek: 2,
    startTime: "09:00",
    endTime: "10:00",
    room: "Room 103",
    teacher: "Mr. Davis",
    color: "bg-pastel-cream",
  },
  {
    id: "6",
    subject: "Art",
    class: "302",
    dayOfWeek: 2,
    startTime: "14:00",
    endTime: "15:00",
    room: "Art Studio",
    teacher: "Ms. Garcia",
    color: "bg-pastel-rose",
  },
  {
    id: "7",
    subject: "Mathematics",
    class: "302",
    dayOfWeek: 3,
    startTime: "08:00",
    endTime: "09:00",
    room: "Room 101",
    teacher: "Mr. Johnson",
    color: "bg-pastel-lavender",
  },
  {
    id: "8",
    subject: "Biology",
    class: "302",
    dayOfWeek: 3,
    startTime: "10:00",
    endTime: "11:00",
    room: "Lab 2",
    teacher: "Dr. Taylor",
    color: "bg-pastel-mint",
  },
  {
    id: "9",
    subject: "Physical Education",
    class: "302",
    dayOfWeek: 4,
    startTime: "09:00",
    endTime: "10:00",
    room: "Gymnasium",
    teacher: "Coach Williams",
    color: "bg-pastel-peach",
  },
  {
    id: "10",
    subject: "Music",
    class: "302",
    dayOfWeek: 4,
    startTime: "13:00",
    endTime: "14:00",
    room: "Music Room",
    teacher: "Mr. Lee",
    color: "bg-pastel-sky",
  },
];

const getTimeIndex = (time: string) => {
  return timeSlots.indexOf(time);
};

export default function Schedule() {
  const [selectedClass, setSelectedClass] = useState("302");
  const [currentWeek, setCurrentWeek] = useState("Dec 16 - 20, 2024");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSchedule = mockSchedule.filter((s) => s.class === selectedClass);

  const getScheduleForSlot = (day: number, time: string) => {
    return filteredSchedule.find(
      (s) => s.dayOfWeek === day && s.startTime === time
    );
  };

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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Mathematics" data-testid="input-subject" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Select>
                    <SelectTrigger data-testid="select-day">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" data-testid="input-start-time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" data-testid="input-end-time" />
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
              <Button data-testid="button-submit-schedule">Add Entry</Button>
            </div>
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
                <SelectItem value="302">Class 302</SelectItem>
                <SelectItem value="303">Class 303</SelectItem>
                <SelectItem value="304">Class 304</SelectItem>
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
                .filter((s) => s.dayOfWeek === 0)
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
                        <span>{schedule.teacher}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Hours
                </span>
                <span className="font-semibold">
                  {filteredSchedule.length} hrs
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
                data-testid="button-print-schedule"
              >
                Print Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-export-schedule"
              >
                Export to PDF
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-share-schedule"
              >
                Share Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
