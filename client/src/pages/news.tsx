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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Calendar,
  User,
  MoreVertical,
  Edit,
  Trash2,
  Newspaper,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockNews = [
  {
    id: "1",
    title: "Winter Break Schedule Announcement",
    content: "The school will be closed for winter break from December 23rd to January 3rd. Classes will resume on January 4th. We wish all our students and staff a wonderful holiday season!",
    category: "announcement",
    author: "Principal Office",
    publishedAt: "2024-12-15",
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    title: "Science Fair Winners Announced",
    content: "Congratulations to all participants of this year's Science Fair! Special recognition goes to Emma Thompson (1st place), Michael Chen (2nd place), and Sarah Williams (3rd place) for their outstanding projects.",
    category: "achievement",
    author: "Science Department",
    publishedAt: "2024-12-14",
    color: "bg-pastel-mint",
  },
  {
    id: "3",
    title: "Parent-Teacher Conference Schedule",
    content: "Parent-Teacher conferences will be held on January 15th and 16th. Parents can book their time slots through the school portal starting December 20th.",
    category: "event",
    author: "Administration",
    publishedAt: "2024-12-13",
    color: "bg-pastel-peach",
  },
  {
    id: "4",
    title: "New Library Resources Available",
    content: "The school library has received a new collection of books and digital resources. Students can now access e-books and online journals through their student accounts.",
    category: "general",
    author: "Library",
    publishedAt: "2024-12-12",
    color: "bg-pastel-cream",
  },
  {
    id: "5",
    title: "Sports Day Registration Open",
    content: "Annual Sports Day is scheduled for January 25th. Students interested in participating should register with their class teacher by January 10th.",
    category: "event",
    author: "Sports Department",
    publishedAt: "2024-12-11",
    color: "bg-pastel-sky",
  },
];

const getCategoryBadge = (category: string) => {
  const colors: Record<string, string> = {
    announcement: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    achievement: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    event: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    general: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <Badge className={colors[category] || colors.general}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

export default function SchoolNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredNews = mockNews.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || news.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            School News
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Latest announcements and updates
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-news">
              <Plus className="h-4 w-4 mr-1" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create News Post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="News title" data-testid="input-title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="News content..."
                  className="min-h-[150px]"
                  data-testid="textarea-content"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button data-testid="button-submit-news">Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">News Feed</CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40" data-testid="select-filter-category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48"
                data-testid="input-search"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <Card
                key={news.id}
                className="hover-elevate"
                data-testid={`card-news-${news.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${news.color} shrink-0`}>
                        <Newspaper className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold">{news.title}</h3>
                          {getCategoryBadge(news.category)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {news.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{news.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{news.publishedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No news found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
