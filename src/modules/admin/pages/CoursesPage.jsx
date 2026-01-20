import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import DataTable from '../components/tables/DataTable';
import TableFilters from '../components/tables/TableFilters';
import Pagination from '../components/tables/Pagination';
import TableActions from '../components/tables/TableActions';
import StatusBadge from '../components/common/StatusBadge';
import { coursesService } from '../services/courses.service';
import { courseColumns } from '../data/courses.data';
import useFilters from '../hooks/useFilters';
import usePagination from '../hooks/usePagination';

const CoursesPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = courseColumns.map(col => {
        if (col.key === 'status') {
            return { ...col, render: (val) => <StatusBadge status={val} /> };
        }
        return col;
    });

    const { filteredData, setSearchQuery } = useFilters(data, ['name', 'code']);
    const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 5);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await coursesService.getAll();
            setData(result);
            setLoading(false);
        };
        fetchCourses();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h1>
                <TableActions onAdd={() => { }} addLabel="Add Course" />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <TableFilters onSearch={setSearchQuery} />

                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <DataTable
                        columns={columns}
                        data={currentData}
                        isLoading={loading}
                        onEdit={(row) => { }}
                        onDelete={(row) => { }}
                    />
                </div>

                {/* Mobile View (Card Grid) */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        currentData.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{course.name}</h3>
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{course.board}</span>
                                    </div>
                                    <StatusBadge status={course.status} />
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Code:</span>
                                        <span className="font-medium text-right font-mono">{course.code}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Fee:</span>
                                        <span className="font-bold text-green-600 dark:text-green-400 text-right">₹{course.fees}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-600 mt-1">
                                    <button onClick={() => { }} className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 rounded-lg">
                                        <FiEdit2 size={18} />
                                    </button>
                                    <button onClick={() => { }} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 rounded-lg">
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
        </div>
    );
};

export default CoursesPage;
