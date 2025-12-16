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
  FileBarChart,
  Calendar,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  FileText,
  Users,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockReports = [
  {
    id: "1",
    title: "Monthly Attendance Report",
    type: "attendance",
    generatedAt: "2024-12-15",
    status: "ready",
    icon: ClipboardCheck,
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    title: "Semester Exam Results",
    type: "exam",
    generatedAt: "2024-12-14",
    status: "ready",
    icon: FileText,
    color: "bg-pastel-mint",
  },
  {
    id: "3",
    title: "Student Performance Analysis",
    type: "performance",
    generatedAt: "2024-12-13",
    status: "ready",
    icon: TrendingUp,
    color: "bg-pastel-peach",
  },
  {
    id: "4",
    title: "Class Enrollment Summary",
    type: "enrollment",
    generatedAt: "2024-12-12",
    status: "ready",
    icon: Users,
    color: "bg-pastel-cream",
  },
  {
    id: "5",
    title: "Weekly Progress Report",
    type: "progress",
    generatedAt: "2024-12-11",
    status: "ready",
    icon: FileBarChart,
    color: "bg-pastel-sky",
  },
];

const reportTypes = [
  {
    id: "attendance",
    name: "Attendance Report",
    description: "Track student attendance patterns",
    icon: ClipboardCheck,
    color: "bg-pastel-lavender",
  },
  {
    id: "exam",
    name: "Exam Results",
    description: "Exam scores and analytics",
    icon: FileText,
    color: "bg-pastel-mint",
  },
  {
    id: "performance",
    name: "Performance Analysis",
    description: "Student academic performance",
    icon: TrendingUp,
    color: "bg-pastel-peach",
  },
  {
    id: "enrollment",
    name: "Enrollment Summary",
    description: "Class enrollment statistics",
    icon: Users,
    color: "bg-pastel-cream",
  },
];

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || report.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Reports
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate and view school reports
          </p>
        </div>
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-generate-report">
              <Plus className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Report Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {reportTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-3 rounded-lg border cursor-pointer hover-elevate transition-colors ${type.color}`}
                      data-testid={`select-report-type-${type.id}`}
                    >
                      <type.icon className="h-5 w-5 mb-2" />
                      <p className="font-medium text-sm">{type.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" data-testid="input-start-date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" data-testid="input-end-date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Class (Optional)</Label>
                <Select>
                  <SelectTrigger data-testid="select-class">
                    <SelectValue placeholder="All classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="302">Class 302</SelectItem>
                    <SelectItem value="303">Class 303</SelectItem>
                    <SelectItem value="304">Class 304</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                Cancel
              </Button>
              <Button data-testid="button-submit-report">Generate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportTypes.map((type) => (
          <Card
            key={type.id}
            className={`${type.color} border hover-elevate cursor-pointer`}
            data-testid={`card-quick-report-${type.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{type.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                  <type.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">
            Generated Reports
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40" data-testid="select-type">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="enrollment">Enrollment</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48"
                data-testid="input-search"
              />
            </div>
            <Button variant="outline" size="icon" data-testid="button-filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                data-testid={`row-report-${report.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${report.color}`}>
                    <report.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Generated: {report.generatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {report.type}
                  </Badge>
                  <Button variant="ghost" size="icon" data-testid={`button-view-${report.id}`}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-download-${report.id}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Regenerate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileBarChart className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No reports found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
