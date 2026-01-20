import React, { useState } from 'react';
import { parentProfile, childrenData, notifications } from './data/parent.data';
import { FiUsers, FiCalendar, FiTrendingUp, FiAlertCircle, FiChevronDown, FiClock } from 'react-icons/fi';

const MetricCard = ({ title, value, subtext, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
        <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600 text-xl`}>
            {icon}
        </div>
    </div>
);

const ParentDashboard = () => {
    // Logic to switch between children. For this iteration, we default to the first child but UI allows 'switching'.
    const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
    const selectedChild = childrenData.find(c => c.id === selectedChildId);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header with Child Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Hello, <span className="text-orange-600">{parentProfile.name.split(' ')[0]}</span>! 👋
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Here is the latest update for your children.</p>
                </div>

                <div className="relative group">
                    <button className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 transition-colors">
                        <img src={selectedChild.avatar} alt="Child" className="w-8 h-8 rounded-full" />
                        <div className="text-left">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Viewing Report For</p>
                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                {selectedChild.name} <FiChevronDown />
                            </p>
                        </div>
                    </button>
                    {/* Dropdown for switching children */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block z-20">
                        {childrenData.map(child => (
                            <div
                                key={child.id}
                                onClick={() => setSelectedChildId(child.id)}
                                className={`p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${selectedChildId === child.id ? 'bg-orange-50' : ''}`}
                            >
                                <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{child.name}</p>
                                    <p className="text-xs text-gray-500">{child.grade}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats for Selected Child */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Attendance"
                    value={`${selectedChild.attendance}%`}
                    subtext="This Month"
                    icon={<FiCalendar />}
                    color="green"
                />
                <MetricCard
                    title="Recent Grade"
                    value={selectedChild.recentGrade.score}
                    subtext={`${selectedChild.recentGrade.subject} • ${selectedChild.recentGrade.date}`}
                    icon={<FiTrendingUp />}
                    color="blue"
                />
                <MetricCard
                    title="Next Fee Due"
                    value={`₹${selectedChild.pendingFees}`}
                    subtext={selectedChild.pendingFees > 0 ? "Due Soon" : "All Paid"}
                    icon={<FiAlertCircle />}
                    color={selectedChild.pendingFees > 0 ? "red" : "green"}
                />
                <MetricCard
                    title="Upcoming Exam"
                    value={selectedChild.nextExam.date.split(' ')[0]}
                    subtext={`${selectedChild.nextExam.subject} • ${selectedChild.nextExam.type}`}
                    icon={<FiClock />}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Notifications Panel */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Urgent Notifications</h3>
                    <div className="space-y-4">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'fee' ? 'bg-red-100 text-red-600' :
                                        notif.type === 'exam' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    <FiAlertCircle />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{notif.message}</h4>
                                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                        <span>{notif.date}</span>
                                        <span>•</span>
                                        <span>For: {notif.childBy}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Contact */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-xl mb-2">Need to talk?</h3>
                    <p className="text-orange-100 text-sm mb-6">Schedule a meeting with the class tutor regarding {selectedChild.name}'s performance.</p>
                    <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl shadow-sm hover:bg-orange-50 transition-colors">
                        Request Call Back
                    </button>
                    <button className="w-full mt-3 bg-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-colors">
                        Message Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
