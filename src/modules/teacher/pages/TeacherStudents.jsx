import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSearch, FiUserPlus, FiLayers, FiDownload, FiGrid, FiList, FiMoreVertical, FiUsers, FiAward } from 'react-icons/fi';
import teacherService from '../../../services/teacher.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

// Design System Imports
import PageHeader from '../../../shared/components/ui/PageHeader';
import StatsCard from '../../../shared/components/ui/StatsCard';
import Card from '../../../shared/components/ui/Card';
import TiltCard from '../../../shared/components/ui/TiltCard';
import GlassCard from '../../../shared/components/ui/GlassCard';
import Button from '../../../shared/components/ui/Button';
import Badge from '../../../shared/components/ui/Badge';

// Animations
import { staggerContainer, fadeSlideUp, fadeIn } from '../../../shared/animations/motionVariants';

const TeacherStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showAddModal, setShowAddModal] = useState(false);
    const [showMockBatchModal, setShowMockBatchModal] = useState(false);

    // Mock Batch Form State
    const [mockBatch, setMockBatch] = useState({ name: '', schedule: '10:00 AM - 12:00 PM', courseId: 'mock-course-id' });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        setLoading(true);
        try {
            const data = await teacherService.getStudents();
            setStudents(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMockBatch = async (e) => {
        e.preventDefault();
        try {
            await teacherService.createMockBatch(mockBatch);
            toast.success("Mock Batch Created Successfully");
            setShowMockBatchModal(false);
        } catch (error) {
            toast.error("Failed to create mock batch");
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Student List", 14, 20);
        const tableData = students.map(s => [
            s.user?.name || 'N/A',
            s.user?.email || 'N/A',
            s.batch?.name || 'Unassigned',
            s.course?.name || 'N/A'
        ]);
        doc.autoTable({
            head: [['Name', 'Email', 'Batch', 'Course']],
            body: tableData,
            startY: 30,
        });
        doc.save('my_students.pdf');
    };

    const filteredStudents = students.filter(student =>
        student.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate Stats
    const totalStudents = students.length;
    const activeBatches = new Set(students.map(s => s.batch?.name).filter(Boolean)).size;
    const avgPerformance = "78%"; // Mock data for now

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-8 pb-10"
        >
            <PageHeader
                title="My Students"
                subtitle="Manage your class roster and track performance."
                user="Alex Teacher" // Replace with actual user name
                actions={
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setShowMockBatchModal(true)} icon={FiLayers}>
                            Mock Batch
                        </Button>
                        <Button variant="secondary" onClick={handleDownloadPDF} icon={FiDownload}>
                            Export
                        </Button>
                        <Button onClick={() => setShowAddModal(true)} icon={FiUserPlus}>
                            Add Student
                        </Button>
                    </div>
                }
            />

            {/* Stats Row - Using Glass Variant */}
            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard variant="glass" title="Total Students" value={totalStudents} icon={FiUsers} trend="+12%" trendType="up" />
                <StatsCard variant="glass" title="Active Batches" value={activeBatches} icon={FiLayers} trend="Stable" trendType="neutral" />
                <StatsCard variant="glass" title="Avg. Performance" value={avgPerformance} icon={FiAward} trend="+5%" trendType="up" />
            </motion.div>

            {/* Toolbar */}
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-soft border border-white/50">
                <div className="relative w-full md:w-96 group">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-200 transition-all outline-none text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 bg-secondary-50/50 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-700'}`}
                    >
                        <FiGrid />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-700'}`}
                    >
                        <FiList />
                    </button>
                </div>
            </motion.div>

            {/* Content Area */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-secondary-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : filteredStudents.length > 0 ? (
                viewMode === 'grid' ? (
                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredStudents.map((student) => (
                                <TiltCard key={student._id} variants={fadeSlideUp} className="flex flex-col gap-4 relative group p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg shadow-inner">
                                                {student.user?.name?.charAt(0) || 'S'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-secondary-900 line-clamp-1">{student.user?.name}</h3>
                                                <p className="text-xs text-secondary-500">{student.user?.email}</p>
                                            </div>
                                        </div>
                                        <button className="text-secondary-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FiMoreVertical />
                                        </button>
                                    </div>

                                    <div className="space-y-2 py-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-secondary-500">Batch</span>
                                            <Badge variant="primary">{student.batch?.name || 'Unassigned'}</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-secondary-500">Course</span>
                                            <span className="font-medium text-secondary-700">{student.course?.name || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-secondary-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-secondary-500">Performance</span>
                                            <span className="text-xs font-bold text-green-600">75%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-secondary-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[75%] rounded-full"></div>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <Card noPadding className="overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-secondary-50 border-b border-secondary-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 uppercase tracking-wider">Course / Batch</th>
                                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-100">
                                {filteredStudents.map((student) => (
                                    <tr key={student._id} className="hover:bg-secondary-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                                                    {student.user?.name?.charAt(0) || 'S'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-secondary-900 text-sm">{student.user?.name}</p>
                                                    <p className="text-xs text-secondary-500">{student.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-secondary-900">{student.course?.name}</span>
                                                <span className="text-xs text-secondary-500">{student.batch?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="success">Active</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-secondary-400 hover:text-primary-600 transition-colors">
                                                <FiMoreVertical />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )
            ) : (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 animate-fadeIn relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-500 dark:text-blue-400 relative z-10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <FiUserPlus size={32} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">No Students Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 relative z-10 leading-relaxed">
                        Your student roster is currently empty. Get started by adding your first student to a batch.
                    </p>

                    <div className="relative z-10 w-full max-w-xs">
                        <Button
                            onClick={() => setShowAddModal(true)}
                            icon={FiUserPlus}
                            className="w-full justify-center py-4 text-base shadow-lg shadow-blue-500/20"
                        >
                            Add First Student
                        </Button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-secondary-900/40 backdrop-blur-sm"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10"
                        >
                            <h3 className="text-xl font-bold mb-2">Add Student</h3>
                            <p className="text-sm text-secondary-500 mb-6">Enter details to enroll a new student.</p>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setShowAddModal(false);
                                toast.success("Student added (mock)");
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-1">Student ID / Email</label>
                                    <input type="text" className="w-full border border-secondary-200 rounded-xl p-2.5 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="student@example.com" />
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                    <Button type="submit">Add Student</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Mock Batch Modal */}
            <AnimatePresence>
                {showMockBatchModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-secondary-900/40 backdrop-blur-sm" onClick={() => setShowMockBatchModal(false)} />
                        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10">
                            <h3 className="text-xl font-bold mb-4">Create Mock Batch</h3>
                            <form onSubmit={handleCreateMockBatch} className="space-y-4">
                                <input
                                    className="w-full border border-secondary-200 rounded-xl p-2.5"
                                    placeholder="Batch Name"
                                    value={mockBatch.name}
                                    onChange={e => setMockBatch({ ...mockBatch, name: e.target.value })}
                                />
                                <div className="flex justify-end gap-3 mt-4">
                                    <Button variant="ghost" onClick={() => setShowMockBatchModal(false)}>Cancel</Button>
                                    <Button type="submit">Create</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TeacherStudents;
