import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, date, time, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (teachers, admins)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("teacher"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
  avatarUrl: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Classes table
export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classNumber: text("class_number").notNull(),
  className: text("class_name").notNull(),
  grade: integer("grade").notNull(),
  section: text("section"),
  teacherId: varchar("teacher_id").references(() => users.id),
  colorTheme: text("color_theme").default("lavender"),
});

export const insertClassSchema = createInsertSchema(classes).omit({ id: true });
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Class = typeof classes.$inferSelect;

// Students table
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: text("student_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  classId: varchar("class_id").references(() => classes.id),
  grade: integer("grade").notNull(),
  avatarUrl: text("avatar_url"),
  dateOfBirth: date("date_of_birth"),
  parentName: text("parent_name"),
  parentPhone: text("parent_phone"),
  address: text("address"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const insertStudentSchema = createInsertSchema(students).omit({ id: true, enrolledAt: true });
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

// Exams table
export const exams = pgTable("exams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").references(() => classes.id).notNull(),
  examType: text("exam_type").notNull(),
  subject: text("subject").notNull(),
  examDate: date("exam_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time"),
  confirmed: boolean("confirmed").default(false),
  studentCount: integer("student_count").default(0),
  room: text("room"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExamSchema = createInsertSchema(exams).omit({ id: true, createdAt: true });
export type InsertExam = z.infer<typeof insertExamSchema>;
export type Exam = typeof exams.$inferSelect;

// Attendance table
export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  classId: varchar("class_id").references(() => classes.id).notNull(),
  date: date("date").notNull(),
  status: text("status").notNull().default("present"),
  checkInTime: time("check_in_time"),
  checkOutTime: time("check_out_time"),
  notes: text("notes"),
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendance.$inferSelect;

// Assignments table
export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  classId: varchar("class_id").references(() => classes.id).notNull(),
  subject: text("subject").notNull(),
  dueDate: date("due_date").notNull(),
  totalPoints: integer("total_points").default(100),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({ id: true, createdAt: true });
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Assignment = typeof assignments.$inferSelect;

// Schedules table
export const schedules = pgTable("schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").references(() => classes.id).notNull(),
  subject: text("subject").notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  room: text("room"),
  teacherId: varchar("teacher_id").references(() => users.id),
});

export const insertScheduleSchema = createInsertSchema(schedules).omit({ id: true });
export type InsertSchedule = z.infer<typeof insertScheduleSchema>;
export type Schedule = typeof schedules.$inferSelect;

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").references(() => users.id).notNull(),
  recipientId: varchar("recipient_id").references(() => users.id).notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// School News table
export const schoolNews = pgTable("school_news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").default("general"),
  authorId: varchar("author_id").references(() => users.id),
  publishedAt: timestamp("published_at").defaultNow(),
  isPublished: boolean("is_published").default(true),
});

export const insertSchoolNewsSchema = createInsertSchema(schoolNews).omit({ id: true, publishedAt: true });
export type InsertSchoolNews = z.infer<typeof insertSchoolNewsSchema>;
export type SchoolNews = typeof schoolNews.$inferSelect;

// School Activities table
export const schoolActivities = pgTable("school_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  activityDate: date("activity_date").notNull(),
  startTime: time("start_time"),
  endTime: time("end_time"),
  location: text("location"),
  category: text("category").default("event"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSchoolActivitySchema = createInsertSchema(schoolActivities).omit({ id: true, createdAt: true });
export type InsertSchoolActivity = z.infer<typeof insertSchoolActivitySchema>;
export type SchoolActivity = typeof schoolActivities.$inferSelect;

// Reports table
export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(),
  data: jsonb("data"),
  generatedBy: varchar("generated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReportSchema = createInsertSchema(reports).omit({ id: true, createdAt: true });
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

// Class Preparations / Lesson Plans
export const lessonPlans = pgTable("lesson_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").references(() => classes.id).notNull(),
  teacherId: varchar("teacher_id").references(() => users.id),
  subject: text("subject").notNull(),
  topic: text("topic").notNull(),
  objectives: text("objectives"),
  materials: text("materials"),
  lessonDate: date("lesson_date").notNull(),
  duration: integer("duration"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLessonPlanSchema = createInsertSchema(lessonPlans).omit({ id: true, createdAt: true });
export type InsertLessonPlan = z.infer<typeof insertLessonPlanSchema>;
export type LessonPlan = typeof lessonPlans.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  classes: many(classes),
  messages: many(messages),
  lessonPlans: many(lessonPlans),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(users, { fields: [classes.teacherId], references: [users.id] }),
  students: many(students),
  exams: many(exams),
  schedules: many(schedules),
  assignments: many(assignments),
  lessonPlans: many(lessonPlans),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  class: one(classes, { fields: [students.classId], references: [classes.id] }),
  attendance: many(attendance),
}));

export const examsRelations = relations(exams, ({ one }) => ({
  class: one(classes, { fields: [exams.classId], references: [classes.id] }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(students, { fields: [attendance.studentId], references: [students.id] }),
  class: one(classes, { fields: [attendance.classId], references: [classes.id] }),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  class: one(classes, { fields: [assignments.classId], references: [classes.id] }),
}));

export const schedulesRelations = relations(schedules, ({ one }) => ({
  class: one(classes, { fields: [schedules.classId], references: [classes.id] }),
  teacher: one(users, { fields: [schedules.teacherId], references: [users.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
  recipient: one(users, { fields: [messages.recipientId], references: [users.id] }),
}));

export const lessonPlansRelations = relations(lessonPlans, ({ one }) => ({
  class: one(classes, { fields: [lessonPlans.classId], references: [classes.id] }),
  teacher: one(users, { fields: [lessonPlans.teacherId], references: [users.id] }),
}));
