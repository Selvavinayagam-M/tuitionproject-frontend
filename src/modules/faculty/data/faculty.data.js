
import mentor1 from '../../../assets/images/faculty/mentors/mentor1.png';
import mentor2 from '../../../assets/images/faculty/mentors/mentor2.png';
import mentor3 from '../../../assets/images/faculty/mentors/mentor3.png';
import mentor4 from '../../../assets/images/faculty/mentors/mentor4.png';

export const FACULTY_PAGE_DATA = {
    header: {
        title: "Our Mentors",
        subtitle: "Learn from the best minds in the industry.",
        breadcrumb: [{ label: 'Faculty', link: null }]
    },
    intro: {
        text: "Our faculty members are not just teachers; they are mentors who guide you through every step of your academic journey. With an average experience of 15+ years, they bring unparalleled expertise to the classroom."
    },
    facultyList: [
        {
            id: 1,
            name: "Dr. S. K. Verma",
            role: "HOD - Physics",
            exp: "20+ Years",
            quals: "Ph.D. in Physics (IIT Delhi)",
            bio: "Dr. Verma is a renowned physicist with over two decades of teaching experience. He specializes in simplifying complex mechanics and electromagnetism concepts.",
            philosophy: "I believe that Physics is not about formulas, but about understanding the laws of nature.",
            img: mentor1
        },
        {
            id: 2,
            name: "Mrs. Anjali Mehta",
            role: "Senior Math Faculty",
            exp: "15+ Years",
            quals: "M.Sc. Mathematics (Gold Medalist)",
            bio: "Mrs. Mehta has a unique ability to make Calculus and Algebra fun. She has mentored over 2000 students for JEE Mains & Advanced.",
            philosophy: "Math is a language. Once you learn the grammar (concepts), you can write poetry (solve complex problems).",
            img: mentor2
        },
        {
            id: 3,
            name: "Mr. Rajeev Kumar",
            role: "HOD - Chemistry",
            exp: "18+ Years",
            quals: "M.Tech Chemical Engineering",
            bio: "Known for his 'Organic Chemistry Shortcuts', Mr. Kumar helps students memorize reactions through logic rather than rote learning.",
            philosophy: "Chemistry is the bridge between Physics and Biology. Understanding it requires visualization.",
            img: mentor3
        },
        {
            id: 4,
            name: "Ms. Sarah Jones",
            role: "English & Verbal Ability",
            exp: "10+ Years",
            quals: "MA English Literature",
            bio: "Ms. Jones brings literature to life. She focuses on communication skills and critical analysis for Board exams and competitive verbal sections.",
            philosophy: "Language shapes thought. Clarity in expression leads to clarity in thinking.",
            img: mentor4
        },
    ]
};
