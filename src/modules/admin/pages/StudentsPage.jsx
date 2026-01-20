import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';
import DataTable from '../components/tables/DataTable';
import TableFilters from '../components/tables/TableFilters';
import Pagination from '../components/tables/Pagination';
import TableActions from '../components/tables/TableActions';
import StatusBadge from '../components/common/StatusBadge';
import { studentsService } from '../services/students.service';
import { studentColumns } from '../data/students.data';
import useFilters from '../hooks/useFilters';
import usePagination from '../hooks/usePagination';
import AddStudent from '../components/AddStudent';

const StudentsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Customizing columns to render StatusBadge
    const columns = studentColumns.map(col => {
        if (col.key === 'status' || col.key === 'feesUsers') {
            return { ...col, render: (val) => <StatusBadge status={val} /> };
        }
        return col;
    });

    const { filteredData, setSearchQuery, updateFilter, filters } = useFilters(data, ['name', 'rollNo']);
    const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 5);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const result = await studentsService.getAll();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleStudentAdded = () => {
        fetchStudents();
        setShowAddModal(false);
    };

    const handleEdit = (row) => {
        console.log("Edit student:", row);
        // TODO: Implement Edit Modal or Navigation
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
            try {
                await studentsService.delete(row._id || row.id); // Ensure correct ID field
                fetchStudents(); // Refresh data
            } catch (error) {
                console.error("Delete failed", error);
                alert("Failed to delete student");
            }
        }
    };

    const handleView = (row) => {
        console.log("View student:", row);
        // TODO: Navigation to profile
    };

    return (
        <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students</h1>
                <TableActions onAdd={() => setShowAddModal(true)} addLabel="Add Student" />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <TableFilters
                    onSearch={setSearchQuery}
                    onFilterChange={updateFilter}
                    filters={filters}
                />

                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <DataTable
                        columns={columns}
                        data={currentData}
                        isLoading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </div>

                {/* Mobile View (Card Grid) */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        currentData.map((student) => (
                            <div key={student.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{student.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {student.rollNo}</p>
                                    </div>
                                    <StatusBadge status={student.status} />
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Class:</span>
                                        <span className="font-medium text-right">{student.class} ({student.batch})</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Mobile:</span>
                                        <span className="font-medium text-right">{student.mobile}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Fees:</span>
                                        <StatusBadge status={student.feesStatus} />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-600 mt-1">
                                    <button onClick={() => handleView(student)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg">
                                        <FiEye size={18} />
                                    </button>
                                    <button onClick={() => handleEdit(student)} className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 rounded-lg">
                                        <FiEdit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(student)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 rounded-lg">
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>

            {/* Add Student Modal Overlay */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <AddStudent onClose={() => setShowAddModal(false)} onSuccess={handleStudentAdded} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
