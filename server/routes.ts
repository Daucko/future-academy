import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import {
  insertClassSchema,
  insertStudentSchema,
  insertExamSchema,
  insertAttendanceSchema,
  insertAssignmentSchema,
  insertScheduleSchema,
  insertMessageSchema,
  insertSchoolNewsSchema,
  insertSchoolActivitySchema,
  insertLessonPlanSchema,
  insertReportSchema,
} from "@shared/schema";

export async function registerRoutes(server: Server, app: Express): Promise<void> {
  // Classes
  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });

  app.get("/api/classes/:id", async (req, res) => {
    try {
      const cls = await storage.getClass(req.params.id);
      if (!cls) return res.status(404).json({ error: "Class not found" });
      res.json(cls);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch class" });
    }
  });

  app.post("/api/classes", async (req, res) => {
    try {
      const data = insertClassSchema.parse(req.body);
      const cls = await storage.createClass(data);
      res.status(201).json(cls);
    } catch (error) {
      res.status(400).json({ error: "Invalid class data" });
    }
  });

  app.patch("/api/classes/:id", async (req, res) => {
    try {
      const data = insertClassSchema.partial().parse(req.body);
      const cls = await storage.updateClass(req.params.id, data);
      if (!cls) return res.status(404).json({ error: "Class not found" });
      res.json(cls);
    } catch (error) {
      res.status(400).json({ error: "Invalid class data" });
    }
  });

  app.delete("/api/classes/:id", async (req, res) => {
    try {
      await storage.deleteClass(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete class" });
    }
  });

  // Students
  app.get("/api/students", async (req, res) => {
    try {
      const { classId } = req.query;
      const students = classId
        ? await storage.getStudentsByClass(classId as string)
        : await storage.getStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const data = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(data);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  app.patch("/api/students/:id", async (req, res) => {
    try {
      const data = insertStudentSchema.partial().parse(req.body);
      const student = await storage.updateStudent(req.params.id, data);
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  app.delete("/api/students/:id", async (req, res) => {
    try {
      await storage.deleteStudent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete student" });
    }
  });

  // Exams
  app.get("/api/exams", async (req, res) => {
    try {
      const { classId } = req.query;
      const exams = classId
        ? await storage.getExamsByClass(classId as string)
        : await storage.getExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exams" });
    }
  });

  app.get("/api/exams/:id", async (req, res) => {
    try {
      const exam = await storage.getExam(req.params.id);
      if (!exam) return res.status(404).json({ error: "Exam not found" });
      res.json(exam);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exam" });
    }
  });

  app.post("/api/exams", async (req, res) => {
    try {
      const data = insertExamSchema.parse(req.body);
      const exam = await storage.createExam(data);
      res.status(201).json(exam);
    } catch (error) {
      res.status(400).json({ error: "Invalid exam data" });
    }
  });

  app.patch("/api/exams/:id", async (req, res) => {
    try {
      const data = insertExamSchema.partial().parse(req.body);
      const exam = await storage.updateExam(req.params.id, data);
      if (!exam) return res.status(404).json({ error: "Exam not found" });
      res.json(exam);
    } catch (error) {
      res.status(400).json({ error: "Invalid exam data" });
    }
  });

  app.delete("/api/exams/:id", async (req, res) => {
    try {
      await storage.deleteExam(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete exam" });
    }
  });

  // Attendance
  app.get("/api/attendance", async (req, res) => {
    try {
      const { classId, date, studentId } = req.query;
      let records;
      if (studentId) {
        records = await storage.getAttendanceByStudent(studentId as string);
      } else if (classId) {
        records = await storage.getAttendanceByClass(classId as string, date as string);
      } else {
        records = await storage.getAttendance();
      }
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  });

  app.post("/api/attendance", async (req, res) => {
    try {
      const data = insertAttendanceSchema.parse(req.body);
      const record = await storage.createAttendance(data);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: "Invalid attendance data" });
    }
  });

  app.patch("/api/attendance/:id", async (req, res) => {
    try {
      const data = insertAttendanceSchema.partial().parse(req.body);
      const record = await storage.updateAttendance(req.params.id, data);
      if (!record) return res.status(404).json({ error: "Attendance record not found" });
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: "Invalid attendance data" });
    }
  });

  // Assignments
  app.get("/api/assignments", async (req, res) => {
    try {
      const { classId } = req.query;
      const assignments = classId
        ? await storage.getAssignmentsByClass(classId as string)
        : await storage.getAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  });

  app.get("/api/assignments/:id", async (req, res) => {
    try {
      const assignment = await storage.getAssignment(req.params.id);
      if (!assignment) return res.status(404).json({ error: "Assignment not found" });
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assignment" });
    }
  });

  app.post("/api/assignments", async (req, res) => {
    try {
      const data = insertAssignmentSchema.parse(req.body);
      const assignment = await storage.createAssignment(data);
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assignment data" });
    }
  });

  app.patch("/api/assignments/:id", async (req, res) => {
    try {
      const data = insertAssignmentSchema.partial().parse(req.body);
      const assignment = await storage.updateAssignment(req.params.id, data);
      if (!assignment) return res.status(404).json({ error: "Assignment not found" });
      res.json(assignment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assignment data" });
    }
  });

  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      await storage.deleteAssignment(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });

  // Schedules
  app.get("/api/schedules", async (req, res) => {
    try {
      const { classId } = req.query;
      const schedules = classId
        ? await storage.getSchedulesByClass(classId as string)
        : await storage.getSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schedules" });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const data = insertScheduleSchema.parse(req.body);
      const schedule = await storage.createSchedule(data);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ error: "Invalid schedule data" });
    }
  });

  app.patch("/api/schedules/:id", async (req, res) => {
    try {
      const data = insertScheduleSchema.partial().parse(req.body);
      const schedule = await storage.updateSchedule(req.params.id, data);
      if (!schedule) return res.status(404).json({ error: "Schedule not found" });
      res.json(schedule);
    } catch (error) {
      res.status(400).json({ error: "Invalid schedule data" });
    }
  });

  app.delete("/api/schedules/:id", async (req, res) => {
    try {
      await storage.deleteSchedule(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete schedule" });
    }
  });

  // Messages
  app.get("/api/messages", async (req, res) => {
    try {
      const { userId, sent } = req.query;
      if (!userId) return res.status(400).json({ error: "userId is required" });
      const messages = sent === "true"
        ? await storage.getSentMessages(userId as string)
        : await storage.getMessages(userId as string);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/:id", async (req, res) => {
    try {
      const message = await storage.getMessage(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.patch("/api/messages/:id/read", async (req, res) => {
    try {
      const message = await storage.markMessageAsRead(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      await storage.deleteMessage(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // School News
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getSchoolNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const news = await storage.getSchoolNewsItem(req.params.id);
      if (!news) return res.status(404).json({ error: "News not found" });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const data = insertSchoolNewsSchema.parse(req.body);
      const news = await storage.createSchoolNews(data);
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.patch("/api/news/:id", async (req, res) => {
    try {
      const data = insertSchoolNewsSchema.partial().parse(req.body);
      const news = await storage.updateSchoolNews(req.params.id, data);
      if (!news) return res.status(404).json({ error: "News not found" });
      res.json(news);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    try {
      await storage.deleteSchoolNews(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news" });
    }
  });

  // School Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getSchoolActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getSchoolActivity(req.params.id);
      if (!activity) return res.status(404).json({ error: "Activity not found" });
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const data = insertSchoolActivitySchema.parse(req.body);
      const activity = await storage.createSchoolActivity(data);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });

  app.patch("/api/activities/:id", async (req, res) => {
    try {
      const data = insertSchoolActivitySchema.partial().parse(req.body);
      const activity = await storage.updateSchoolActivity(req.params.id, data);
      if (!activity) return res.status(404).json({ error: "Activity not found" });
      res.json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });

  app.delete("/api/activities/:id", async (req, res) => {
    try {
      await storage.deleteSchoolActivity(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete activity" });
    }
  });

  // Lesson Plans
  app.get("/api/lesson-plans", async (req, res) => {
    try {
      const { classId } = req.query;
      const plans = classId
        ? await storage.getLessonPlansByClass(classId as string)
        : await storage.getLessonPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson plans" });
    }
  });

  app.get("/api/lesson-plans/:id", async (req, res) => {
    try {
      const plan = await storage.getLessonPlan(req.params.id);
      if (!plan) return res.status(404).json({ error: "Lesson plan not found" });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson plan" });
    }
  });

  app.post("/api/lesson-plans", async (req, res) => {
    try {
      const data = insertLessonPlanSchema.parse(req.body);
      const plan = await storage.createLessonPlan(data);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: "Invalid lesson plan data" });
    }
  });

  app.patch("/api/lesson-plans/:id", async (req, res) => {
    try {
      const data = insertLessonPlanSchema.partial().parse(req.body);
      const plan = await storage.updateLessonPlan(req.params.id, data);
      if (!plan) return res.status(404).json({ error: "Lesson plan not found" });
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: "Invalid lesson plan data" });
    }
  });

  app.delete("/api/lesson-plans/:id", async (req, res) => {
    try {
      await storage.deleteLessonPlan(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lesson plan" });
    }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await storage.getReport(req.params.id);
      if (!report) return res.status(404).json({ error: "Report not found" });
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch report" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const data = insertReportSchema.parse(req.body);
      const report = await storage.createReport(data);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: "Invalid report data" });
    }
  });

  app.delete("/api/reports/:id", async (req, res) => {
    try {
      await storage.deleteReport(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete report" });
    }
  });
}
