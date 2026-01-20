import React, { useEffect, useState } from 'react';
import ReportFilters from '../components/reports/ReportFilters';
import ReportCharts from '../components/reports/ReportCharts';
import ReportTable from '../components/reports/ReportTable';
import ExportButtons from '../components/reports/ExportButtons';
import { reportsService } from '../services/reports.service';
import { exportService } from '../services/export.service';
import { reportColumns } from '../data/reports.data';
import { formatCurrency } from '../utils/dateHelpers';

const ReportsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            const result = await reportsService.getFinancialReport();
            setData(result);
            setLoading(false);
        };
        fetchReports();
    }, []);

    const handleExportCSV = () => exportService.toCSV(data, 'financial_report');
    const handleExportPDF = () => exportService.toPDF(reportColumns, data, 'Financial Report');

    // Format currency in table
    const columns = reportColumns.map(col => ({
        ...col,
        render: (val) => typeof val === 'number' ? formatCurrency(val) : val
    }));

    // Prepare chart data (e.g., Revenue vs Expenses)
    const chartData = data.map(item => ({
        name: item.month,
        value: item.revenue
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>

            <ReportFilters
                onFilter={() => console.log('Apply Filter')}
                onDateChange={() => { }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReportCharts type="bar" data={chartData} title="Monthly Revenue" />
                <ReportCharts type="line" data={chartData} title="Revenue Trend" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Detailed Report</h3>
                    <ExportButtons
                        onExportCSV={handleExportCSV}
                        onExportPDF={handleExportPDF}
                        onPrint={() => window.print()}
                    />
                </div>
                <ReportTable
                    columns={columns}
                    data={data}
                    footerData={{ month: 'Total', revenue: '₹...', expenses: '₹...', profit: '₹...' }}
                />
            </div>
        </div>
    );
};

export default ReportsPage;
