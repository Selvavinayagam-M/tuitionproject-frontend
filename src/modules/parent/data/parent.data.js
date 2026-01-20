export const parentProfile = {
    id: "PRT-2026-001",
    name: "Mr. Amit Das",
    email: "amit.das@parent.tuition.com",
    phone: "+91 98765 00001",
    address: "123, Green Park, New Delhi",
    children: ["STU-2026-001", "STU-2026-002"]
};

export const childrenData = [
    {
        id: "STU-2026-001",
        name: "Rohan Das",
        grade: "Class 10",
        batch: "Batch A - Morning",
        avatar: "https://ui-avatars.com/api/?name=Rohan+Das&background=0D8ABC&color=fff",
        attendance: 92,
        pendingFees: 4500,
        nextExam: { subject: "Physics", date: "Jan 15", type: "Mid-Term" },
        recentGrade: { subject: "Maths", score: "85%", date: "Jan 05" }
    },
    {
        id: "STU-2026-002",
        name: "Priya Das",
        grade: "Class 8",
        batch: "Batch B - Evening",
        avatar: "https://ui-avatars.com/api/?name=Priya+Das&background=E91E63&color=fff",
        attendance: 88,
        pendingFees: 0,
        nextExam: { subject: "Science", date: "Jan 20", type: "Unit Test" },
        recentGrade: { subject: "English", score: "92%", date: "Jan 08" }
    }
];

export const notifications = [
    { id: 1, type: "fee", message: "Tuition fees for Jan 2026 are due for Rohan.", date: "1 day ago", childBy: "Rohan Das" },
    { id: 2, type: "exam", message: "Physics Mid-Term for Rohan is on Jan 15th.", date: "2 days ago", childBy: "Rohan Das" },
    { id: 3, type: "general", message: "Parent-Teacher meeting scheduled for Jan 28th.", date: "3 days ago", childBy: "All" }
];

export const feeDetails = [
    { id: 1, child: "Rohan Das", month: "January 2026", amount: 4500, status: "pending", dueDate: "Jan 10, 2026" },
    { id: 2, child: "Priya Das", month: "January 2026", amount: 3500, status: "paid", paidDate: "Jan 02, 2026" },
    { id: 3, child: "Rohan Das", month: "December 2025", amount: 4500, status: "paid", paidDate: "Dec 05, 2025" }
];

export const performanceSummary = {
    "STU-2026-001": [ // Rohan
        { subject: "Maths", score: 85, fullMark: 100 },
        { subject: "Physics", score: 72, fullMark: 100 },
        { subject: "Chem", score: 88, fullMark: 100 },
        { subject: "Eng", score: 78, fullMark: 100 }
    ],
    "STU-2026-002": [ // Priya
        { subject: "Maths", score: 90, fullMark: 100 },
        { subject: "Science", score: 85, fullMark: 100 },
        { subject: "Soc. Sci", score: 92, fullMark: 100 },
        { subject: "Eng", score: 95, fullMark: 100 }
    ]
};

export const attendanceData = {
    "STU-2026-001": [ // Rohan (Last 5 days)
        { date: "Jan 09", status: "present" },
        { date: "Jan 08", status: "present" },
        { date: "Jan 07", status: "absent" },
        { date: "Jan 06", status: "present" },
        { date: "Jan 05", status: "present" },
    ],
    "STU-2026-002": [ // Priya
        { date: "Jan 09", status: "present" },
        { date: "Jan 08", status: "present" },
        { date: "Jan 07", status: "present" },
        { date: "Jan 06", status: "present" },
        { date: "Jan 05", status: "present" },
    ]
};
