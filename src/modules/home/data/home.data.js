
import heroImage from '../../../assets/images/Home/hero/hero-image.avif';
import performer1 from '../../../assets/images/Home/perfomers/perfomer1.png';
import performer2 from '../../../assets/images/Home/perfomers/perfomer2.png';
import performer3 from '../../../assets/images/Home/perfomers/perfomer3.png';
import performer4 from '../../../assets/images/Home/perfomers/perfomer4.png';
import mentor1 from '../../../assets/images/Home/mentors/profile1.png';
import mentor2 from '../../../assets/images/Home/mentors/profile2.png';
import mentor3 from '../../../assets/images/Home/mentors/profile3.png';
import update1 from '../../../assets/images/Home/updates/updates1.png';
import update2 from '../../../assets/images/Home/updates/updates2.png';
import update3 from '../../../assets/images/Home/updates/updates3.png';

// Import new assets
import primaryImg from '../../../assets/images/Home/cards/primary.avif';
import middleImg from '../../../assets/images/Home/cards/middle.avif';
import secondaryImg from '../../../assets/images/Home/cards/secondary.avif';
import seniorImg from '../../../assets/images/Home/cards/senior.avif';
import meetMentorImg from '../../../assets/images/Home/cards/meetourmentor.avif';

export const HOME_DATA = {
    hero: {
        badge: "Admissions Open 2026-27",
        subBadge: "CBSE / ICSE / State",
        titlePrefix: "Building Future Leaders",
        titleSuffix: "One Concept at a Time",
        description: "Premium tuition for Classes 1 to 12. Expert faculty, personalized attention, and a proven track record of academic excellence. Join 5000+ successful students today.",
        ctaPrimary: "Book Free Demo",
        ctaSecondary: "Admission Enquiry",
        note: "* Limited seats available for 2026 batches.",
        image: heroImage,
        stats: [
            { value: "15+", label: "Years of Excellence", desc: "Building futures since 2010", icon: "calendar" },
            { value: "5000+", label: "Students Trained", desc: "Across multiple branches", icon: "graduate" },
            { value: "100%", label: "Success Rate", desc: "In Board Examinations", icon: "trophy" },
            { value: "50+", label: "Expert Faculty", desc: "Qualified & Experienced", icon: "teacher" }
        ]
    },
    programs: {
        title: "Academic Programs",
        subtitle: "Tailored learning paths for every stage of your child's journey.",
        tabs: [
            {
                id: 'primary',
                label: 'Primary (1-5)',
                title: "Foundation Years (Class 1-5)",
                desc: "Building a strong base in numeracy, literacy, and logical thinking through activity-based learning.",
                subjects: ["Mathematics", "English & Grammar", "Environmental Science", "Basic Coding"],
                approach: ["Play-way Method", "No-Homework Policy", "Creative Arts"],
                color: "orange",
                icon: "book",
                image: primaryImg
            },
            {
                id: 'middle',
                label: 'Middle (6-8)',
                title: "Concept Building (Class 6-8)",
                desc: "Bridging the gap between basic concepts and advanced application. Pre-foundation for competitive exams.",
                subjects: ["Advanced Math", "Physics & Chemistry", "Computer Science", "Social Studies"],
                approach: ["Concept Mapping", "Olympiad Prep", "Lab Activities"],
                color: "green",
                icon: "laptop",
                image: middleImg
            },
            {
                id: 'secondary',
                label: 'Secondary (9-10)',
                title: "Board Excellence (Class 9-10)",
                desc: "Rigorous preparation for Class 10 Boards (CBSE/ICSE) with a focus on high-scoring strategies.",
                subjects: ["Math & Science (NCERT+)", "Social Sciences", "English Literature", "HOTS Questions"],
                approach: ["Weekly Tests", "Board Pattern Answer Writing", "Mental Ability"],
                color: "blue",
                icon: "microscope",
                image: secondaryImg
            },
            {
                id: 'senior',
                label: 'Senior (11-12)',
                title: "Career Definition (Class 11-12)",
                desc: "Specialized coaching for Science & Commerce streams integrated with JEE/NEET/CUET preparation.",
                subjects: ["Physics, Chemistry, Math/Bio", "Accountancy, BST, Economics", "Entrance Exam Modules"],
                approach: ["Daily Practice Papers (DPP)", "Mock Tests", "Personalized Counseling"],
                color: "purple",
                icon: "astronaut",
                image: seniorImg
            }
        ],
        ctaText: "Explore [Label] Program",
        trialText: "Book a Free Trial Class",
        methodologyTitle: "Our Teaching Methodology",
        methodologyDesc: "Designed to ensure maximum retention and understanding."
    },
    facilities: {
        title: "World-Class Infrastructure",
        subtitle: "Empowering students with the best tools for success.",
        items: [
            { icon: "chalkboard", title: "Smart Classrooms", desc: "Interactive digital boards for immersive learning." },
            { icon: "video", title: "Recorded Lectures", desc: "Access missed classes anytime via our app." },
            { icon: "bookreader", title: "Digital Library", desc: "24/7 access to study materials and notes." },
            { icon: "shield", title: "Parent App", desc: "Real-time tracking of attendance and marks." },
            { icon: "wifi", title: "Hybrid Learning", desc: "Seamless switch between Online & Offline." },
            { icon: "headset", title: "Doubt Support", desc: "Dedicated sessions for personalized attention." }
        ],
        images: [
            heroImage,
            meetMentorImg
        ]
    },
    whyChooseUs: {
        title: "A better way to learn",
        subtitle: "Why Choose Excellence Tuition?",
        description: "We don't just teach tailored subjects; we build academic discipline and confidence.",
        features: [
            {
                icon: "users",
                title: "Small Batch Sizes",
                desc: "We limit our batches to 20 students to ensure every child gets personalized attention and doubt-clearing opportunities."
            },
            {
                icon: "teacher",
                title: "Expert Faculty",
                desc: "Learn from teachers with 10+ years of experience and a track record of producing city toppers."
            },
            {
                icon: "chart",
                title: "Performance Analytics",
                desc: "Weekly tests with detailed performance reports sent to parents via our mobile app."
            },
            {
                icon: "clock",
                title: "Individual Attention",
                desc: "One-on-one mentoring sessions for weak students to strengthen their concepts."
            }
        ]
    },
    learningModel: {
        title: "Flexible Learning Models",
        subtitle: "Choose the mode that fits your schedule and learning style.",
        models: [
            {
                id: "offline",
                title: "Offline Classes",
                desc: "Traditional classroom learning at our centers with direct teacher interaction.",
                features: ["Face-to-face doubts", "Peer learning", "Disciplined routine"],
                icon: "chalkboard"
            },
            {
                id: "online",
                title: "Live Online",
                desc: "Interactive live classes from the comfort of your home using our smart app.",
                features: ["Save travel time", "Recorded backups", "Safe environment"],
                icon: "laptop"
            },
            {
                id: "hybrid",
                title: "Hybrid Model",
                desc: "Best of both worlds. Attend offline classes and access online resources.",
                features: ["Flexible attendance", "Digital testing", "Full library access"],
                icon: "sync",
                badge: "POPULAR"
            }
        ]
    },
    results: {
        title: "Our Star Performers",
        subtitle: "Consistently delivering top ranks in Board Exams.",
        students: [
            { name: "Aarav Gupta", class: "Class 10", score: "98.5%", img: performer1 },
            { name: "Ishita Sharma", class: "Class 12 (Sci)", score: "97.2%", img: performer2 },
            { name: "Rahul Verma", class: "Class 10", score: "96.8%", img: performer3 },
            { name: "Sneha Patel", class: "Class 12 (Comm)", score: "96.5%", img: performer4 }
        ]
    },
    faculty: {
        title: "Meet Our Mentors",
        subtitle: "Learning from the best minds in the industry.",
        groupImage: meetMentorImg,
        members: [
            { name: "Dr. S. K. Verma", role: "Physics HOD", exp: "20+ Yrs", img: mentor1 },
            { name: "Mrs. Anjali Mehta", role: "Maths Expert", exp: "15+ Yrs", img: mentor2 },
            { name: "Mr. Rajeev Kumar", role: "Chemistry Lead", exp: "12+ Yrs", img: mentor3 }
        ]
    },
    testimonials: {
        title: "What Parents Say",
        subtitle: "Building trust through transparent feedback.",
        items: [
            { name: "Priya Sharma", role: "Parent, Class 10", text: "The personalized attention my daughter received helped her score 98% in Boards. Highly recommended!" },
            { name: "Rohan Das", role: "Student, Class 12", text: "The study material and mock tests were exactly on point for JEE Mains. Tracking my progress was easy." },
            { name: "Mrs. Iyer", role: "Parent, Class 6", text: "I love the hybrid model. My son can attend online when we are traveling, so he never misses a class." }
        ]
    },
    cta: {
        title: "Book Your Free Demo Class Today!",
        subtitle: "Experience our unique teaching methodology before you decide. Limited seats available for the upcoming batch.",
        features: ["Live Interactive Sessions", "Comprehensive Study Material", "Personalized Doubt Solving"],
        formTitle: "Get a Call Back",
        formDisclaimer: "We respect your privacy. No spam."
    },
    blog: {
        title: "Latest Updates",
        subtitle: "Stay informed with expert advice and news.",
        posts: [
            { title: "5 Tips to Ace CBSE Boards", date: "Jan 05, 2026", category: "Exam Tips", img: update1 },
            { title: "Why Conceptual Learning Matters", date: "Dec 12, 2025", category: "Pedagogy", img: update2 },
            { title: "Managing Stress During Exams", date: "Nov 20, 2025", category: "Mental Health", img: update3 }
        ]
    }
};
