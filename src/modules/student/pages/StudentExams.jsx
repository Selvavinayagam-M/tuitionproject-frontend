import React, { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiClock } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import studentService from '../../../services/student.service';

const StudentExams = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await studentService.getExams();
                setExams(data || []);
            } catch (error) {
                console.error("Failed to load exams", error);
            }
        };
        fetchExams();
    }, []);

    const generateAdmitCard = (exam) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(37, 99, 235); // Blue
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("ADMIT CARD", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text("Tuition Management System", 105, 30, { align: 'center' });

        // Student Details (Mock)
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Student Name: John Doe`, 20, 60);
        doc.text(`Roll Number: 12345`, 20, 70);
        doc.text(`Batch: Class 10 - A`, 20, 80);

        // Exam Details
        doc.setLineWidth(0.5);
        doc.line(20, 90, 190, 90);

        doc.setFontSize(14);
        doc.text(`Subject: ${exam.subject}`, 20, 105);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date(exam.date).toDateString()}`, 20, 115);
        doc.text(`Time: ${exam.time}`, 20, 125);
        doc.text(`Exam Type: ${exam.type}`, 20, 135);
        doc.text(`Total Marks: ${exam.totalMarks}`, 20, 145);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Instructions: Please bring this admit card and a valid ID proof.", 105, 280, { align: 'center' });

        doc.save(`AdmitCards_${exam.subject}.pdf`);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-gray-900">Tests & Exams 📝</h1>

            <div className="grid gap-6">
                {exams.map((exam) => (
                    <div key={exam._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                            <div className="bg-blue-50 text-blue-700 w-16 h-16 rounded-xl flex flex-col items-center justify-center border border-blue-100">
                                <span className="text-xs font-bold uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-2xl font-bold">{new Date(exam.date).getDate()}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{exam.subject}</h3>
                                <p className="text-gray-500 text-sm font-medium">{exam.type}</p>
                                <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                                    <span className="flex items-center gap-1"><FiClock /> {exam.time}</span>
                                    <span>• Notes: {exam.totalMarks} Marks</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex-1 md:flex-none">
                                Syllabus
                            </button>
                            <button
                                onClick={() => generateAdmitCard(exam)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none shadow-sm active:scale-95 transform"
                            >
                                <FiDownload /> Admit Card
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {exams.length === 0 && (
                <div className="text-center py-12 text-gray-500">No upcoming exams.</div>
            )}
        </div>
    );
};

export default StudentExams;
