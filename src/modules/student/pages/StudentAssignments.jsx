import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiFileText, FiUploadCloud, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import studentService from '../../../services/student.service';
import { uploadFile } from '../../../services/upload.service';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, submitted, graded
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            const data = await studentService.getAssignments();
            setAssignments(data || []);
        } catch (error) {
            console.error("Failed to load assignments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = (assignmentId) => {
        document.getElementById(`file-upload-${assignmentId}`).click();
    };

    const handleFileChange = async (event, assignmentId) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // Note: This requires valid Supabase Storage keys and bucket 'assignments'
            const url = await uploadFile(file);

            // Call backend to submit (Mocking backend call here as endpoint might not be ready)
            // await studentService.submitAssignment(assignmentId, url);

            toast.success("Assignment uploaded successfully!");

            // Update local state to show as submitted
            setAssignments(prev => prev.map(a =>
                a._id === assignmentId ? { ...a, status: 'submitted' } : a
            ));
        } catch (error) {
            console.error(error);
            toast.error("Upload failed. Check Supabase config.");
        } finally {
            setUploading(false);
        }
    };

    const filteredAssignments = assignments.filter(a => {
        if (filter === 'all') return true;
        return a.status === filter;
    });

    const displayAssignments = filteredAssignments;


    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-gray-900">Assignments & Homework 📚</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                <div className="p-6 border-b border-gray-100 flex gap-4 overflow-x-auto scrollbar-hide">
                    {['all', 'pending', 'submitted', 'graded'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap capitalize transition-colors ${filter === tab
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab} {tab === 'all' ? 'Assignments' : ''}
                        </button>
                    ))}
                </div>

                <div className="p-4 space-y-4">
                    {displayAssignments.map((assignment) => (
                        <div key={assignment._id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                            {/* Header: Icon, Title, Status */}
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex items-start gap-3">
                                    <div className={`p-3 rounded-xl shrink-0 ${assignment.status === 'pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                                        assignment.status === 'submitted' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        <FiFileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{assignment.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{assignment.subject}</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize whitespace-nowrap ${assignment.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    }`}>
                                    {assignment.status}
                                </span>
                            </div>

                            {/* Details: Date, Grade */}
                            <div className="flex items-center gap-4 text-sm border-t border-gray-100 dark:border-gray-700 pt-3">
                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                    <FiClock className="text-gray-400" />
                                    <span>Due: <span className="font-semibold">{new Date(assignment.dueDate).toLocaleDateString()}</span></span>
                                </div>
                                {assignment.marks && (
                                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold">
                                        <FiCheckCircle />
                                        <span>Grade: {assignment.marks}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="pt-1">
                                {assignment.status === 'pending' ? (
                                    <>
                                        <input
                                            type="file"
                                            id={`file-upload-${assignment._id}`}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, assignment._id)}
                                        />
                                        <button
                                            onClick={() => handleUploadClick(assignment._id)}
                                            disabled={uploading}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 active:scale-[0.98]"
                                        >
                                            <FiUploadCloud size={20} /> {uploading ? 'Uploading...' : 'Upload Assignment'}
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        View Submission
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {displayAssignments.length === 0 && (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                            <FiFileText className="text-2xl text-gray-300" />
                        </div>
                        <p>No {filter !== 'all' ? filter : ''} assignments found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAssignments;
