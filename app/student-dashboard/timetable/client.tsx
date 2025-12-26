'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Search,
  Download,
  CheckCircle,
  Play,
  User,
  DoorOpen,
  FileText,
  Utensils,
  Sun,
  ArrowRight,
  Menu,
  Bell,
  Mail,
  School,
  CalendarDays,
  User as UserIcon,
  MapPin as RoomIcon,
  BookOpen as BookIcon,
  DownloadCloud,
} from 'lucide-react';

const timetableItems = [
  {
    time: '08:00',
    status: 'done',
    title: 'Homeroom',
    teacher: 'Mr. Thompson',
    room: '',
    type: 'homeroom',
    icon: 'check',
  },
  {
    time: '09:00',
    status: 'done',
    title: 'Mathematics',
    teacher: 'Mr. Johnson',
    room: 'Room 101',
    type: 'class',
    icon: 'check',
  },
  {
    time: '10:00',
    status: 'current',
    title: 'Science',
    teacher: 'Ms. Davis',
    room: 'Lab 302',
    topic: 'Physics: Motion & Forces',
    type: 'class',
    icon: 'play',
  },
  {
    time: '11:00',
    status: 'upcoming',
    title: 'English Literature',
    teacher: 'Mrs. Smith',
    room: 'Room 204',
    type: 'class',
    icon: 'dot',
  },
  {
    time: '12:00',
    status: 'break',
    title: 'Lunch Break',
    duration: '1 Hour',
    location: 'Cafeteria',
    type: 'break',
    icon: 'sun',
  },
  {
    time: '13:00',
    status: 'upcoming',
    title: 'History',
    teacher: 'Mr. Clark',
    room: 'Room 105',
    type: 'class',
    icon: 'dot',
  },
];

