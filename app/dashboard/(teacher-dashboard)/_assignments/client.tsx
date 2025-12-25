'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createAssignment } from '@/server/assignments';
import { useToast } from '@/hooks/use-toast';

const assignmentColors = [
  'bg-pastel-lavender',
  'bg-pastel-mint',
  'bg-pastel-peach',
  'bg-pastel-cream',
  'bg-pastel-sky',
];

const getStatusBadge = (status: string, dueDate: Date) => {
  const today = new Date();
  const due = new Date(dueDate);
  const isOverdue = due < today && status === 'active';

  if (isOverdue) {
    return (
      <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <AlertCircle className="h-3 w-3 mr-1" />
        Overdue
      </Badge>
    );
  }

  switch (status) {
    case 'active':
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Clock className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    case 'graded':
      return (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Graded
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function AssignmentsClient({
  initialAssignments,
}: {
  initialAssignments: any[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredAssignments = initialAssignments
    .map((a, i) => ({
      ...a,
      color: assignmentColors[i % assignmentColors.length],
      dueDate: new Date(a.dueDate),
      totalStudents: 20, // Mock for now
      submissionCount: 0, // Mock for now
    }))
    .filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || assignment.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

  const stats = {
    total: initialAssignments.length,
    active: initialAssignments.filter((a) => a.status === 'active').length,
    graded: initialAssignments.filter((a) => a.status === 'graded').length,
    pending: 0, // logic needs real submission data
  };

  async function handleAddAssignment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      subject: formData.get('subject') as string,
      classId: formData.get('classId') as string, // Real input needed
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      totalPoints: parseInt(formData.get('points') as string),
      status: 'active', // Add this line
    };

    const res = await createAssignment(data);
    if (res.success) {
      toast({ title: 'Assignment created' });
      setIsAddDialogOpen(false);
    } else {
      toast({ title: 'Error creating assignment', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Assignment Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and track student assignments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-assignment">
              <Plus className="h-4 w-4 mr-1" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Assignment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAssignment} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Assignment title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    name="subject"
                    id="subject"
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class ID</Label>
                  <Input name="classId" placeholder="Class UUID" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Assignment description and instructions"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input name="dueDate" id="dueDate" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="points">Total Points</Label>
                  <Input
                    name="points"
                    id="points"
                    type="number"
                    placeholder="100"
                    defaultValue="100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stats Section - simplified for prototype */}
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <FileText className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
          <CardTitle className="text-lg font-semibold">Assignments</CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32" data-testid="select-status">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => {
              const submissionPercentage = Math.round(
                (assignment.submissionCount / assignment.totalStudents) * 100
              );

              return (
                <Card
                  key={assignment.id}
                  className="hover-elevate"
                  data-testid={`card-assignment-${assignment.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`p-3 rounded-xl ${assignment.color} shrink-0`}
                        >
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">
                              {assignment.title}
                            </h3>
                            {getStatusBadge(
                              assignment.status,
                              assignment.dueDate
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {assignment.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground flex-wrap">
                            <span>{assignment.subject}</span>
                            <Badge variant="outline">
                              {assignment.class?.className || 'Class'}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Due: {assignment.dueDate.toLocaleDateString()}
                              </span>
                            </div>
                            <span>{assignment.totalPoints} points</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm mb-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>
                              {assignment.submissionCount}/
                              {assignment.totalStudents}
                            </span>
                          </div>
                          <Progress
                            value={submissionPercentage}
                            className="w-24 h-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {submissionPercentage}% submitted
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Submissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No assignments found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
