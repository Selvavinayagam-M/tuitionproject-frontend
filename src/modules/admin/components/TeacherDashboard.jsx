import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MOCK_TEACHER_STATS = {
    totalClasses: 12,
    studentsCount: 45,
    pendingGrading: 5,
    attendanceRate: '92%'
};

const MetricCard = ({ title, value, subtext, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
        <div className={`p-4 rounded-lg bg-${color}-50 text-${color}-600 text-xl`}>
            {icon}
        </div>
    </div>
);

const TeacherDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
                <div className="text-sm text-gray-500">Welcome, <span className="font-bold text-blue-900">Mr. Sharma</span></div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Assigned Classes"
                    value={MOCK_TEACHER_STATS.totalClasses}
                    subtext="This Semester"
                    icon={<FaChalkboardTeacher />}
                    color="blue"
                />
                <MetricCard
                    title="Total Students"
                    value={MOCK_TEACHER_STATS.studentsCount}
                    subtext="Across all batches"
                    icon={<FaUserGraduate />}
                    color="purple"
                />
                <MetricCard
                    title="Pending Grading"
                    value={MOCK_TEACHER_STATS.pendingGrading}
                    subtext="Assignments"
                    icon={<FaClipboardList />}
                    color="orange"
                />
                <MetricCard
                    title="Avg. Attendance"
                    value={MOCK_TEACHER_STATS.attendanceRate}
                    subtext="Last 30 Days"
                    icon={<FaCheckCircle />}
                    color="green"
                />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Class Performance</h3>
                    <div className="h-64">
                        <Line
                            data={{
                                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                                datasets: [{
                                    label: 'Class Average',
                                    data: [75, 78, 82, 80],
                                    borderColor: 'rgb(99, 102, 241)',
                                    tension: 0.4
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Upcoming Schedule</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                                    {10 + item}:00
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Mathematics - Class 10-{String.fromCharCode(64 + item)}</h4>
                                    <p className="text-xs text-gray-500">Chapter 4: Quadratic Equations</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
