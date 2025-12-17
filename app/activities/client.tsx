"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    Calendar,
    Search,
    Edit,
    Trash2,
    MapPin,
    Clock,
    PartyPopper
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { createSchoolActivity } from "@/app/actions/activities";
import { useToast } from "@/hooks/use-toast";

export default function ActivitiesClient({ initialActivities }: { initialActivities: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredActivities = initialActivities.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleAddActivity(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            location: formData.get("location") as string,
            organizer: "School Board", // Hardcoded
            type: "Event" // Hardcoded or select
        };

        const res = await createSchoolActivity(data);
        if (res.success) {
            toast({ title: "Activity created" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error creating activity", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold">School Activities</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Upcoming events and extracurricular activities
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Activity
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Activity</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddActivity} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input name="title" required placeholder="e.g., Annual Sports Day" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input name="date" type="date" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Input name="time" type="time" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input name="location" required placeholder="e.g., School Grounds" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" required placeholder="Event details..." className="min-h-[100px]" />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Event</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search activities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 max-w-sm"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredActivities.map((activity) => (
                        <Card key={activity.id} className="hover-elevate overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className="mb-2">
                                        {activity.type || "Event"}
                                    </Badge>
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

                                <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {activity.description}
                                </p>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>{activity.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>{activity.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredActivities.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No activities found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
