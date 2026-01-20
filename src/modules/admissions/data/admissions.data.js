
export const ADMISSIONS_PAGE_DATA = {
    header: {
        title: "Admissions Open",
        subtitle: "Join the league of extraordinary achievers. Start your journey today.",
        breadcrumb: [{ label: 'Admissions', link: null }]
    },
    dates: {
        title: "Important Dates",
        description: "Mark your calendar for these key admissions events.",
        note: "Admissions are processed on a first-come, first-served basis. Seats fill up fast!",
        events: [
            { date: "Jan 15, 2026", title: "Applications Open for 2026-27", type: "upcoming" },
            { date: "Feb 10, 2026", title: "First Scholarship Test (EST)", type: "important" },
            { date: "Mar 31, 2026", title: "Early Bird Discount Ends", type: "deadline" },
            { date: "Apr 05, 2026", title: "Batch 1 Commencement", type: "start" }
        ]
    },
    process: {
        title: "Admission Process",
        subtitle: "A seamless four-step journey to academic success.",
        steps: [
            {
                id: 1,
                title: "Online Enquiry",
                desc: "Fill out the simple enquiry form on our website or visit our nearest center.",
                status: "Step 1"
            },
            {
                id: 2,
                title: "Academic Counselling",
                desc: "Attend a free counselling session with our experts to understand the best program for you.",
                status: "Step 2"
            },
            {
                id: 3,
                title: "Assessment / Scholarship Test",
                desc: "Take a short diagnostic test to evaluate current aptitude (Scholarships up to 100%).",
                status: "Step 3"
            },
            {
                id: 4,
                title: "Enrollment & Onboarding",
                desc: "Complete the documentation, pay the fees, and get your welcome kit and schedule.",
                status: "Step 4"
            }
        ]
    },
    eligibility: {
        title: "Eligibility & Requirements",
        description: "Admission is open to all students from Class 1 to 12 (CBSE, ICSE, and State Boards). We recommend enrolling early to secure your preferred batch timings.",
        documentsTitle: "Documents Required",
        documents: [
            "2 Recent Passport Size Photographs",
            "Copy of Last Year's Marksheet (for Class 6-12)",
            "Aadhar Card / Identity Proof of Student",
            "Identity Proof of Parent / Guardian",
            "Transfer Certificate (if applicable)"
        ],
        scholarship: {
            title: "Scholarship Opportunities",
            description: "We believe that merit should be rewarded. Appear for our Excellence Scholarship Test (EST) and avail up to 100% waiver on tuition fees.",
            examDate: "Every Sunday",
            eligibility: "Class 5 to 12 Students"
        }
    }
};
