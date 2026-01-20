
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { FaDownload, FaFilter, FaCalendarAlt, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import Button from '../../../shared/components/Button';
import { AdminService } from '../data/admin.service';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const ReportAnalytics = () => {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ date: 'This Month', branch: 'All', class: 'All' });

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            const data = await AdminService.getReports();
            setReports(data);
            setLoading(false);
        };
        fetchReports();
    }, []);

    if (loading) return <div className="text-center py-20">Loading Reports...</div>;
    if (!reports) return <div className="text-center py-20">No report data available. Select a date range to generate reports.</div>;

    // Chart Options (Common)
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
        },
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500">Track academic performance, business health, and operational metrics.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center bg-white border px-3 py-2 rounded text-sm font-medium hover:bg-gray-50">
                        <FaCalendarAlt className="mr-2 text-gray-400" /> {filters.date}
                    </button>
                    <button className="flex items-center bg-white border px-3 py-2 rounded text-sm font-medium hover:bg-gray-50">
                        <FaFilter className="mr-2 text-gray-400" /> {filters.branch}
                    </button>
                    <Button variant="outline" size="sm"><FaDownload className="mr-1" /> Export Summary</Button>
                </div>
            </div>

            {/* A. ADMISSIONS REPORT */}
            <ReportSection title="Admissions & Enquiries" icon="📊">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <MetricCard label="Total Enquiries" value={reports.admissions.metrics.totalEnquiries} color="blue" />
                    <MetricCard label="Converted" value={reports.admissions.metrics.converted} color="green" />
                    <MetricCard label="Pending" value={reports.admissions.metrics.pending} color="yellow" />
                    <MetricCard label="Conversion Rate" value={reports.admissions.metrics.conversionRate} color="purple" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-4">Enquiry vs Admission Trend</h4>
                        <div className="h-64">
                            <Line data={{
                                labels: reports.admissions.chart.labels,
                                datasets: [
                                    { label: 'Enquiries', data: reports.admissions.chart.enquiries, borderColor: '#3B82F6', tension: 0.3 },
                                    { label: 'Admissions', data: reports.admissions.chart.admissions, borderColor: '#10B981', tension: 0.3 }
                                ]
                            }} options={commonOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 overflow-x-auto">
                        <h4 className="font-bold text-gray-700 mb-4">Recent Enquiries</h4>
                        <Table
                            headers={['Name', 'Class', 'Source', 'Status']}
                            rows={reports.admissions.data.slice(0, 5)}
                            rowKey="id"
                            render={(row) => (
                                <>
                                    <td className="py-2">{row.name}</td>
                                    <td className="py-2">{row.class}</td>
                                    <td className="py-2 text-xs">{row.source}</td>
                                    <td className="py-2"><StatusBadge status={row.status} /></td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-800">{row.name}</div>
                                        <div className="text-xs text-gray-500">{row.class} • {row.source}</div>
                                    </div>
                                    <StatusBadge status={row.status} />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </ReportSection>

            {/* B. STUDENT PERFORMANCE REPORT */}
            <ReportSection title="Student Academic Performance" icon="👩‍🎓">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <MetricCard label="Avg Score" value={reports.studentPerformance.metrics.avgScore} color="indigo" />
                    <MetricCard label="Pass %" value={reports.studentPerformance.metrics.passPercentage} color="green" />
                    <MetricCard label="Top Performers" value={reports.studentPerformance.metrics.topPerformers} color="orange" />
                    <MetricCard label="Improvement" value={reports.studentPerformance.metrics.improvementTrend} color="blue" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-4">Avg Score by Class</h4>
                        <div className="h-64">
                            <Bar data={{
                                labels: reports.studentPerformance.chart.classes,
                                datasets: [{ label: 'Avg Score', data: reports.studentPerformance.chart.scores, backgroundColor: '#6366F1' }]
                            }} options={commonOptions} />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-100 overflow-x-auto">
                        <div className="flex justify-between mb-4">
                            <h4 className="font-bold text-gray-700">Recent Exam Results</h4>
                            <div className="space-x-2">
                                <button className="text-xs text-blue-600 hover:underline"><FaFileCsv className="inline" /> CSV</button>
                                <button className="text-xs text-red-600 hover:underline"><FaFilePdf className="inline" /> PDF</button>
                            </div>
                        </div>
                        <Table
                            headers={['Student', 'Class', 'Subject', 'Exam', 'Marks', 'Grade']}
                            rows={reports.studentPerformance.data}
                            rowKey="name" // unique enough for mock
                            render={(row) => (
                                <>
                                    <td className="py-2 font-medium">{row.name}</td>
                                    <td className="py-2">{row.class}</td>
                                    <td className="py-2">{row.subject}</td>
                                    <td className="py-2 text-sm text-gray-500">{row.exam}</td>
                                    <td className="py-2 font-bold">{row.marks}</td>
                                    <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{row.grade}</span></td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-800">{row.name}</div>
                                        <div className="text-xs text-gray-500">{row.subject} • {row.exam}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-blue-600 text-lg">{row.marks}</div>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">{row.grade}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </ReportSection>

            {/* C. FACULTY PERFORMANCE */}
            <ReportSection title="Faculty Performance" icon="🧑‍🏫">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-4">Faculty Effectiveness (Avg Student Score)</h4>
                        <div className="h-64">
                            <Bar data={{
                                labels: reports.facultyPerformance.chart.faculty,
                                datasets: [{ label: 'Avg Marks', data: reports.facultyPerformance.chart.scores, backgroundColor: '#F59E0B' }]
                            }} options={commonOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 overflow-x-auto">
                        <h4 className="font-bold text-gray-700 mb-4">Faculty Metrics</h4>
                        <Table
                            headers={['Name', 'Subject', 'Batches', 'Avg Marks', 'Feedback']}
                            rows={reports.facultyPerformance.data}
                            rowKey="name"
                            render={(row) => (
                                <>
                                    <td className="py-2 font-medium">{row.name}</td>
                                    <td className="py-2">{row.subject}</td>
                                    <td className="py-2 text-center">{row.batches}</td>
                                    <td className="py-2 text-center font-bold">{row.avgMarks}</td>
                                    <td className="py-2 text-center">⭐ {row.feedback}</td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-bold text-gray-800">{row.name}</div>
                                            <div className="text-xs text-gray-500">{row.subject}</div>
                                        </div>
                                        <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-bold">⭐ {row.feedback}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2">
                                        <div className="text-gray-500">Batches: <span className="font-bold text-gray-800">{row.batches}</span></div>
                                        <div className="text-gray-500">Avg Marks: <span className="font-bold text-blue-600">{row.avgMarks}</span></div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </ReportSection>

            {/* D. FINANCIAL REPORT */}
            <ReportSection title="Financial Overview" icon="💰">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <MetricCard label="Total Billed" value={reports.financial.metrics.totalBilled} color="gray" />
                    <MetricCard label="Collected" value={reports.financial.metrics.collected} color="green" />
                    <MetricCard label="Pending" value={reports.financial.metrics.pending} color="red" />
                    <MetricCard label="Overdue" value={reports.financial.metrics.overdue} color="red" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className=" bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-4">Revenue Trend</h4>
                        <div className="h-64">
                            <Line data={{
                                labels: reports.financial.chart.labels,
                                datasets: [{ label: 'Revenue', data: reports.financial.chart.revenue, borderColor: '#10B981', fill: true, backgroundColor: 'rgba(16, 185, 129, 0.1)' }]
                            }} options={commonOptions} />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-100 overflow-x-auto">
                        <h4 className="font-bold text-gray-700 mb-4">Recent Transactions / Dues</h4>
                        <Table
                            headers={['Student', 'Course', 'Total', 'Paid', 'Due', 'Status']}
                            rows={reports.financial.data}
                            rowKey="name"
                            render={(row) => (
                                <>
                                    <td className="py-2 font-medium">{row.name}</td>
                                    <td className="py-2 text-xs">{row.course}</td>
                                    <td className="py-2">{row.total}</td>
                                    <td className="py-2 text-green-600">{row.paid}</td>
                                    <td className="py-2 text-red-600 font-bold">{row.due}</td>
                                    <td className="py-2"><StatusBadge status={row.status} /></td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <div className="font-bold text-gray-800">{row.name}</div>
                                        <StatusBadge status={row.status} />
                                    </div>
                                    <div className="text-xs text-gray-500">{row.course}</div>
                                    <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
                                        <div><div className="text-xs text-gray-400">Total</div><div className="font-bold">{row.total}</div></div>
                                        <div><div className="text-xs text-gray-400">Paid</div><div className="font-bold text-green-600">{row.paid}</div></div>
                                        <div><div className="text-xs text-gray-400">Due</div><div className="font-bold text-red-600">{row.due}</div></div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </ReportSection>

            {/* E. ATTENDANCE & F. EXAMS (Grid 2 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attendance */}
                <ReportSection title="Attendance Analytics" icon="🕒">
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1 bg-blue-50 p-3 rounded text-center">
                            <div className="text-xl font-bold text-blue-700">{reports.attendance.metrics.avgAttendance}</div>
                            <div className="text-xs text-blue-600">Avg Attendance</div>
                        </div>
                        <div className="flex-1 bg-red-50 p-3 rounded text-center">
                            <div className="text-xl font-bold text-red-700">{reports.attendance.metrics.lowAttendanceCount}</div>
                            <div className="text-xs text-red-600">Low Attendance</div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <Table
                            headers={['Student', 'Batch', 'Attended', '%']}
                            rows={reports.attendance.data}
                            rowKey="name"
                            render={(row) => (
                                <>
                                    <td className="py-1 text-sm">{row.name}</td>
                                    <td className="py-1 text-xs text-gray-500">{row.class}</td>
                                    <td className="py-1 text-sm text-center">{row.attended}/{row.total}</td>
                                    <td className="py-1 text-sm font-bold text-right">{row.percentage}</td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-sm text-gray-800">{row.name}</div>
                                        <div className="text-xs text-gray-500">{row.class}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-blue-700">{row.percentage}</div>
                                        <div className="text-xs text-gray-400">{row.attended}/{row.total} Days</div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </ReportSection>

                {/* Exams */}
                <ReportSection title="Exam Outcomes" icon="📈">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 mb-4 h-48">
                        <Bar data={{
                            labels: reports.exams.chart.exams,
                            datasets: [{ label: 'Pass %', data: reports.exams.chart.passPercentage, backgroundColor: '#8B5CF6' }]
                        }} options={commonOptions} />
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 overflow-x-auto">
                        <Table
                            headers={['Exam', 'Avg', 'Pass %']}
                            rows={reports.exams.data}
                            rowKey="exam"
                            render={(row) => (
                                <>
                                    <td className="py-1 text-sm">{row.exam}</td>
                                    <td className="py-1 text-sm text-center font-bold">{row.avg}</td>
                                    <td className="py-1 text-sm text-center text-green-600">{row.pass}</td>
                                </>
                            )}
                            renderCard={(row) => (
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-gray-800">{row.exam}</div>
                                    <div className="flex gap-3 text-sm">
                                        <div><span className="text-gray-400 text-xs">Avg:</span> <span className="font-bold">{row.avg}</span></div>
                                        <div><span className="text-gray-400 text-xs">Pass:</span> <span className="font-bold text-green-600">{row.pass}</span></div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </ReportSection>
            </div>
        </div>
    );
};

// Reusable Sub-components within this file to keep it self-contained as requested
const ReportSection = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800 flex items-center">{icon} <span className="ml-2">{title}</span></h3>
            <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-blue-600"><FaDownload /></button>
            </div>
        </div>
        <div className="p-6 bg-gray-50/50">
            {children}
        </div>
    </div>
);

const MetricCard = ({ label, value, color }) => (
    <div className={`bg-white p-4 rounded-lg border-l-4 border-${color}-500 shadow-sm`}>
        <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">{label}</div>
        <div className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</div>
    </div>
);

// ... (Usage updates would go here, need to update the FULL file content or chunks for each table usage, but since I am editing the Table component def at the bottom, I should probably do a multi-replace or just replace valid blocks)

// Let's do the Table component first, then the usages.
// Actually, since I have one replace block, I will replace the Table component definition at the bottom first, 
// AND then I will update the usages. Wait, `replace_file_content` is a single block valid for one contiguous change?
// The user prompt implies I should replace table usages.
// Since the usages are scattered, I should use `multi_replace_file_content`.

const Table = ({ headers, rows, rowKey, render, renderCard }) => (
    <>
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        {headers.map((h, i) => <th key={i} className="py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={row[rowKey] || i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            {render(row)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="md:hidden space-y-3">
            {rows.map((row, i) => (
                <div key={row[rowKey] || i} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                    {renderCard ? renderCard(row) : (
                        // Fallback if no card renderer
                        <div className="text-sm">
                            {headers.map((h, j) => (
                                <div key={j} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                                    <span className="font-bold text-gray-500 text-xs uppercase">{h}:</span>
                                    <span>{/* Extracting data from render is hard, so renderCard is mandatory for good UI */} Data</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </>
);

const StatusBadge = ({ status }) => {
    let classes = "bg-gray-100 text-gray-800";
    if (status === 'Converted' || status === 'Paid') classes = "bg-green-100 text-green-800";
    if (status === 'Pending' || status === 'Partial') classes = "bg-yellow-100 text-yellow-800";
    if (status === 'Rejected' || status === 'Overdue') classes = "bg-red-100 text-red-800";
    return <span className={`px-2 py-1 rounded text-xs font-bold ${classes}`}>{status}</span>;
};

export default ReportAnalytics;
