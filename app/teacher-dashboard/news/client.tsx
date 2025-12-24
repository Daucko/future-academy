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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Plus,
    Calendar,
    Search,
    Edit,
    Trash2,
    MoreVertical,
    Megaphone
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { createSchoolNews } from "@/server/news";
import { useToast } from "@/hooks/use-toast";

export default function NewsClient({ initialNews }: { initialNews: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();

    const filteredNews = initialNews.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleAddNews(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            isPublished: true,
        };

        const res = await createSchoolNews(data);
        if (res.success) {
            toast({ title: "News published" });
            setIsAddDialogOpen(false);
        } else {
            toast({ title: "Error publishing news", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold">School News</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Announcements and updates for the school community
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Post News
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Post News</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddNews} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input name="title" required placeholder="Announcement headline" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Academic">Academic</SelectItem>
                                        <SelectItem value="Events">Events</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea name="content" required placeholder="Write your announcement..." className="min-h-[100px]" />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Publish</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 max-w-sm"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((news) => (
                        <Card key={news.id} className="hover-elevate">
                            <CardContent className="p-5 flex flex-col h-full">
                                <div className="flex items-start justify-between">
                                    <Badge variant="secondary">{news.category}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(news.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-semibold mt-3 mb-2">{news.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                    {news.content}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t mt-auto">
                                    <span className="text-xs text-muted-foreground">
                                        By {news.author}
                                    </span>
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
                            </CardContent>
                        </Card>
                    ))}
                    {filteredNews.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No news found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
