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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  ClipboardCheck,
  Award,
  Download,
} from "lucide-react";

const attendanceData = [
  { month: "Sep", rate: 94 },
  { month: "Oct", rate: 96 },
  { month: "Nov", rate: 95 },
  { month: "Dec", rate: 97 },
];

const examPerformanceData = [
  { subject: "Math", avgScore: 78, passRate: 92 },
  { subject: "Physics", avgScore: 72, passRate: 85 },
  { subject: "Chemistry", avgScore: 75, passRate: 88 },
  { subject: "English", avgScore: 82, passRate: 95 },
  { subject: "History", avgScore: 80, passRate: 93 },
];

const gradeDistribution = [
  { name: "A", value: 25, color: "#8b5cf6" },
  { name: "B", value: 35, color: "#10b981" },
  { name: "C", value: 25, color: "#f59e0b" },
  { name: "D", value: 10, color: "#f97316" },
  { name: "F", value: 5, color: "#ef4444" },
];

const weeklyAttendance = [
  { day: "Mon", present: 45, absent: 3 },
  { day: "Tue", present: 46, absent: 2 },
  { day: "Wed", present: 44, absent: 4 },
  { day: "Thu", present: 47, absent: 1 },
  { day: "Fri", present: 43, absent: 5 },
];

const enrollmentTrend = [
  { year: "2020", students: 850 },
  { year: "2021", students: 920 },
  { year: "2022", students: 1050 },
  { year: "2023", students: 1150 },
  { year: "2024", students: 1234 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Performance insights and statistics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="semester">
            <SelectTrigger className="w-40" data-testid="select-period">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-pastel-lavender border-pastel-lavender-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">1,234</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12% from last year</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Users className="h-5 w-5 text-pastel-lavender-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-mint border-pastel-mint-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">96.5%</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+2.3% this month</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <ClipboardCheck className="h-5 w-5 text-pastel-mint-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-peach border-pastel-peach-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Exam Score</p>
                <p className="text-2xl font-bold">77.4%</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                  <TrendingDown className="h-3 w-3" />
                  <span>-1.2% from last exam</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <BookOpen className="h-5 w-5 text-pastel-peach-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pastel-cream border-pastel-cream-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold">91.6%</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+3.4% this semester</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                <Award className="h-5 w-5 text-pastel-cream-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[90, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorRate)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Exam Performance by Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={examPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="subject" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Weekly Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAttendance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="present"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Present"
                  />
                  <Bar
                    dataKey="absent"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    name="Absent"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Enrollment Trend (5 Years)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="year" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
