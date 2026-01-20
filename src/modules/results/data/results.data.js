
import student1 from '../../../assets/images/results/students/student1.png';
import student2 from '../../../assets/images/results/students/student2.png';
import student3 from '../../../assets/images/results/students/student3.png';
import student4 from '../../../assets/images/results/students/student4.png';
import student5 from '../../../assets/images/results/students/student5.png';
import student6 from '../../../assets/images/results/students/student6.png';
import student7 from '../../../assets/images/results/students/student7.png';
import student8 from '../../../assets/images/results/students/student8.png';

export const RESULTS_PAGE_DATA = {
    header: {
        title: "Hall of Fame",
        subtitle: "Honoring the hard work and dedication of our brilliant students.",
        breadcrumb: [{ label: 'Results', link: null }]
    },
    analytics: {
        title: "Celebrating Excellence",
        description: "At Excellence Tuition Centre, we measure our success by the achievements of our students. Year after year, our students have secured top ranks in Board Examinations (CBSE/ICSE) and cleared competitive entrance tests like JEE and NEET with flying colors.",
        metrics: [
            { label: "Average Score", value: "98.5%", color: "orange" },
            { label: "Students Above 95%", value: "150+", color: "blue" },
            { label: "Pass Percentage", value: "100%", color: "green" }
        ]
    },
    filters: {
        years: ['2025', '2024', '2023'],
        classes: ['Class 10', 'Class 12']
    },
    results: [
        { name: "Aarav Gupta", class: "Class 10", marks: "98.5%", rank: "DISTRICT TOPPER", img: student1 },
        { name: "Ishita Sharma", class: "Class 12", marks: "97.2%", rank: "SCHOOL TOPPER", img: student2 },
        { name: "Rahul Verma", class: "Class 10", marks: "96.8%", rank: "MATHS ACE", img: student3 },
        { name: "Sneha Patel", class: "Class 12", marks: "96.5%", rank: "SCIENCE WHIZ", img: student4 },
        { name: "Rohan Das", class: "Class 10", marks: "96.0%", rank: "", img: student5 },
        { name: "Priya Singh", class: "Class 12", marks: "95.8%", rank: "", img: student6 },
        { name: "Vikram Malhotra", class: "Class 10", marks: "95.5%", rank: "", img: student7 },
        { name: "Ananya Roy", class: "Class 12", marks: "95.2%", rank: "", img: student8 },
    ]
};
