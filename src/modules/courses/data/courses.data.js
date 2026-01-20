export const COURSES_DATA = [
    {
        id: 1,
        title: "Class 10 CBSE Excellence Batch",
        classCategory: "Class 9-10",
        board: "CBSE",
        mode: "Offline Class",
        batchType: "Weekday Evening",
        subjects: ["Maths", "Science", "SST", "English"],
        description: "Intensive preparation for Class 10 Board exams with a focus on NCERT mastery, weekly tests, and answer writing skills.",
        fee: { monthly: 4500 },
        feeDetails: { tuition: 4500, material: 2000, admission: 1000 },
        discount: 10,
        enrollmentType: 'direct',
        tag: "Bestseller",
        syllabus: [
            "Real Numbers & Polynomials",
            "Trigonometry & Applications",
            "Chemical Reactions & Equations",
            "Life Processes & Control"
        ],
        features: ["Printed Notes", "Doubt Sessions", "Parent App Access"]
    },
    {
        id: 2,
        title: "Class 12 JEE Mains + Advanced",
        classCategory: "Class 11-12",
        board: "CBSE",
        mode: "Offline Class",
        batchType: "Weekend Intensive",
        subjects: ["Physics", "Chemistry", "Maths"],
        description: "Two-year integrated program for JEE aspirants. Covers CBSE Boards syllabus along with competitive exam modules.",
        fee: { monthly: 8500 },
        feeDetails: { tuition: 8500, material: 5000, admission: 2000 },
        enrollmentType: 'counselling',
        tag: "JEE Special",
        syllabus: [
            "Mechanics & Kinematics",
            "Organic Chemistry Basics",
            "Calculus & Functions",
            "Electrostatics"
        ],
        features: ["Daily Practice Papers", "All India Test Series", "Rank Improvement Batch"]
    },
    {
        id: 3,
        title: "Class 6-8 Foundation Builder",
        classCategory: "Class 6-8",
        board: "ICSE",
        mode: "Hybrid",
        batchType: "Weekday Afternoon",
        subjects: ["Maths", "Science", "English", "Computers"],
        description: "Building strong fundamentals in Science and Math. Hybrid mode offers flexibility of attending from home or center.",
        fee: { monthly: 3500 },
        feeDetails: { tuition: 3500, material: 1500, admission: 500 },
        enrollmentType: 'direct',
        syllabus: [
            "Integers & Fractions",
            "Basic Algebra",
            "Force & Pressure",
            "Plant Life"
        ],
        features: ["Activity Based Learning", "Olympiad Prep", "Spoken English"]
    },
    {
        id: 4,
        title: "NEET Medical Target Batch",
        classCategory: "Class 11-12",
        board: "State Board",
        mode: "Offline Class",
        batchType: "Weekday Morning",
        subjects: ["Physics", "Chemistry", "Biology"],
        description: "Focused NEET preparation with expert biology faculty. Includes heavy emphasis on NCERT diagrams and previous year questions.",
        fee: { monthly: 7500 },
        feeDetails: { tuition: 7500, material: 4500, admission: 2000 },
        enrollmentType: 'counselling',
        tag: "Medical Focus",
        syllabus: [
            "Human Physiology",
            "Genetics & Evolution",
            "Thermodynamics",
            "Plant Kingdom"
        ],
        features: ["Biology Memorization Techniques", "NCERT Line-by-Line", "Mock Tests"]
    },
    {
        id: 5,
        title: "Class 1-5 Junior Whiz Kids",
        classCategory: "Class 1-5",
        board: "CBSE",
        mode: "Offline Class",
        batchType: "Weekend Fun",
        subjects: ["Maths", "EVS", "English", "Arts"],
        description: "Fun-filled learning environment for young minds. Focus on curiosity, confidence building, and basic numeracy/literacy.",
        fee: { monthly: 2500 },
        feeDetails: { tuition: 2500, material: 1000, admission: 500 },
        enrollmentType: 'direct',
        syllabus: [
            "Numbers & Counting",
            "My Surroundings",
            "Phonics & Reading",
            "Creative Art"
        ],
        features: ["No Homework Policy", "Learning Kits", "Story Telling"]
    },
    {
        id: 6,
        title: "Online Math Olympiad Prep",
        classCategory: "Class 6-8",
        board: "ICSE",
        mode: "Online Live",
        batchType: "Evening Online",
        subjects: ["Mathematics", "Logical Reasoning"],
        description: "Specialized online batch for students targeting Olympiads like IMO, NSTSE. Live interactive classes with top trainers.",
        fee: { monthly: 3000 },
        feeDetails: { tuition: 3000, material: 0, admission: 0 },
        enrollmentType: 'direct',
        tag: "Online Exclusive",
        syllabus: [
            "Number Theory",
            "Geometry & Mensuration",
            "Combinatorics",
            "Logical Puzzles"
        ],
        features: ["Recorded Sessions", "Online Quizzes", "Leaderboard"]
    }
];

export const COURSES_PAGE_DATA = {
    header: {
        title: "Our Courses",
        subtitle: "Expert-led programs designed for academic excellence.",
        breadcrumb: [{ label: 'Classes', link: null }]
    }
};
