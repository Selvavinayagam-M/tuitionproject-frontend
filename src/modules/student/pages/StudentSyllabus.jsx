import React, { useState, useEffect } from 'react';
import { FiDownload, FiBookOpen, FiFileText } from 'react-icons/fi';
import { jsPDF } from 'jspdf';

const StudentSyllabus = () => {
    // Mock Syllabus Data
    const syllabusList = [
        { id: 1, subject: 'Mathematics', code: 'MATH101', chapters: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'] },
        { id: 2, subject: 'Science', code: 'SCI101', chapters: ['Physics - Motion', 'Chemistry - Acids', 'Biology - Cells'] },
        { id: 3, subject: 'English', code: 'ENG101', chapters: ['Grammar', 'Comprehension', 'Literature'] }
    ];

    const generateSyllabusPDF = (subject) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text(`Syllabus: ${subject.subject}`, 105, 20, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Course Code: ${subject.code}`, 105, 30, { align: 'center' });

        doc.setFontSize(14);
        doc.text("Chapters:", 20, 50);

        subject.chapters.forEach((chapter, index) => {
            doc.text(`${index + 1}. ${chapter}`, 20, 60 + (index * 10));
        });

        doc.save(`${subject.subject}_Syllabus.pdf`);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-gray-900">Course Syllabus 📖</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {syllabusList.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <FiBookOpen className="w-6 h-6" />
                            </div>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold">{item.code}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.subject}</h3>

                        <div className="space-y-2 mb-6">
                            {item.chapters.map((chap, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    {chap}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    alert(`Study Tips for ${item.subject}:\n1. Practice regularly.\n2. Review past papers.\n3. Create summary notes.`);
                                }}
                                className="col-span-1 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm font-bold transition-colors"
                            >
                                Tips 💡
                            </button>
                            <button
                                onClick={() => generateSyllabusPDF(item)}
                                className="col-span-1 py-2 flex justify-center items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-200"
                            >
                                <FiDownload /> PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentSyllabus;
