# Design Guidelines: School Management System

## Design Approach
**Reference-Based Design** - Drawing from the uploaded dashboard aesthetic combined with modern admin panel patterns (Linear, Vercel Dashboard). The design prioritizes clarity, soft aesthetics, and functional elegance for educational environments.

## Core Design Principles
1. **Soft & Approachable**: Pastel color palette creates a welcoming, non-intimidating environment
2. **Information Density with Breathing Room**: Rich functionality without overwhelming users
3. **Dual-Theme Ready**: Light mode (primary) with dark mode toggle for flexibility

## Typography System

**Font Stack**: Inter via Google Fonts CDN
- **Headings**: 
  - H1: text-2xl font-semibold (Dashboard titles)
  - H2: text-xl font-semibold (Section headers)
  - H3: text-lg font-medium (Card titles, class names)
- **Body**: text-sm font-normal (Primary content)
- **Labels**: text-xs font-medium uppercase tracking-wide (Form labels, metadata)
- **Stats/Numbers**: text-3xl font-bold (Quick stats display)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4
- Sidebar: w-64 fixed left
- Main content: ml-64 with p-8 container

**Grid Patterns**:
- Quick stats: grid-cols-4 gap-4
- Exam cards: grid-cols-3 gap-4
- Student roster: Single column with dividers

## Color Palette (Light Mode - Primary)

**Pastels from Reference**:
- Lavender cards: bg-purple-50 border-purple-100
- Mint cards: bg-emerald-50 border-emerald-100  
- Peach cards: bg-orange-50 border-orange-100
- Cream cards: bg-amber-50 border-amber-100
- Sky cards: bg-blue-50 border-blue-100

**Base Colors**:
- Background: bg-gray-50
- Cards: bg-white with shadow-sm
- Sidebar: bg-white border-r border-gray-200
- Text primary: text-gray-900
- Text secondary: text-gray-600
- Borders: border-gray-200

**Dark Mode** (via theme toggle):
- Background: bg-gray-900
- Cards: bg-gray-800
- Sidebar: bg-gray-800
- Text: text-gray-100/text-gray-400
- Pastels darken to bg-purple-900/10 variants

## Component Library

### Sidebar Navigation
- Fixed left, full height
- Logo at top (h-16 with p-4)
- Main menu items with icons (Heroicons)
- Active state: bg-gray-100 with left border-l-4 border-blue-500
- Messages item: Badge with unread count (absolute positioned)
- Settings section: Separated with border-top
- User profile at bottom: Avatar + name + dropdown

### Exam Calendar Cards
- Rounded-xl corners
- Pastel backgrounds with matching border
- Header: Class number (text-xs) + Class name (text-lg font-semibold)
- Body: Time, exam type, confirmation checkmark icon
- Footer: Student count with user icon + three-dot menu
- Hover: Subtle lift with shadow-md

### Monthly Calendar Widget
- Grid layout for dates
- Today: Dark circle (bg-gray-900 text-white rounded-full)
- Selected dates: Lighter highlight
- Weekday headers in text-xs font-medium text-gray-500

### Upcoming Exams Sidebar
- Stacked cards with color-matched left border
- Each card: Title, date/time, countdown badge ("X days left")
- Badge: Rounded-full bg-gray-100 text-xs px-3 py-1

### Quick Stats Cards
- White background, shadow-sm
- Icon in colored circle (matches stat theme)
- Large number (text-3xl font-bold)
- Label below (text-sm text-gray-600)
- Subtle hover scale

### Data Tables (Students, Attendance)
- Striped rows with hover:bg-gray-50
- Sticky header
- Avatar + name + metadata columns
- Action buttons (icon-only) aligned right

### Forms & Inputs
- Rounded-lg borders
- Focus: ring-2 ring-blue-500
- Labels: text-sm font-medium mb-2
- Helper text: text-xs text-gray-500

### Buttons
- Primary: bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2
- Secondary: bg-white border border-gray-300 hover:bg-gray-50
- Icon-only: p-2 rounded-lg hover:bg-gray-100
- Blur backgrounds on image overlays: backdrop-blur-md bg-white/80

### Theme Toggle Button
- Position: Top-right header or sidebar settings
- Icon: Sun/Moon from Heroicons
- Style: Icon-only button with rounded-lg hover:bg-gray-100
- Smooth transition on theme change

## Images

**Dashboard Context**: No large hero images - this is a functional admin panel. Images used sparingly:
- User avatars: rounded-full w-8 h-8 in sidebar, w-10 h-10 in tables
- School logo: SVG or PNG in sidebar header (h-10 w-auto)
- Empty states: Illustration graphics for "no exams scheduled" (center-aligned, max-w-xs)

## Page Layouts

### Dashboard Overview
- Top: Welcome message + date
- Quick stats grid (4 columns)
- Two-column: Recent activity feed (left 2/3) + Quick actions (right 1/3)

### Exams Page (Primary Feature)
- Header: Title + "Add Exam" button + filters
- Main: Grid of exam cards (3 columns) on left 2/3
- Sidebar: Monthly calendar + upcoming exams list on right 1/3

### Students Directory
- Search bar at top
- Filter chips below
- Table view with pagination
- Click row: Slide-in detail panel

### Messages
- Three-column: Inbox list (left) + conversation (center) + details (right)
- Unread badge on sidebar icon

## Animations
Use sparingly for polish:
- Card hover: transform scale-[1.02] transition-transform
- Sidebar active: Border slide-in animation
- Theme toggle: Smooth color transitions (transition-colors duration-200)
- Modal/drawer entry: Slide from right with backdrop fade

## Micro-interactions
- Checkbox animations on attendance marking
- Countdown timer updates
- Notification badge pulse
- Loading skeletons for async data

This design balances professional functionality with approachable aesthetics perfect for educational environments, while maintaining modern web standards and dual-theme flexibility.