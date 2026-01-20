import React, { useState, useEffect } from 'react';
import Button from '../../../../shared/components/Button';
import { FaCalendarAlt, FaPlus, FaUsers, FaChalkboardTeacher, FaClock } from 'react-icons/fa';
import teacherService from '../../../../services/teacher.service';

const BatchStudentList = ({ students, timings }) => {
    if (!students || students.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-500">No students assigned to this batch.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <FaClock className="text-blue-500" />
                <span className="font-semibold">Batch Timings:</span> {timings}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 border-b bg-gray-50 text-left font-bold text-gray-700">Student Name</th>
                            <th className="p-3 border-b bg-gray-50 text-left font-bold text-gray-700">Email</th>
                            <th className="p-3 border-b bg-gray-50 text-left font-bold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b font-medium text-gray-800">{student.name || student.user?.name}</td>
                                <td className="p-3 border-b text-gray-600">{student.email || student.user?.email}</td>
                                <td className="p-3 border-b">
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BatchManager = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const data = await teacherService.getBatches();
                setBatches(data);
                if (data.length > 0) {
                    setSelectedBatchId(data[0]._id);
                }
            } catch (error) {
                console.error("Error fetching batches:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const selectedBatch = batches.find(b => b._id === selectedBatchId);

    if (loading) return <div>Loading Batches...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Batch Management</h1>
                    <p className="text-sm text-gray-500">View batch details and student lists.</p>
                </div>
                <Button><FaPlus className="mr-2" /> Create New Batch</Button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4 items-center">
                        <select
                            value={selectedBatchId}
                            onChange={(e) => setSelectedBatchId(e.target.value)}
                            className="input-field border px-4 py-2 rounded-lg font-bold text-gray-700 bg-white"
                        >
                            {batches.map(batch => (
                                <option key={batch._id} value={batch._id}>{batch.name}</option>
                            ))}
                        </select>
                        {selectedBatch && (
                            <>
                                <span className="flex items-center text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                                    <FaUsers className="mr-2" /> {selectedBatch.students?.length || 0} Students
                                </span>
                                <span className="flex items-center text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                                    <FaChalkboardTeacher className="mr-2" /> {selectedBatch.course?.name || 'Course'}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {selectedBatch ? (
                    <BatchStudentList students={selectedBatch.students} timings={selectedBatch.timings} />
                ) : (
                    <div className="text-center py-10 text-gray-500">No batches found. Create one to get started.</div>
                )}
            </div>
        </div>
    );
};

export default BatchManager;
