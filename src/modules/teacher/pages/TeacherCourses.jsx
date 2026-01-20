import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiBookOpen, FiClock, FiEdit2, FiUsers, FiTrash2 } from 'react-icons/fi';
import teacherService from '../../../services/teacher.service';

const TeacherCourses = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBatches();
    }, []);

    const loadBatches = async () => {
        try {
            const data = await teacherService.getBatches();
            setBatches(data || []);
        } catch (error) {
            // toast.error("Failed to load batches");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBatch = async (id) => {
        if (window.confirm("Are you sure you want to delete this batch? This cannot be undone.")) {
            try {
                await teacherService.deleteBatch(id);
                toast.success("Batch deleted successfully");
                loadBatches();
            } catch (error) {
                toast.error("Failed to delete batch");
            }
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Batches & Courses 📚</h1>
                    <p className="text-gray-500 text-sm">Manage your assigned batches and syllabus.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map(batch => (
                    <div key={batch._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <FiBookOpen className="w-6 h-6" />
                            </div>
                            <div className="relative group">
                                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                                    <FiEdit2 />
                                </button>
                                {/* Dropdown for Manage Actions */}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{batch.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{batch.course?.name || 'General Course'}</p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FiClock className="text-gray-400" />
                                <span>{batch.timings || '10:00 AM - 11:00 AM'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FiUsers className="text-gray-400" />
                                <span>{batch.students?.length || 0} Students</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
                            <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                                View Syllabus
                            </button>
                            {batch.isMock && (
                                <button
                                    onClick={() => handleDeleteBatch(batch._id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
                                    title="Delete Mock Batch"
                                >
                                    <FiTrash2 />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {loading && <div className="text-center py-12 text-gray-500">Loading your batches...</div>}

            {!loading && batches.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No batches assigned yet.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
