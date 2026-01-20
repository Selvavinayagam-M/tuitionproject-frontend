import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiBook, FiCalendar, FiClock } from 'react-icons/fi';
import teacherService from '../../../services/teacher.service';

const TeacherAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        batch: '',
        subject: ''
    });

    // Helper Data
    const [batches, setBatches] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [assignmentsData, batchesData, subjectsData] = await Promise.all([
                teacherService.getAssignments(),
                teacherService.getBatches(),
                teacherService.getSubjects()
            ]);
            setAssignments(assignmentsData);
            setBatches(batchesData);
            setSubjects(subjectsData);
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await teacherService.createAssignment(formData);
            toast.success("Assignment created successfully!");
            setShowForm(false);
            setFormData({ title: '', description: '', dueDate: '', batch: '', subject: '' });
            loadInitialData(); // Refresh list
        } catch (error) {
            toast.error("Failed to create assignment");
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="space-y-6 animate-fadeIn pb-20 md:pb-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments 📚</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage homework and projects for your batches.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <FiPlus /> {showForm ? 'Cancel Creation' : 'Create Assignment'}
                </button>
            </div>

            {/* Creation Form */}
            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-slideDown">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 text-lg border-b border-gray-100 dark:border-gray-700 pb-2">Create New Assignment</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
                            <input
                                required name="title" value={formData.title} onChange={handleChange}
                                className="w-full p-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                placeholder="e.g. Chapter 1 Exercises"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                            <textarea
                                required name="description" value={formData.description} onChange={handleChange} rows="3"
                                className="w-full p-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-none"
                                placeholder="Instructions for students..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Batch</label>
                            <select
                                required name="batch" value={formData.batch} onChange={handleChange}
                                className="w-full p-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            >
                                <option value="">Select Target Batch</option>
                                {batches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                            <select
                                required name="subject" value={formData.subject} onChange={handleChange}
                                className="w-full p-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s._id} value={s._id}>{s.name} ({s.course.name})</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Due Date & Time</label>
                            <input
                                required type="datetime-local" name="dueDate" value={formData.dueDate} onChange={handleChange}
                                className="w-full p-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end pt-2">
                            <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20 active:scale-95">Publish Assignment</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {assignments.length > 0 ? assignments.map(a => (
                    <div key={a._id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition flex flex-col h-full group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">{a.subject?.name}</span>
                            <span className="text-gray-400 dark:text-gray-500 text-xs flex items-center gap-1 font-medium bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-lg">
                                <FiClock /> {new Date(a.dueDate).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{a.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{a.description}</p>

                        <div className="pt-4 mt-auto border-t border-gray-50 dark:border-gray-700/50 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase font-bold">Batch</span>
                                <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">{a.batch?.name}</span>
                            </div>
                            <button className="text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                                View Submissions
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-full mb-4">
                            <FiBook className="text-4xl opacity-50" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Assignments Yet</h3>
                        <p className="max-w-xs mx-auto text-sm">Create your first assignment to get started with tracking student progress.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherAssignments;
