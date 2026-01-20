import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClipboard, FiClock, FiCheckCircle } from 'react-icons/fi';
import teacherService from '../../services/teacher.service';

const MetricCard = ({ title, value, subtext, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
        <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600 text-xl`}>
            {icon}
        </div>
    </div>
);

const TeacherDashboard = () => {
    const authUser = useSelector(state => state.auth.user);
    // Initial state with safe defaults instead of mock data
    const [stats, setStats] = React.useState({
        totalStudents: 0,
        classesToday: 0,
        pendingEvaluations: 0,
        upcomingTests: 0
    });
    const [schedule, setSchedule] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await teacherService.getDashboardData();
                setStats(data.stats);
                setSchedule(data.schedule || []);
            } catch (err) {
                console.error("Dashboard Load Error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    const handleAction = (action) => {
        switch (action) {
            case 'attendance': navigate('/teacher/attendance'); break;
            case 'assessment': navigate('/teacher/assignments'); break;
            case 'grading': navigate('/teacher/grading'); break;
            default: break;
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, <span className="text-blue-600">{authUser?.name}</span>! 👨‍🏫
                </h1>
                <p className="text-gray-500 text-sm mt-1">Here's your schedule and stats for today.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Students"
                    value={stats.totalStudents}
                    subtext="Across 3 Batches"
                    icon={<FiUsers />}
                    color="blue"
                />
                <MetricCard
                    title="Classes Today"
                    value={stats.classesToday}
                    subtext="2 Completed, 2 Left"
                    icon={<FiClock />}
                    color="purple"
                />
                <MetricCard
                    title="Pending Evals"
                    value={stats.pendingEvaluations}
                    subtext="Assignments & Tests"
                    icon={<FiClipboard />}
                    color="orange"
                />
                <MetricCard
                    title="Upcoming Tests"
                    value={stats.upcomingTests}
                    subtext="This Week"
                    icon={<FiCheckCircle />}
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule Panel */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Todays Schedule</h3>
                        <button className="text-blue-600 text-sm font-bold hover:underline">View Full Calendar</button>
                    </div>
                    <div className="space-y-4">
                        {schedule.map((cls) => (
                            <div key={cls.id} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                                <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-sm ${cls.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    <span>{cls.time.split(' ')[0]}</span>
                                    <span className="text-xs">{cls.time.split(' ')[1]}</span>
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="font-bold text-gray-800">{cls.subject}</h4>
                                    <p className="text-sm text-gray-500">{cls.class}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${cls.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                                        }`}>
                                        {cls.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button onClick={() => handleAction('assessment')} className="w-full text-left p-3 rounded-xl bg-orange-50 text-orange-700 font-bold text-sm hover:bg-orange-100 transition-colors flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm"><FiClipboard /></div>
                            Create New Assessment
                        </button>
                        <button onClick={() => handleAction('attendance')} className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm"><FiUsers /></div>
                            Mark Attendance
                        </button>
                        <button onClick={() => handleAction('grading')} className="w-full text-left p-3 rounded-xl bg-purple-50 text-purple-700 font-bold text-sm hover:bg-purple-100 transition-colors flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm"><FiClipboard /></div>
                            Grade Submissions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
