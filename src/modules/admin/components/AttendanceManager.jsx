import React, { useEffect, useState } from 'react';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';
import teacherService from '../../../services/teacher.service';
import { toast } from 'react-toastify';

const AttendanceManager = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load Batches on Mount
    useEffect(() => {
        const loadBatches = async () => {
            try {
                const data = await teacherService.getBatches();
                setBatches(data);
                if (data.length > 0) {
                    setSelectedBatchId(data[0]._id);
                }
            } catch (error) {
                console.error("Error loading batches:", error);
                toast.error("Failed to load batches");
            }
        };
        loadBatches();
    }, []);

    // Load Attendance or Students when Batch/Date changes
    useEffect(() => {
        if (!selectedBatchId) return;

        const loadData = async () => {
            setLoading(true);
            try {
                // First, try to get existing attendance
                // Note: The backend logic for 'getAttendance' returns history for a batch.
                // It does NOT filter by date in the controller usually, or maybe it does?
                // Looking at controller: exports.getAttendance = async (req, res) => Attendance.find({ batch: batchId }).sort({ date: -1 });
                // So we get all history. We need to find if there's a record for today.

                const historyHelper = await teacherService.getAttendanceHistory(selectedBatchId);
                const todaysRecord = historyHelper.find(record => new Date(record.date).toISOString().split('T')[0] === date);

                if (todaysRecord) {
                    // Map existing records
                    const mappedData = todaysRecord.records.map(r => ({
                        id: r.student._id || r.student, // Handle populated or ID
                        name: r.student.name || 'Student', // Ideally student name should be populated
                        status: r.status.toLowerCase()
                    }));
                    // Wait, if student name isn't populated in history records, we might show IDs.
                    // The Attendance model 'records.student' IS populated usually if we modify the controller? 
                    // Let's assume for now we might need to merge with batch student list if names are missing.
                    // Actually, let's just fetch the batch students to get names, then merge status.

                    const batch = batches.find(b => b._id === selectedBatchId);
                    if (batch && batch.students) {
                        const merged = batch.students.map(std => {
                            const existing = todaysRecord.records.find(r => (r.student._id || r.student) === std._id);
                            return {
                                id: std._id,
                                name: std.name || std.user?.name,
                                status: existing ? existing.status.toLowerCase() : 'absent'
                            };
                        });
                        setAttendanceData(merged);
                    } else {
                        setAttendanceData(mappedData); // Fallback
                    }

                } else {
                    // No record for today, load all students from batch with default 'Absent' (or 'Pending')
                    const batch = batches.find(b => b._id === selectedBatchId);
                    if (batch && batch.students) {
                        setAttendanceData(batch.students.map(std => ({
                            id: std._id,
                            name: std.name || std.user?.name,
                            status: 'pending'
                        })));
                    } else {
                        setAttendanceData([]);
                    }
                }
            } catch (error) {
                console.error("Error loading attendance data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [selectedBatchId, date, batches]);

    const stats = {
        present: attendanceData.filter(s => s.status === 'present').length,
        absent: attendanceData.filter(s => s.status === 'absent').length
    };

    const toggleStatus = (id, status) => {
        setAttendanceData(attendanceData.map(s =>
            s.id === id ? { ...s, status: s.status === status ? 'pending' : status } : s
        ));
    };

    const handleSave = async () => {
        try {
            const records = attendanceData.map(s => ({
                student: s.id,
                status: s.status === 'present' ? 'Present' : 'Absent' // Map to backend enum
            }));

            await teacherService.markAttendance({
                batchId: selectedBatchId,
                date: date,
                records: records
            });
            toast.success("Attendance Saved Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save attendance");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="space-y-4 max-w-2xl mx-auto md:max-w-none">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Register</h1>
                    <p className="text-sm text-gray-500">Mark daily attendance for students.</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <FiCalendar className="text-gray-500" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 dark:text-white p-0"
                    />
                </div>
            </div>

            {/* Controls & Stats */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <select
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    >
                        {batches.map(b => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 flex flex-col items-center justify-center gap-1">
                            <span className="text-green-700 dark:text-green-400 font-medium text-sm flex items-center gap-1.5 uppercase tracking-wide">
                                <FiCheck size={16} /> Present
                            </span>
                            <span className="text-3xl font-extrabold text-green-700 dark:text-green-400">{stats.present}</span>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 flex flex-col items-center justify-center gap-1">
                            <span className="text-red-700 dark:text-red-400 font-medium text-sm flex items-center gap-1.5 uppercase tracking-wide">
                                <FiX size={16} /> Absent
                            </span>
                            <span className="text-3xl font-extrabold text-red-700 dark:text-red-400">{stats.absent}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student List */}
            <div className="space-y-3">
                {attendanceData.length > 0 ? (
                    attendanceData.map((student) => (
                        <div
                            key={student.id}
                            className={`p-4 rounded-xl shadow-sm border transition-all duration-200 flex items-center justify-between
                                ${student.status === 'present' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' :
                                    student.status === 'absent' ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' :
                                        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white text-base">{student.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">ID: {student.id.substr(-6)}</span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => toggleStatus(student.id, 'absent')}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm
                                        ${student.status === 'absent' ? 'bg-red-500 text-white ring-2 ring-red-200' : 'bg-white dark:bg-gray-700 text-red-500 border border-gray-200 hover:bg-red-50'}`}
                                >
                                    <FiX size={20} />
                                </button>
                                <button
                                    onClick={() => toggleStatus(student.id, 'present')}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm
                                        ${student.status === 'present' ? 'bg-green-500 text-white ring-2 ring-green-200' : 'bg-white dark:bg-gray-700 text-green-500 border border-gray-200 hover:bg-green-50'}`}
                                >
                                    <FiCheck size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">No students found in this batch.</div>
                )}
            </div>

            {/* Save Button */}
            <div className="pt-4 sticky bottom-4 z-10 w-full">
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2">
                    <FiCheck size={20} /> Save Attendance
                </button>
            </div>
        </div>
    );
};

export default AttendanceManager;
