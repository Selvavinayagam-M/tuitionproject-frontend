export const teacherProfile = {
    id: "TCH-2026-001",
    name: "Mr. Sharma",
    subject: "Mathematics",
    email: "sharma.math@tuition.com",
    phone: "+91 98765 43210",
    joinDate: "2024-01-15",
    qualification: "M.Sc. Mathematics, B.Ed"
};

export const teacherStats = {
    totalStudents: 120,
    classesToday: 4,
    pendingEvaluations: 15,
    upcomingTests: 2
};

export const classSchedule = [
    { id: 1, time: "10:00 AM", class: "Class 10 - Batch A", subject: "Maths - Quadratic Eq.", status: "Upcoming" },
    { id: 2, time: "12:00 PM", class: "Class 12 - Batch B", subject: "Maths - Calculus", status: "Upcoming" },
    { id: 3, time: "02:00 PM", class: "Class 9 - Batch A", subject: "Maths - Geometry", status: "Completed" },
    { id: 4, time: "04:00 PM", class: "Class 11 - Batch C", subject: "Maths - Trigonometry", status: "Upcoming" }
];

export const studentsList = [
    { id: "STU-001", name: "Rohan Das", class: "Class 10", batch: "Batch A", attendance: 92, performance: 85 },
    { id: "STU-002", name: "Priya Singh", class: "Class 10", batch: "Batch A", attendance: 88, performance: 90 },
    { id: "STU-003", name: "Amit Kumar", class: "Class 10", batch: "Batch A", attendance: 75, performance: 65 },
    { id: "STU-004", name: "Sneha Gupta", class: "Class 10", batch: "Batch A", attendance: 95, performance: 92 },
    { id: "STU-005", name: "Rahul Verma", class: "Class 10", batch: "Batch A", attendance: 82, performance: 78 }
];

export const assignments = [
    { id: 1, title: "Quadratic Equations - Ex 4.1", class: "Class 10 - Batch A", dueDate: "Jan 12, 2026", submitted: 25, total: 30, status: "Active" },
    { id: 2, title: "Trigonometry - Formulas", class: "Class 11 - Batch C", dueDate: "Jan 15, 2026", submitted: 10, total: 28, status: "Active" },
    { id: 3, title: "Calculus - Limits", class: "Class 12 - Batch B", dueDate: "Jan 10, 2026", submitted: 28, total: 28, status: "Grading Pending" }
];

export const exams = [
    { id: 1, title: "Maths Mid-Term", class: "Class 10", date: "Jan 20, 2026", marks: 100, status: "Scheduled" },
    { id: 2, title: "Unit Test - Algebra", class: "Class 9", date: "Jan 25, 2026", marks: 50, status: "Draft" }
];

export const announcements = [
    { id: 1, title: "Class Rescheduled", message: "Class 10 Batch A maths class is moved to 11 AM tomorrow.", date: "Jan 09", audience: "Class 10 - Batch A" },
    { id: 2, title: "Exam Syllabus", message: "Syllabus for Mid-Term exam has been uploaded.", date: "Jan 08", audience: "All Students" }
];
