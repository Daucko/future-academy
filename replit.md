# Maham School Management System

## Overview

A comprehensive school management system with a soft pastel aesthetic design. The system serves multiple audiences including prospective students, parents, current students, and alumni. Built with React (frontend), Express (backend), and PostgreSQL with Drizzle ORM.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Wouter for routing, TanStack Query for data fetching
- **Styling**: Tailwind CSS with custom pastel color scheme, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Theme**: Soft pastel colors (lavender, mint, peach, cream, sky blue) with dark/light mode toggle

### Directory Structure
```
├── client/src/
│   ├── App.tsx              # Main app with sidebar layout and routing
│   ├── components/
│   │   ├── app-sidebar.tsx  # Main navigation sidebar
│   │   ├── theme-toggle.tsx # Dark/light mode toggle
│   │   └── ui/              # Shadcn UI components
│   ├── lib/
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── queryClient.ts   # TanStack Query configuration
│   └── pages/               # All page components
│       ├── overview.tsx     # Dashboard overview
│       ├── exams.tsx        # Exam management
│       ├── attendance.tsx   # Attendance tracking
│       ├── students.tsx     # Student directory
│       ├── messages.tsx     # Messaging system
│       ├── schedule.tsx     # Class scheduling
│       ├── class-preparation.tsx  # Lesson planning
│       ├── assignments.tsx  # Assignment management
│       ├── analytics.tsx    # Data analytics
│       ├── reports.tsx      # Report generation
│       ├── news.tsx         # School news
│       ├── activities.tsx   # School activities
│       ├── whats-new.tsx    # System updates
│       └── settings.tsx     # User settings
├── server/
│   ├── index.ts             # Express server entry
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Database operations
│   ├── db.ts                # Database connection
│   └── vite.ts              # Vite development server
├── shared/
│   └── schema.ts            # Drizzle ORM schema definitions
└── tailwind.config.ts       # Tailwind configuration with pastel colors
```

### Database Schema
- **users**: Teachers and administrators
- **classes**: Class/grade information
- **students**: Student records with contact info
- **exams**: Exam scheduling and management
- **attendance**: Daily attendance records
- **assignments**: Homework and assignments
- **schedules**: Class timetables
- **messages**: Internal messaging system
- **schoolNews**: School announcements
- **schoolActivities**: Events and activities
- **lessonPlans**: Teacher lesson preparations
- **reports**: Generated reports

## Key Features

1. **Dashboard Overview** - Quick stats, upcoming events, and recent activity
2. **Exam Management** - Schedule and track exams with status indicators
3. **Attendance Tracking** - Daily attendance with statistics
4. **Student Directory** - Comprehensive student information
5. **Messaging** - Internal communication system
6. **Schedule View** - Weekly timetable management
7. **Class Preparation** - Lesson planning tools
8. **Assignments** - Track and manage assignments
9. **Analytics** - Visual charts and insights
10. **Reports** - Generate various reports
11. **School News** - Announcements and updates
12. **Activities** - Event management
13. **Settings** - User preferences and account management

## Design System

### Color Palette (Pastel Theme)
- **Lavender**: Primary color (#E6E6FA / 270°)
- **Mint**: Success/accent (#98FB98 / 120°)  
- **Peach**: Warning (#FFDAB9 / 28°)
- **Cream**: Neutral (#FFFDD0 / 55°)
- **Sky Blue**: Info (#87CEEB / 197°)

### Theme Toggle
The app supports both light and dark modes with a smooth toggle transition. Theme preference is persisted in localStorage.

## API Endpoints

All endpoints follow RESTful conventions:

- `GET/POST /api/classes` - List/create classes
- `GET/PATCH/DELETE /api/classes/:id` - Get/update/delete class
- `GET/POST /api/students` - List/create students
- `GET/PATCH/DELETE /api/students/:id` - Get/update/delete student
- `GET/POST /api/exams` - List/create exams
- `GET/POST /api/attendance` - List/create attendance records
- `GET/POST /api/assignments` - List/create assignments
- `GET/POST /api/schedules` - List/create schedules
- `GET/POST /api/messages` - List/create messages
- `GET/POST /api/news` - List/create news
- `GET/POST /api/activities` - List/create activities
- `GET/POST /api/lesson-plans` - List/create lesson plans
- `GET/POST /api/reports` - List/create reports

## Development

### Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push schema changes to database
- `npm run build` - Build for production

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `SESSION_SECRET` - Session secret for authentication

## Recent Changes

- **Dec 2024**: Initial implementation with full-stack architecture
  - Complete database schema with 12 tables
  - All frontend pages implemented
  - API routes with Zod validation
  - Soft pastel design system
  - Dark/light theme toggle

## User Preferences

- Soft pastel aesthetic is preferred over bold colors
- Clean, rounded UI elements (rounded-xl)
- Subtle hover effects using elevation system
- Information hierarchy with proper text contrast
