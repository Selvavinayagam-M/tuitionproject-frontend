import React, { useEffect, useState } from 'react';
import DataTable from '../components/tables/DataTable';
import TableFilters from '../components/tables/TableFilters';
import Pagination from '../components/tables/Pagination';
import TableActions from '../components/tables/TableActions';
import StatusBadge from '../components/common/StatusBadge';
import { facultyService } from '../services/faculty.service';
import { facultyColumns } from '../data/faculty.data';
import useFilters from '../hooks/useFilters';
import usePagination from '../hooks/usePagination';

const FacultyPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = facultyColumns.map(col => {
        if (col.key === 'status') {
            return { ...col, render: (val) => <StatusBadge status={val} /> };
        }
        return col;
    });

    const { filteredData, setSearchQuery } = useFilters(data, ['name', 'subject']);
    const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 5);

    useEffect(() => {
        const fetchFaculty = async () => {
            const result = await facultyService.getAll();
            setData(result);
            setLoading(false);
        };
        fetchFaculty();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty</h1>
                <TableActions onAdd={() => { }} addLabel="Add Faculty" />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <TableFilters onSearch={setSearchQuery} />
                <DataTable
                    columns={columns}
                    data={currentData}
                    isLoading={loading}
                    onEdit={(row) => { }}
                    onDelete={(row) => { }}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>
        </div>
    );
};

export default FacultyPage;
