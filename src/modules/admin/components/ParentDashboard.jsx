import React from 'react';
import { FaChild, FaMoneyCheckAlt, FaChartBar, FaCalendarCheck } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MOCK_PARENT_STATS = {
    attendance: '95%',
    nextDue: '₹4,500',
    recentGrade: 'A',
    assignmentsDue: 2
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

const ParentDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
                <div className="text-sm text-gray-500">Child: <span className="font-bold text-blue-900">Rohan Das</span></div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Attendance"
                    value={MOCK_PARENT_STATS.attendance}
                    subtext="This Month"
                    icon={<FaCalendarCheck />}
                    color="green"
                />
                <MetricCard
                    title="Next Fee Due"
                    value={MOCK_PARENT_STATS.nextDue}
                    subtext="Due by 15th Aug"
                    icon={<FaMoneyCheckAlt />}
                    color="red"
                />
                <MetricCard
                    title="Recent Grade"
                    value={MOCK_PARENT_STATS.recentGrade}
                    subtext="Physics Test"
                    icon={<FaChartBar />}
                    color="blue"
                />
                <MetricCard
                    title="Assignments Due"
                    value={MOCK_PARENT_STATS.assignmentsDue}
                    subtext="This Week"
                    icon={<FaChild />}
                    color="orange"
                />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Subject Performance</h3>
                    <div className="h-64">
                        <Bar
                            data={{
                                labels: ['Maths', 'Physics', 'Chem', 'English', 'CS'],
                                datasets: [{
                                    label: 'Score (%)',
                                    data: [85, 72, 90, 88, 95],
                                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
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
                    <h3 className="font-bold text-gray-800 mb-4">Recent Notices</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                            <h4 className="font-semibold text-yellow-800">Parent-Teacher Meeting</h4>
                            <p className="text-sm text-yellow-700 mt-1">Scheduled for next Saturday, 10:00 AM.</p>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h4 className="font-semibold text-blue-800">Annual Sports Day</h4>
                            <p className="text-sm text-blue-700 mt-1">Participation forms are due by Friday.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
