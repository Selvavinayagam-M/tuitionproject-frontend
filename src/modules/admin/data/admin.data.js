
export const ADMIN_DATA = {
    reports: {
        admissions: {
            metrics: {
                totalEnquiries: 1250,
                converted: 450,
                pending: 300,
                rejected: 500,
                conversionRate: "36%"
            },
            data: [
                { id: "ENQ001", name: "Aarav Sharma", class: "Class 10", source: "Website", status: "Converted", counsellor: "Priya M", date: "2025-01-05" },
                { id: "ENQ002", name: "Vivaan Gupta", class: "Class 12", source: "Walk-in", status: "Pending", counsellor: "Rajiv S", date: "2025-01-06" },
                { id: "ENQ003", name: "Diya Patel", class: "Class 9", source: "Call", status: "Rejected", counsellor: "Priya M", date: "2025-01-07" },
                { id: "ENQ004", name: "Ananya Singh", class: "Class 11", source: "Website", status: "Converted", counsellor: "Rajiv S", date: "2025-01-08" },
                { id: "ENQ005", name: "Rohan Verma", class: "Class 10", source: "Referral", status: "Converted", counsellor: "Priya M", date: "2025-01-09" }
            ],
            chart: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                enquiries: [150, 180, 200, 250, 220, 250],
                admissions: [50, 65, 80, 95, 85, 75]
            }
        },
        studentPerformance: {
            metrics: {
                avgScore: "82%",
                passPercentage: "98%",
                topPerformers: 45,
                improvementTrend: "+5%"
            },
            data: [
                { name: "Ishita Sharma", class: "Class 12", subject: "Physics", exam: "Mid-Term", marks: 95, grade: "A+" },
                { name: "Rahul Verma", class: "Class 10", subject: "Maths", exam: "Quarterly", marks: 88, grade: "A" },
                { name: "Sneha Patel", class: "Class 11", subject: "Chemistry", exam: "Unit Test 1", marks: 76, grade: "B+" },
                { name: "Vikram Malhotra", class: "Class 9", subject: "Science", exam: "Half-Yearly", marks: 92, grade: "A+" },
                { name: "Anjali Das", class: "Class 12", subject: "Biology", exam: "Pre-Boards", marks: 85, grade: "A" }
            ],
            chart: {
                classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
                scores: [78, 82, 75, 88]
            }
        },
        facultyPerformance: {
            data: [
                { name: "Dr. S. K. Verma", subject: "Physics", batches: 4, avgMarks: "85%", feedback: 4.8, attendance: "98%" },
                { name: "Mrs. Anjali Mehta", subject: "Maths", batches: 5, avgMarks: "88%", feedback: 4.9, attendance: "100%" },
                { name: "Mr. Rajeev Kumar", subject: "Chemistry", batches: 3, avgMarks: "79%", feedback: 4.5, attendance: "95%" },
                { name: "Ms. Sarah Jones", subject: "English", batches: 6, avgMarks: "92%", feedback: 4.7, attendance: "96%" }
            ],
            chart: {
                faculty: ["Dr. Verma", "Mrs. Mehta", "Mr. Kumar", "Ms. Jones"],
                scores: [85, 88, 79, 92]
            }
        },
        financial: {
            metrics: {
                totalBilled: "₹50,00,000",
                collected: "₹35,00,000",
                pending: "₹10,00,000",
                overdue: "₹5,00,000"
            },
            data: [
                { name: "Aditya Roy", course: "Class 12 - PCM", total: 45000, paid: 25000, due: 20000, status: "Partial" },
                { name: "Meera Iyer", course: "Class 10 - All", total: 35000, paid: 35000, due: 0, status: "Paid" },
                { name: "Kabir Khan", course: "Class 11 - PCB", total: 40000, paid: 10000, due: 30000, status: "Overdue" },
                { name: "Zara Sheikh", course: "Class 9 - Foundation", total: 30000, paid: 15000, due: 15000, status: "Partial" },
                { name: "Dev Patel", course: "Class 12 - Commerce", total: 42000, paid: 42000, due: 0, status: "Paid" }
            ],
            chart: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                revenue: [500000, 600000, 550000, 700000, 650000, 500000]
            }
        },
        attendance: {
            metrics: {
                avgAttendance: "88%",
                lowAttendanceCount: 12,
                trend: "Stable"
            },
            data: [
                { name: "Rohan Das", class: "Class 10", total: 50, attended: 45, percentage: "90%" },
                { name: "Priya Singh", class: "Class 12", total: 60, attended: 40, percentage: "66%" },
                { name: "Amit Kumar", class: "Class 9", total: 45, attended: 42, percentage: "93%" },
                { name: "Sara Ali", class: "Class 11", total: 55, attended: 50, percentage: "90%" },
                { name: "Arjun Reddy", class: "Class 10", total: 50, attended: 35, percentage: "70%" }
            ],
            chart: {
                labels: ["Present", "Absent", "Leave"],
                values: [85, 10, 5]
            }
        },
        exams: {
            metrics: {
                passRate: "92%",
                highestMarks: "99/100",
                lowestMarks: "35/100",
                difficultyIndex: "Moderate"
            },
            data: [
                { exam: "Mid-Term Physics", class: "Class 12", subject: "Physics", avg: 76, pass: "88%" },
                { exam: "Quarterly Maths", class: "Class 10", subject: "Maths", avg: 82, pass: "94%" },
                { exam: "Unit Test Bio", class: "Class 11", subject: "Biology", avg: 79, pass: "92%" },
                { exam: "Half-Yearly Eng", class: "Class 9", subject: "English", avg: 85, pass: "98%" }
            ],
            chart: {
                exams: ["Mid-Term", "Quarterly", "Unit Test", "Half-Yearly"],
                passPercentage: [88, 94, 92, 98]
            }
        }
    }
};
