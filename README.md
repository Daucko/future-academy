# 🎓 Future Academy

### 🌟 Modern AI-Powered School Management System

Future Academy is a cutting-edge platform designed to streamline educational administration and enrich the learning experience. Built with Next.js 15 and Prisma, it offers a seamless interface for teachers, students, and administrators to manage academic excellence.

---

## ✨ Key Features

- **📊 Centralized Dashboard**: Real-time insights into students, classes, and academic performance.
- **🏫 Class & Student Management**: Comprehensive tools to organize rosters, records, and student profiles.
- **📝 Assignments & Exams**: Modern assessment flow from creation to grading and feedback.
- **🕒 Attendance Tracking**: Digital attendance system with precise check-in and check-out tracking.
- **📅 Dynamic Scheduling**: Automated timetable management for classes and teachers.
- **💬 Integrated Messaging**: Secure internal communication channel for school-wide updates.
- **🤖 AI-Enhanced Learning**: On-demand AI explanations for better concept clarity.
- **📜 Detailed Reporting**: Administrative and academic reports generated with one click.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Acceleration**: [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) for edge-ready performance.
- **Authentication**: [Auth.js v5](https://authjs.dev/) (NextAuth) with optimized edge configuration.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **UI Architecture**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Form Handling**: React Hook Form & Zod for schema validation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- A PostgreSQL database (e.g., Neon, Supabase, or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Daucko/future-academy.git
   cd Future-Academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL="your_prisma_accelerate_or_postgres_url"
   AUTH_SECRET="your_nextauth_secret"
   ```

4. **Initialize Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Sync Database Schema**
   ```bash
   npx prisma migrate dev
   ```

6. **Launch development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the result.

---

## ☁️ Deployment

Future Academy is optimized for **Vercel** with a specialized architecture to ensure peak performance:

- **Edge Optimization**: Uses a split Auth.js configuration to keep the middleware bundle under the 1MB edge function limit.
- **Custom Prisma Output**: Generates the Prisma Client into `app/generated-prisma-client` for optimal bundle resolution on Vercel.
- **Prisma Accelerate**: Seamlessly integrates with the Prisma Data Proxy for fast, global database queries.

---

Built with ❤️ for a better future in education.
