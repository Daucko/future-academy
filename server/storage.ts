import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "./db";
import {
  users, InsertUser, User,
  classes, InsertClass, Class,
  students, InsertStudent, Student,
  exams, InsertExam, Exam,
  attendance, InsertAttendance, Attendance,
  assignments, InsertAssignment, Assignment,
  schedules, InsertSchedule, Schedule,
  messages, InsertMessage, Message,
  schoolNews, InsertSchoolNews, SchoolNews,
  schoolActivities, InsertSchoolActivity, SchoolActivity,
  reports, InsertReport, Report,
  lessonPlans, InsertLessonPlan, LessonPlan,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Classes
  getClasses(): Promise<Class[]>;
  getClass(id: string): Promise<Class | undefined>;
  createClass(cls: InsertClass): Promise<Class>;
  updateClass(id: string, cls: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: string): Promise<boolean>;

  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  getStudentsByClass(classId: string): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: string): Promise<boolean>;

  // Exams
  getExams(): Promise<Exam[]>;
  getExam(id: string): Promise<Exam | undefined>;
  getExamsByClass(classId: string): Promise<Exam[]>;
  createExam(exam: InsertExam): Promise<Exam>;
  updateExam(id: string, exam: Partial<InsertExam>): Promise<Exam | undefined>;
  deleteExam(id: string): Promise<boolean>;

  // Attendance
  getAttendance(): Promise<Attendance[]>;
  getAttendanceByStudent(studentId: string): Promise<Attendance[]>;
  getAttendanceByClass(classId: string, date?: string): Promise<Attendance[]>;
  createAttendance(record: InsertAttendance): Promise<Attendance>;
  updateAttendance(id: string, record: Partial<InsertAttendance>): Promise<Attendance | undefined>;

  // Assignments
  getAssignments(): Promise<Assignment[]>;
  getAssignment(id: string): Promise<Assignment | undefined>;
  getAssignmentsByClass(classId: string): Promise<Assignment[]>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: string, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined>;
  deleteAssignment(id: string): Promise<boolean>;

  // Schedules
  getSchedules(): Promise<Schedule[]>;
  getSchedulesByClass(classId: string): Promise<Schedule[]>;
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;
  updateSchedule(id: string, schedule: Partial<InsertSchedule>): Promise<Schedule | undefined>;
  deleteSchedule(id: string): Promise<boolean>;

  // Messages
  getMessages(userId: string): Promise<Message[]>;
  getSentMessages(userId: string): Promise<Message[]>;
  getMessage(id: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<Message | undefined>;
  deleteMessage(id: string): Promise<boolean>;

  // School News
  getSchoolNews(): Promise<SchoolNews[]>;
  getSchoolNewsItem(id: string): Promise<SchoolNews | undefined>;
  createSchoolNews(news: InsertSchoolNews): Promise<SchoolNews>;
  updateSchoolNews(id: string, news: Partial<InsertSchoolNews>): Promise<SchoolNews | undefined>;
  deleteSchoolNews(id: string): Promise<boolean>;

  // School Activities
  getSchoolActivities(): Promise<SchoolActivity[]>;
  getSchoolActivity(id: string): Promise<SchoolActivity | undefined>;
  createSchoolActivity(activity: InsertSchoolActivity): Promise<SchoolActivity>;
  updateSchoolActivity(id: string, activity: Partial<InsertSchoolActivity>): Promise<SchoolActivity | undefined>;
  deleteSchoolActivity(id: string): Promise<boolean>;

  // Lesson Plans
  getLessonPlans(): Promise<LessonPlan[]>;
  getLessonPlan(id: string): Promise<LessonPlan | undefined>;
  getLessonPlansByClass(classId: string): Promise<LessonPlan[]>;
  createLessonPlan(plan: InsertLessonPlan): Promise<LessonPlan>;
  updateLessonPlan(id: string, plan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined>;
  deleteLessonPlan(id: string): Promise<boolean>;

  // Reports
  getReports(): Promise<Report[]>;
  getReport(id: string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  deleteReport(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const [updated] = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return updated;
  }

  // Classes
  async getClasses(): Promise<Class[]> {
    return db.select().from(classes);
  }

  async getClass(id: string): Promise<Class | undefined> {
    const [cls] = await db.select().from(classes).where(eq(classes.id, id));
    return cls;
  }

  async createClass(cls: InsertClass): Promise<Class> {
    const [created] = await db.insert(classes).values(cls).returning();
    return created;
  }

  async updateClass(id: string, cls: Partial<InsertClass>): Promise<Class | undefined> {
    const [updated] = await db.update(classes).set(cls).where(eq(classes.id, id)).returning();
    return updated;
  }

  async deleteClass(id: string): Promise<boolean> {
    const result = await db.delete(classes).where(eq(classes.id, id));
    return true;
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return db.select().from(students);
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async getStudentsByClass(classId: string): Promise<Student[]> {
    return db.select().from(students).where(eq(students.classId, classId));
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [created] = await db.insert(students).values(student).returning();
    return created;
  }

  async updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined> {
    const [updated] = await db.update(students).set(student).where(eq(students.id, id)).returning();
    return updated;
  }

  async deleteStudent(id: string): Promise<boolean> {
    await db.delete(students).where(eq(students.id, id));
    return true;
  }

  // Exams
  async getExams(): Promise<Exam[]> {
    return db.select().from(exams).orderBy(desc(exams.examDate));
  }

  async getExam(id: string): Promise<Exam | undefined> {
    const [exam] = await db.select().from(exams).where(eq(exams.id, id));
    return exam;
  }

  async getExamsByClass(classId: string): Promise<Exam[]> {
    return db.select().from(exams).where(eq(exams.classId, classId)).orderBy(desc(exams.examDate));
  }

  async createExam(exam: InsertExam): Promise<Exam> {
    const [created] = await db.insert(exams).values(exam).returning();
    return created;
  }

  async updateExam(id: string, exam: Partial<InsertExam>): Promise<Exam | undefined> {
    const [updated] = await db.update(exams).set(exam).where(eq(exams.id, id)).returning();
    return updated;
  }

  async deleteExam(id: string): Promise<boolean> {
    await db.delete(exams).where(eq(exams.id, id));
    return true;
  }

  // Attendance
  async getAttendance(): Promise<Attendance[]> {
    return db.select().from(attendance);
  }

  async getAttendanceByStudent(studentId: string): Promise<Attendance[]> {
    return db.select().from(attendance).where(eq(attendance.studentId, studentId));
  }

  async getAttendanceByClass(classId: string, date?: string): Promise<Attendance[]> {
    if (date) {
      return db.select().from(attendance).where(
        and(eq(attendance.classId, classId), eq(attendance.date, date))
      );
    }
    return db.select().from(attendance).where(eq(attendance.classId, classId));
  }

  async createAttendance(record: InsertAttendance): Promise<Attendance> {
    const [created] = await db.insert(attendance).values(record).returning();
    return created;
  }

  async updateAttendance(id: string, record: Partial<InsertAttendance>): Promise<Attendance | undefined> {
    const [updated] = await db.update(attendance).set(record).where(eq(attendance.id, id)).returning();
    return updated;
  }

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    return db.select().from(assignments).orderBy(desc(assignments.dueDate));
  }

  async getAssignment(id: string): Promise<Assignment | undefined> {
    const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
    return assignment;
  }

  async getAssignmentsByClass(classId: string): Promise<Assignment[]> {
    return db.select().from(assignments).where(eq(assignments.classId, classId));
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [created] = await db.insert(assignments).values(assignment).returning();
    return created;
  }

  async updateAssignment(id: string, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const [updated] = await db.update(assignments).set(assignment).where(eq(assignments.id, id)).returning();
    return updated;
  }

  async deleteAssignment(id: string): Promise<boolean> {
    await db.delete(assignments).where(eq(assignments.id, id));
    return true;
  }

  // Schedules
  async getSchedules(): Promise<Schedule[]> {
    return db.select().from(schedules);
  }

  async getSchedulesByClass(classId: string): Promise<Schedule[]> {
    return db.select().from(schedules).where(eq(schedules.classId, classId));
  }

  async createSchedule(schedule: InsertSchedule): Promise<Schedule> {
    const [created] = await db.insert(schedules).values(schedule).returning();
    return created;
  }

  async updateSchedule(id: string, schedule: Partial<InsertSchedule>): Promise<Schedule | undefined> {
    const [updated] = await db.update(schedules).set(schedule).where(eq(schedules.id, id)).returning();
    return updated;
  }

  async deleteSchedule(id: string): Promise<boolean> {
    await db.delete(schedules).where(eq(schedules.id, id));
    return true;
  }

  // Messages
  async getMessages(userId: string): Promise<Message[]> {
    return db.select().from(messages).where(eq(messages.recipientId, userId)).orderBy(desc(messages.createdAt));
  }

  async getSentMessages(userId: string): Promise<Message[]> {
    return db.select().from(messages).where(eq(messages.senderId, userId)).orderBy(desc(messages.createdAt));
  }

  async getMessage(id: string): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [created] = await db.insert(messages).values(message).returning();
    return created;
  }

  async markMessageAsRead(id: string): Promise<Message | undefined> {
    const [updated] = await db.update(messages).set({ isRead: true }).where(eq(messages.id, id)).returning();
    return updated;
  }

  async deleteMessage(id: string): Promise<boolean> {
    await db.delete(messages).where(eq(messages.id, id));
    return true;
  }

  // School News
  async getSchoolNews(): Promise<SchoolNews[]> {
    return db.select().from(schoolNews).orderBy(desc(schoolNews.publishedAt));
  }

  async getSchoolNewsItem(id: string): Promise<SchoolNews | undefined> {
    const [news] = await db.select().from(schoolNews).where(eq(schoolNews.id, id));
    return news;
  }

  async createSchoolNews(news: InsertSchoolNews): Promise<SchoolNews> {
    const [created] = await db.insert(schoolNews).values(news).returning();
    return created;
  }

  async updateSchoolNews(id: string, news: Partial<InsertSchoolNews>): Promise<SchoolNews | undefined> {
    const [updated] = await db.update(schoolNews).set(news).where(eq(schoolNews.id, id)).returning();
    return updated;
  }

  async deleteSchoolNews(id: string): Promise<boolean> {
    await db.delete(schoolNews).where(eq(schoolNews.id, id));
    return true;
  }

  // School Activities
  async getSchoolActivities(): Promise<SchoolActivity[]> {
    return db.select().from(schoolActivities).orderBy(desc(schoolActivities.activityDate));
  }

  async getSchoolActivity(id: string): Promise<SchoolActivity | undefined> {
    const [activity] = await db.select().from(schoolActivities).where(eq(schoolActivities.id, id));
    return activity;
  }

  async createSchoolActivity(activity: InsertSchoolActivity): Promise<SchoolActivity> {
    const [created] = await db.insert(schoolActivities).values(activity).returning();
    return created;
  }

  async updateSchoolActivity(id: string, activity: Partial<InsertSchoolActivity>): Promise<SchoolActivity | undefined> {
    const [updated] = await db.update(schoolActivities).set(activity).where(eq(schoolActivities.id, id)).returning();
    return updated;
  }

  async deleteSchoolActivity(id: string): Promise<boolean> {
    await db.delete(schoolActivities).where(eq(schoolActivities.id, id));
    return true;
  }

  // Lesson Plans
  async getLessonPlans(): Promise<LessonPlan[]> {
    return db.select().from(lessonPlans).orderBy(desc(lessonPlans.lessonDate));
  }

  async getLessonPlan(id: string): Promise<LessonPlan | undefined> {
    const [plan] = await db.select().from(lessonPlans).where(eq(lessonPlans.id, id));
    return plan;
  }

  async getLessonPlansByClass(classId: string): Promise<LessonPlan[]> {
    return db.select().from(lessonPlans).where(eq(lessonPlans.classId, classId));
  }

  async createLessonPlan(plan: InsertLessonPlan): Promise<LessonPlan> {
    const [created] = await db.insert(lessonPlans).values(plan).returning();
    return created;
  }

  async updateLessonPlan(id: string, plan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined> {
    const [updated] = await db.update(lessonPlans).set(plan).where(eq(lessonPlans.id, id)).returning();
    return updated;
  }

  async deleteLessonPlan(id: string): Promise<boolean> {
    await db.delete(lessonPlans).where(eq(lessonPlans.id, id));
    return true;
  }

  // Reports
  async getReports(): Promise<Report[]> {
    return db.select().from(reports).orderBy(desc(reports.createdAt));
  }

  async getReport(id: string): Promise<Report | undefined> {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report;
  }

  async createReport(report: InsertReport): Promise<Report> {
    const [created] = await db.insert(reports).values(report).returning();
    return created;
  }

  async deleteReport(id: string): Promise<boolean> {
    await db.delete(reports).where(eq(reports.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
