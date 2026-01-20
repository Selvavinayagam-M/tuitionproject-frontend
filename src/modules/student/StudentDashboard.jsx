import React from 'react';
import { useSelector } from 'react-redux';
import { dashboardStats, studentProfile, notifications, examSchedule } from './data/student.data';
import studentService from '../../services/student.service';
import { FiBookOpen, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, subtext, icon, color }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
        <div className="z-10">
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
        <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600 text-xl z-10 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-${color}-50 rounded-full opacity-50`}></div>
    </div>
);

const StudentDashboard = () => {
    const authUser = useSelector(state => state.auth.user);
    const [stats, setStats] = React.useState(dashboardStats);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const data = await studentService.getDashboardStats();
                setStats(data.stats);
                // Handle schedule or other data if returned
            } catch (err) {
                console.error("Dashboard Load Error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, <span className="text-blue-600">{authUser?.name?.split(' ')[0] || studentProfile.name.split(' ')[0]}</span>! 👋
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Here's what's happening with your courses today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 font-medium">Batch</p>
                        <p className="text-sm font-bold text-gray-800">{authUser?.batch || studentProfile.batch}</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Attendance"
                    value={`${stats.attendancePercentage}%`}
                    subtext="Keep it up!"
                    icon={<FiCheckCircle />}
                    color="green"
                />
                <StatCard
                    title="Classes Attended"
                    value={stats.classesAttended}
                    subtext="Total Sessions"
                    icon={<FiBookOpen />}
                    color="blue"
                />
                <StatCard
                    title="Upcoming Test"
                    value={stats.nextTest?.subject || "None"}
                    subtext={stats.nextTest ? `${stats.nextTest.date}` : "Relax!"}
                    icon={<FiClock />}
                    color="orange"
                />
                <StatCard
                    title="Pending Fees"
                    value={`₹${stats.pendingFees}`}
                    subtext={stats.pendingFees > 0 ? "Due Soon" : "All Clear"}
                    icon={<FiAlertCircle />}
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Progress & Schedule */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FiTrendingUp className="text-blue-500" /> Performance Trend
                            </h3>
                            <select className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 text-gray-500 bg-gray-50">
                                <option>This Semester</option>
                                <option>Last Semester</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <Line
                                data={{
                                    labels: ['Test 1', 'Test 2', 'Mid-Term', 'Unit 3', 'Pre-Board'],
                                    datasets: [{
                                        label: 'Average Score (%)',
                                        data: [65, 72, 78, 85, 82],
                                        borderColor: 'rgb(59, 130, 246)',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        tension: 0.4,
                                        fill: true
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true, max: 100 } }
                                }}
                            />
                        </div>
                    </div>

                    {/* Upcoming Exams Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Upcoming Exams</h3>
                        <div className="space-y-4">
                            {examSchedule.map((exam) => (
                                <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                                            <span className="text-xs font-bold text-gray-400 uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-lg font-bold text-gray-800">{new Date(exam.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{exam.subject}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{exam.type}</span>
                                                <span>•</span>
                                                <span>{exam.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Syllabus</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column: Notifications & Announcements */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Notifications</h3>
                        <div className="space-y-4">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="flex gap-3">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'exam' ? 'bg-orange-500' :
                                        notif.type === 'fee' ? 'bg-red-500' : 'bg-blue-500'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm text-gray-700 leading-snug">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">View All Analysis</button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Study Tip 💡</h3>
                        <p className="text-blue-100 text-sm leading-relaxed mb-4">
                            "Consistency is key. Instead of cramming, try to study for 30 minutes every day to retain information better."
                        </p>
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full backdrop-blur-sm">
                            More Tips
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
