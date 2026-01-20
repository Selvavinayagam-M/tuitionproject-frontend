export const studentProfile = {
    id: "STU-2026-001",
    name: "Rohan Das",
    email: "rohan.das@student.tuition.com",
    grade: "Class 10",
    batch: "Batch A - Morning",
    avatar: "https://ui-avatars.com/api/?name=Rohan+Das&background=0D8ABC&color=fff",
    phone: "+91 98765 43210",
    address: "123, Green Park, New Delhi",
    joinDate: "2024-04-15"
};

export const dashboardStats = {
    classesAttended: 42,
    attendancePercentage: 92,
    pendingFees: 4500,
    nextTest: {
        subject: "Physics",
        date: "2026-01-15",
        topic: "Optics & Light"
    },
    upcomingAssignments: 2
};

export const notifications = [
    { id: 1, type: "exam", message: "Physics Mid-Term scheduled for Jan 15th.", date: "2 hrs ago" },
    { id: 2, type: "fee", message: "Tuition fees for January are due.", date: "1 day ago" },
    { id: 3, type: "general", message: "Holiday declared on Jan 26th for Republic Day.", date: "2 days ago" }
];

export const enrolledCourses = [
    {
        id: "C-001",
        subject: "Mathematics",
        tutor: "Mr. Sharma",
        schedule: "Mon, Wed, Fri - 10:00 AM",
        progress: 75,
        syllabus: [
            { topic: "Real Numbers", status: "completed" },
            { topic: "Polynomials", status: "completed" },
            { topic: "Quadratic Equations", status: "ongoing" },
            { topic: "Triangles", status: "pending" }
        ]
    },
    {
        id: "C-002",
        subject: "Physics",
        tutor: "Ms. Verma",
        schedule: "Tue, Thu - 11:30 AM",
        progress: 60,
        syllabus: [
            { topic: "Light", status: "completed" },
            { topic: "Electricity", status: "ongoing" },
            { topic: "Magnetism", status: "pending" }
        ]
    },
    {
        id: "C-003",
        subject: "Chemistry",
        tutor: "Dr. Gupta",
        schedule: "Mon, Thu - 2:00 PM",
        progress: 45,
        syllabus: [
            { topic: "Chemical Reactions", status: "completed" },
            { topic: "Acids, Bases, Salts", status: "ongoing" },
            { topic: "Metals & Non-metals", status: "pending" }
        ]
    }
];

export const assignments = [
    { id: 1, subject: "Mathematics", title: "Quadratic Eq. Exercise 4.1", dueDate: "2026-01-12", status: "pending", marks: null },
    { id: 2, subject: "Physics", title: "Optics Diagrams", dueDate: "2026-01-10", status: "submitted", marks: "A" },
    { id: 3, subject: "Chemistry", title: "Lab Report: Titration", dueDate: "2026-01-05", status: "graded", marks: "9/10" }
];

export const examSchedule = [
    { id: 1, subject: "Physics", type: "Mid-Term", date: "2026-01-15", time: "10:00 AM", totalMarks: 50 },
    { id: 2, subject: "Mathematics", type: "Unit Test", date: "2026-01-20", time: "10:00 AM", totalMarks: 25 },
    { id: 3, subject: "Chemistry", type: "Quiz", date: "2026-01-25", time: "11:00 AM", totalMarks: 10 }
];

export const performanceData = [
    { subject: "Maths", score: 85 },
    { subject: "Physics", score: 72 },
    { subject: "Chemistry", score: 88 },
    { subject: "English", score: 92 },
    { subject: "Computer", score: 95 }
];

export const feeHistory = [
    { id: 1, month: "January 2026", amount: 4500, status: "pending", dueDate: "2026-01-10" },
    { id: 2, month: "December 2025", amount: 4500, status: "paid", paidDate: "2025-12-05" },
    { id: 3, month: "November 2025", amount: 4500, status: "paid", paidDate: "2025-11-06" }
];
