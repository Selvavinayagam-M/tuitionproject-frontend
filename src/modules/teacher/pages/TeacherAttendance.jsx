import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import teacherService from '../../../services/teacher.service';

const TeacherAttendance = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({}); // { studentId: 'Present' | 'Absent' }
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        loadBatches();
    }, []);

    const loadBatches = async () => {
        try {
            const data = await teacherService.getBatches();
            setBatches(data);
        } catch (error) {
            toast.error("Failed to load batches");
        }
    };

    const handleBatchChange = (e) => {
        const batchId = e.target.value;
        setSelectedBatch(batchId);

        const batch = batches.find(b => b._id === batchId);
        if (batch) {
            setStudents(batch.students);
            // Initialize default attendance as Present
            const initialData = {};
            batch.students.forEach(s => {
                initialData[s._id] = 'Present';
            });
            setAttendanceData(initialData);
        } else {
            setStudents([]);
        }
    };

    const toggleStatus = (studentId) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
        }));
    };

    const handleSubmit = async () => {
        if (!selectedBatch) return toast.warning("Please select a batch");

        setLoading(true);
        try {
            const records = Object.entries(attendanceData).map(([student, status]) => ({
                student,
                status
            }));

            await teacherService.markAttendance({
                batchId: selectedBatch,
                date,
                records
            });
            toast.success("Attendance marked successfully!");
        } catch (error) {
            toast.error("Failed to submit attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mark Attendance 📅</h1>
                <p className="text-gray-500 text-sm">Select a batch and mark student daily attendance.</p>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Batch</label>
                    <select
                        value={selectedBatch}
                        onChange={handleBatchChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">-- Choose Batch --</option>
                        {batches.map(b => (
                            <option key={b._id} value={b._id}>{b.name} ({b.course.name})</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            {/* Student List */}
            {selectedBatch && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Student List ({students.length})</h3>
                        <div className="text-sm space-x-4">
                            <span className="text-green-600 font-bold">Present: {Object.values(attendanceData).filter(s => s === 'Present').length}</span>
                            <span className="text-red-500 font-bold">Absent: {Object.values(attendanceData).filter(s => s === 'Absent').length}</span>
                        </div>
                    </div>

                    {students.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No students found in this batch.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {students.map(student => (
                                <div key={student._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{student.name}</h4>
                                            <p className="text-xs text-gray-500">{student.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleStatus(student._id)}
                                        className={`px-6 py-2 rounded-lg font-bold transition-all ${attendanceData[student._id] === 'Present'
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}>
                                        {attendanceData[student._id]}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Submit Action */}
            {selectedBatch && students.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Save Attendance'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherAttendance;
