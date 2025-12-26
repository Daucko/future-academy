'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  CheckCircle2,
  BarChart3,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface GradeData {
  examResults: any[];
  assignmentSubmissions: any[];
}

export default function StudentGradesClient({ data }: { data: GradeData }) {
  const [searchTerm, setSearchTerm] = useState('');

  const totalExams = data.examResults.length;
  const totalAssignments = data.assignmentSubmissions.length;

  // Simple average calculation for demo
  const avgExamScore =
    totalExams > 0
      ? Math.round(
          data.examResults.reduce((acc, curr) => acc + curr.score, 0) /
            totalExams
        )
      : 0;

  const avgAssignmentScore =
    totalAssignments > 0
      ? Math.round(
          data.assignmentSubmissions.reduce(
            (acc, curr) => acc + (curr.grade || 0),
            0
          ) / totalAssignments
        )
      : 0;

  const overallAverage =
    totalExams + totalAssignments > 0
      ? Math.round((avgExamScore + avgAssignmentScore) / 2)
      : 0;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Academic Performance
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review your grades and track your progress across all subjects.
          </p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <Badge
                variant="outline"
                className="text-white border-white/30 bg-white/10"
              >
                Overall Avg
              </Badge>
            </div>
            <div className="text-4xl font-bold mb-1">{overallAverage}%</div>
            <p className="text-blue-100 text-sm">Combined Performance</p>
            <Progress value={overallAverage} className="h-2 bg-white/20 mt-4" />
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Exams
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {avgExamScore}%
            </div>
            <p className="text-gray-500 text-sm">{totalExams} Graded Exams</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                Assignments
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {avgAssignmentScore}%
            </div>
            <p className="text-gray-500 text-sm">
              {totalAssignments} Graded Assignments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Recent Grades Table */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Detailed Grades
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by subject..."
                className="pl-9 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {/* Combine and sort for "Recent" view */}
                {[
                  ...data.examResults.map((r) => ({
                    ...r,
                    type: 'Exam',
                    title: r.exam.examType,
                    subject: r.exam.subject,
                    date: r.gradedAt,
                    scoreDisplay: r.score,
                    total: 100,
                  })),
                  ...data.assignmentSubmissions.map((s) => ({
                    ...s,
                    type: 'Assignment',
                    title: s.assignment.title,
                    subject: s.assignment.subject,
                    date: s.submissionDate,
                    scoreDisplay: s.grade,
                    total: s.assignment.totalPoints,
                  })),
                ]
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .filter((item) =>
                    item.subject
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-4 group"
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          item.type === 'Exam'
                            ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {item.type === 'Exam' ? (
                          <BookOpen className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {item.subject}
                          </span>
                          <Badge
                            variant="outline"
                            className="h-4 text-[10px] px-1 font-medium bg-gray-100 dark:bg-gray-800"
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {item.scoreDisplay}%
                        </div>
                        <div className="text-[10px] text-gray-500">
                          Grade: {item.grade || 'N/A'}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  ))}

                {totalExams + totalAssignments === 0 && (
                  <div className="p-12 text-center text-gray-500 italic">
                    No grades recorded yet. Keep up the good work!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Tips/Stats */}
        <div className="xl:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grade Breakdown</CardTitle>
              <CardDescription>Performance by type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Exams
                  </span>
                  <span className="font-bold">{avgExamScore}%</span>
                </div>
                <Progress
                  value={avgExamScore}
                  className="h-1.5 bg-emerald-100 dark:bg-emerald-900/20"
                  color="emerald"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Assignments
                  </span>
                  <span className="font-bold">{avgAssignmentScore}%</span>
                </div>
                <Progress
                  value={avgAssignmentScore}
                  className="h-1.5 bg-purple-100 dark:bg-purple-900/20"
                  color="purple"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button variant="outline" className="w-full gap-2 text-xs">
                  <BarChart3 className="h-3.5 w-3.5" />
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Academic Tip
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your assignment scores are excellent! Try to focus more on
                    Exam preparation to balance your overall grade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
