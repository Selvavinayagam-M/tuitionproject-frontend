import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import { FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';

const CourseManager = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Class 10 - Science (Physics, Chem, Bio)', board: 'CBSE', fees: 25000, type: 'Direct' },
        { id: 2, name: 'Class 12 - Mathematics (Calculus Focus)', board: 'ICSE', fees: 32000, type: 'Approval' },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', board: 'CBSE', fees: '', type: 'Direct' });

    const handleAdd = (e) => {
        e.preventDefault();
        setCourses([...courses, { ...newItem, id: Date.now() }]);
        setShowForm(false);
        setNewItem({ name: '', board: 'CBSE', fees: '', type: 'Direct' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Course Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Create, edit, and publish courses.</p>
                </div>
                <Button className="w-full md:w-auto flex justify-center items-center" onClick={() => setShowForm(true)}>
                    <FaPlus className="mr-2" /> Create New Course
                </Button>
            </div>

            {/* Mobile Cards (Mobile View) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {courses.map(c => (
                    <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                                <FaBook size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{c.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${c.type === 'Direct' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                        {c.type}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        {c.board}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Course Fee</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">₹{c.fees.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 rounded-lg transition-colors">
                                    <FaEdit size={16} />
                                </button>
                                <button className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 rounded-lg transition-colors">
                                    <FaTrash size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table (Hidden on Mobile) */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Course Name</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Board</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Fees</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Enrollment Type</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(c => (
                            <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                                <td className="p-4 font-medium text-gray-800 dark:text-white flex items-center">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded mr-3 text-blue-600 dark:text-blue-400"><FaBook /></div>
                                    {c.name}
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">{c.board}</td>
                                <td className="p-4 font-bold text-gray-800 dark:text-white">₹{c.fees.toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded ${c.type === 'Direct' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                        {c.type}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><FaEdit /></button>
                                    <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
                        <h3 className="text-lg font-bold mb-4">Add Course</h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Course Name</label>
                                <input required className="input-field w-full border p-2 rounded" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="e.g. Class 10 Physics" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Board</label>
                                    <select className="input-field w-full border p-2 rounded" value={newItem.board} onChange={e => setNewItem({ ...newItem, board: e.target.value })}>
                                        <option>CBSE</option>
                                        <option>ICSE</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Fees (₹)</label>
                                    <input required type="number" className="input-field w-full border p-2 rounded" value={newItem.fees} onChange={e => setNewItem({ ...newItem, fees: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Enrollment Rule</label>
                                <select className="input-field w-full border p-2 rounded" value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })}>
                                    <option value="Direct">Direct Admission</option>
                                    <option value="Approval">Requires Approval</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 font-bold">Cancel</button>
                                <Button type="submit">Publish Course</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManager;
