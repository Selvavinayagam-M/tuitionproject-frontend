import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEllipsisV, FaUserEdit, FaTrash } from 'react-icons/fa';

// Mock Data
const students = [
    { id: 'ST-2024-001', name: 'Aarav Patel', class: 'Class 10', batch: 'Morning-A', status: 'Active', fees: 'Paid' },
    { id: 'ST-2024-002', name: 'Diya Singh', class: 'Class 12', batch: 'Evening-B', status: 'Active', fees: 'Pending' },
    { id: 'ST-2024-003', name: 'Ishaan Gupta', class: 'Class 9', batch: 'Morning-A', status: 'Inactive', fees: 'Overdue' },
    { id: 'ST-2024-004', name: 'Saanvi Kumar', class: 'Class 10', batch: 'Morning-A', status: 'Active', fees: 'Paid' },
];

const StudentList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('');

    const filteredStudents = students.filter(student =>
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterClass ? student.class === filterClass : true)
    );

    // Modals state
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="flex flex-col h-[calc(100vh-5.5rem)] md:h-auto gap-4">
            {/* Mobile Fixed Header */}
            <div className="md:hidden flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Students</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{filteredStudents.length} Records</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
                    >
                        <FaFilter size={18} />
                    </button>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
                        <FaUserEdit size={18} /> {/* Using UserEdit as Add for now or Plus */}
                    </button>
                </div>
            </div>

            {/* Mobile Filters (Collapsible/Fixed) */}
            {showFilters && (
                <div className="md:hidden shrink-0 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 animate-in slide-in-from-top-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="flex-1 text-sm border border-gray-200 dark:border-gray-600 px-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                        </select>
                        <select className="flex-1 text-sm border border-gray-200 dark:border-gray-600 px-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <option value="">Class</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Mobile Stats Summary (Fixed Horizontal) */}
            <div className="md:hidden shrink-0 grid grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Active</span>
                    <span className="text-xl font-black text-blue-800 dark:text-blue-200">98%</span>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl border border-orange-100 dark:border-orange-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase">Fees Due</span>
                    <span className="text-xl font-black text-orange-800 dark:text-orange-200">12</span>
                </div>
            </div>

            {/* Mobile List (Scrollable Area) */}
            <div className="md:hidden flex-1 overflow-y-auto -mx-4 px-4 pb-20 space-y-3 scrollbar-hide">
                {filteredStudents.map(student => (
                    <div key={student.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                        {/* Avatar/Icon */}
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                            <span className="font-bold text-gray-500 dark:text-gray-400 text-sm">{student.name.charAt(0)}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{student.name}</h3>
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {student.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{student.id}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{student.class}</span>
                            </div>
                        </div>

                        {/* Quick Action */}
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-blue-600">
                            <FaEllipsisV size={14} />
                        </button>
                    </div>
                ))}
                {/* Spacer for bottom */}
                <div className="h-8"></div>
            </div>

            {/* Desktop View (Unchanged - Hidden Mobile) */}
            <div className="hidden md:block space-y-6">
                {/* ... Original Desktop Header & Toolbar ... */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student Directory</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage student profiles, enrollments, and status.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-600 dark:text-gray-300 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">
                            <FaEllipsisV />
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors text-center">
                            Add Student
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex gap-4 flex-1">
                        <div className="relative w-64">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Search by Name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="border border-gray-200 dark:border-gray-600 px-4 py-2.5 rounded-lg outline-none text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"
                            onChange={(e) => setFilterClass(e.target.value)}
                        >
                            <option value="">All Classes</option>
                            <option value="Class 10">Class 10</option>
                            <option value="Class 12">Class 12</option>
                        </select>
                        <select className="border border-gray-200 dark:border-gray-600 px-4 py-2.5 rounded-lg outline-none text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700">
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Showing {filteredStudents.length} Students
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Table Content... reusing the same table logic but clean copy to ensure no issues */}
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">ID</th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">Student Name</th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">Class & Batch</th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">Status</th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">Fees</th>
                                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition border-b border-gray-50 dark:border-gray-700 last:border-none">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                                    <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">{student.id}</td>
                                    <td className="p-4 text-gray-800 dark:text-white font-medium">{student.name}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                                        <div className="font-bold">{student.class}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{student.batch}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${student.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${student.fees === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : student.fees === 'Overdue' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                            {student.fees}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 transition-colors"><FaUserEdit /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredStudents.length === 0 && <div className="p-8 text-center text-gray-400 dark:text-gray-500">No students found matching your filters.</div>}
                </div>
            </div>
        </div>
    );
};

export default StudentList;