export default function TimetableClient({ initialData }: { initialData: any }) {
  const [currentDate, setCurrentDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use initialData if available, otherwise fall back to hardcoded items
  const displayItems =
    initialData && initialData.length > 0 ? initialData : timetableItems;

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        {/* <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div> */}

        {/* Sidebar */}
        {/* <aside className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-200 ease-in-out
          flex flex-col h-screen
        `}>
                    <div className="p-6 pb-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <School className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">EduPortal</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 border border-slate-200 dark:border-slate-700"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrJz1G8cuz_lhNAOWSBbAwUTxKu0wBDnpJNR7y1YWSPj7Xpht0TQttSElwmXh0PFAWhI73-CLEb3iOu48Fhz804LJxDmxws0o0ZcJwh5qwJF5Keticz1v8LdSZ3bKUcGi1p35nniCkblzAXOLLSgkza5-H7HhiQwcjVsmYAziu2OxQKGkn2Wx9Um1KQnLogY-K0oSemC4BQfhckQAJwFL_5VEv8yQX_A5Pkli_cTr7_0sd-z39fg8SS7kB-tjRYTuofEaUW53CLYs")' }}
                            />
                            <div className="flex flex-col min-w-0">
                                <h1 className="text-sm font-semibold truncate text-slate-900 dark:text-white">Alex Morgan</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-xs truncate">Year 10 Student</p>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-1">
                            <Button
                                variant="ghost"
                                className="justify-start text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
                            >
                                <Calendar className="h-5 w-5 mr-3" />
                                Dashboard
                            </Button>

                            <Button
                                variant="secondary"
                                className="justify-start bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                            >
                                <Calendar className="h-5 w-5 mr-3" />
                                Schedule
                            </Button>

                            <Button
                                variant="ghost"
                                className="justify-start text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
                            >
                                <BookIcon className="h-5 w-5 mr-3" />
                                Assignments
                            </Button>

                            <Button
                                variant="ghost"
                                className="justify-start text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
                            >
                                <School className="h-5 w-5 mr-3" />
                                Grades
                            </Button>

                            <Button
                                variant="ghost"
                                className="justify-start text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
                            >
                                <UserIcon className="h-5 w-5 mr-3" />
                                Settings
                            </Button>
                        </nav>
                    </div>

                    <div className="mt-auto p-6">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">Next Exam</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Mathematics Final</p>
                            <Progress value={75} className="h-1.5 bg-slate-200 dark:bg-slate-700 mb-2" />
                            <p className="text-xs text-slate-500 dark:text-slate-500">3 days remaining</p>
                        </div>
                    </div>
                </aside> */}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header */}
          {/* <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden sm:flex items-center relative w-64">
                <Search className="absolute left-3 h-5 w-5 text-slate-400" />
                <Input
                  className="w-full pl-10 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm"
                  placeholder="Search classes, teachers..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              </Button>

              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </header> */}

          {/* Timetable Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Today's Timetable
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {currentDate}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="shadow-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    Daily Schedule
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View full week
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-[70px_32px_1fr] md:grid-cols-[90px_40px_1fr] gap-y-0">
                    {displayItems.map((item: any, index: number) => (
                      <div key={index} className="contents">
                        {/* Time Column */}
                        <div className="text-right pt-4 pr-3">
                          <span
                            className={`text-sm font-medium ${
                              item.status === 'current'
                                ? 'text-blue-600 dark:text-blue-400 font-bold'
                                : item.status === 'upcoming'
                                ? 'text-slate-700 dark:text-slate-300 font-semibold'
                                : 'text-slate-400'
                            }`}
                          >
                            {item.time}
                          </span>
                          {item.status === 'current' && (
                            <p className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 mt-0.5 tracking-wider">
                              Now
                            </p>
                          )}
                        </div>

                        {/* Timeline Column */}
                        <div className="relative flex flex-col items-center">
                          <div className="w-px h-full bg-slate-200 dark:bg-slate-700 absolute top-0 bottom-0 left-1/2 -translate-x-1/2" />
                          <div className="relative z-10 bg-white dark:bg-slate-900 rounded-full mt-2">
                            {item.icon === 'check' && (
                              <CheckCircle className="h-6 w-6 text-green-400" />
                            )}
                            {item.icon === 'play' && (
                              <div className="bg-blue-600 text-white rounded-full p-1 shadow-lg shadow-blue-600/30">
                                <Play className="h-5 w-5" />
                              </div>
                            )}
                            {item.icon === 'dot' && (
                              <div className="border-2 border-slate-200 dark:border-slate-700 p-0.5 rounded-full">
                                <div className="size-2.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                              </div>
                            )}
                            {item.icon === 'sun' && (
                              <div className="p-1">
                                <Sun className="h-5 w-5 text-amber-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content Column */}
                        <div
                          className={`pb-8 pt-0 pl-2 ${
                            index === timetableItems.length - 1 ? 'pb-0' : ''
                          }`}
                        >
                          {item.type === 'break' ? (
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 border-dashed rounded-xl p-3 flex items-center gap-3">
                              <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                                <Utensils className="h-5 w-5 text-amber-500" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {item.location} • {item.duration}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`
                              rounded-xl p-4 border transition-all
                              ${
                                item.status === 'current'
                                  ? 'bg-white dark:bg-slate-800 border-l-4 border-l-blue-600 shadow-md shadow-blue-600/5 ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-lg hover:shadow-blue-600/10 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-blue-600/5 before:to-transparent before:z-0'
                                  : item.status === 'done'
                                  ? 'bg-gray-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 opacity-80'
                                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                              }
                            `}
                            >
                              <div className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                  <h4
                                    className={`font-bold ${
                                      item.status === 'current'
                                        ? 'text-lg text-slate-900 dark:text-white group-hover:text-blue-600'
                                        : item.status === 'done'
                                        ? 'font-semibold text-slate-400'
                                        : 'text-slate-900 dark:text-white'
                                    }`}
                                  >
                                    {item.title}
                                  </h4>
                                  <Badge
                                    variant={
                                      item.status === 'current'
                                        ? 'default'
                                        : item.status === 'done'
                                        ? 'secondary'
                                        : 'outline'
                                    }
                                    className={`
                                      ${
                                        item.status === 'current'
                                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 animate-pulse'
                                          : ''
                                      }
                                    `}
                                  >
                                    {item.status === 'current' && (
                                      <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-blue-600" />
                                        In Progress
                                      </div>
                                    )}
                                    {item.status === 'done' && 'Done'}
                                    {item.status === 'upcoming' && 'Upcoming'}
                                  </Badge>
                                </div>

                                {item.status === 'current' && item.topic ? (
                                  <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <User className="h-4 w-4 text-blue-600" />
                                        {item.teacher}
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <DoorOpen className="h-4 w-4 text-blue-600" />
                                        {item.room}
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 sm:col-span-2">
                                        <FileText className="h-4 w-4 text-blue-600" />
                                        {item.topic}
                                      </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-blue-600/20 text-blue-600 hover:bg-blue-50"
                                      >
                                        View Materials
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        Submit Homework
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <span className="flex items-center gap-1.5">
                                      <User className="h-4 w-4" />
                                      {item.teacher}
                                    </span>
                                    {item.room && (
                                      <span className="flex items-center gap-1.5">
                                        <DoorOpen className="h-4 w-4" />
                                        {item.room}
                                      </span>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
