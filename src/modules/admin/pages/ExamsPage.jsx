import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import DataTable from '../components/tables/DataTable';
import TableFilters from '../components/tables/TableFilters';
import Pagination from '../components/tables/Pagination';
import TableActions from '../components/tables/TableActions';
import StatusBadge from '../components/common/StatusBadge';
import { examsService } from '../services/exams.service';
import { examsColumns } from '../data/exams.data';
import useFilters from '../hooks/useFilters';
import usePagination from '../hooks/usePagination';

const ExamsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = examsColumns.map(col => {
        if (col.key === 'status') {
            return { ...col, render: (val) => <StatusBadge status={val} /> };
        }
        return col;
    });

    const { filteredData, setSearchQuery } = useFilters(data, ['name', 'course']);
    const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 5);

    useEffect(() => {
        const fetchExams = async () => {
            const result = await examsService.getAll();
            setData(result);
            setLoading(false);
        };
        fetchExams();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams</h1>
                <TableActions onAdd={() => console.log('Schedule Exam')} addLabel="Schedule Exam" />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <TableFilters onSearch={setSearchQuery} />

                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <DataTable
                        columns={columns}
                        data={currentData}
                        isLoading={loading}
                        onEdit={(row) => console.log("Edit Exam", row)}
                        onDelete={(row) => console.log("Delete Exam", row)}
                    />
                </div>

                {/* Mobile View (Card Grid) */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        currentData.map((exam) => (
                            <div key={exam.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{exam.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{exam.date}</p>
                                    </div>
                                    <StatusBadge status={exam.status} />
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Class:</span>
                                        <span className="font-medium text-right">{exam.class}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Subject:</span>
                                        <span className="font-medium text-right">{exam.subject}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Marks:</span>
                                        <span className="font-medium text-right">{exam.totalMarks}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-600 mt-1">
                                    {exam.status === 'Completed' && (
                                        <button className="mr-auto text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors">
                                            View Results
                                        </button>
                                    )}
                                    <button onClick={() => console.log("Edit Exam", exam)} className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 rounded-lg">
                                        <FiEdit2 size={18} />
                                    </button>
                                    <button onClick={() => console.log("Delete Exam", exam)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 rounded-lg">
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

export default ExamsPage;
