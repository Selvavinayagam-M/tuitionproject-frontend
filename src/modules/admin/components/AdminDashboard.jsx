
import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaMoneyBillWave, FaClipboardList, FaChartLine } from 'react-icons/fa';
import adminService from '../../../services/admin.service';
import financeService from '../../../services/finance.service';
import { useAdmin } from '../context/AdminContext';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import GlassCard from '../../../shared/components/ui/GlassCard';
import { fadeIn, staggerContainer, fadeSlideUp } from '../../../shared/animations/motionVariants';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const { selectedBranch } = useAdmin();
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const results = await Promise.allSettled([
                    adminService.getStats(),
                    financeService.getRevenueAnalytics()
                ]);

                // Handle Stats
                if (results[0].status === 'fulfilled') {
                    setStats(results[0].value);
                } else {
                    console.error("Failed to load admin stats:", results[0].reason);
                    // Optionally set partial stats or keep null
                }

                // Handle Revenue Analytics
                if (results[1].status === 'fulfilled') {
                    setChartData(results[1].value);
                } else {
                    console.error("Failed to load revenue analytics:", results[1].reason);
                    // Keep chartData null to show "No chart data available" state
                }

            } catch (error) {
                console.error("Unexpected Dashboard Load Error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [selectedBranch]);

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 tracking-tight">
                        Good Morning, Administrator 👋
                    </h1>
                    <div className="text-sm text-gray-500 mt-1">Here's what's happening at <span className="font-bold text-primary-600">{selectedBranch}</span> today.</div>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-gray-900">Today's Date</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </motion.div>

            {/* KPI Cards - Glassmorphism & Varied Sizes */}
            {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <GlassCard variants={fadeSlideUp} className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-600 text-sm font-semibold mb-1">Total Students</p>
                                <h3 className="text-3xl font-bold text-gray-900">{stats.totalStudents}</h3>
                                <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                                    <span className="bg-green-100 px-1.5 py-0.5 rounded-full">+5%</span> from last month
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
                                <FaUserGraduate size={24} />
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variants={fadeSlideUp} className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-600 text-sm font-semibold mb-1">Revenue</p>
                                <h3 className="text-3xl font-bold text-gray-900">₹{((stats?.totalRevenue || 0) / 100000).toFixed(1)}L</h3>
                                <p className="text-xs text-gray-500 mt-2">Target: ₹10L</p>
                            </div>
                            <div className="p-3 bg-green-100 text-green-600 rounded-xl shadow-sm">
                                <FaMoneyBillWave size={24} />
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variants={fadeSlideUp} className="p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-orange-500 text-sm font-semibold mb-1">New Admissions</p>
                                <h3 className="text-3xl font-bold text-gray-900">{stats.newAdmissions}</h3>
                                <p className="text-xs text-gray-400 mt-2">This Month</p>
                            </div>
                            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                                <FaClipboardList size={22} />
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variants={fadeSlideUp} className="p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-red-500 text-sm font-semibold mb-1">Pending Dues</p>
                                <h3 className="text-3xl font-bold text-gray-900">₹{((stats?.pendingDues || 0) / 1000).toFixed(0)}k</h3>
                                <p className="text-xs text-red-500 mt-2">12 Students</p>
                            </div>
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                                <FaChartLine size={22} />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            ) : (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    Unable to load dashboard stats. Please check your connection.
                </div>
            )}

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard variants={fadeSlideUp} className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                        Revenue & Collections
                    </h3>
                    {chartData ? (
                        <div className="h-72">
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'bottom' } },
                                    scales: {
                                        y: { grid: { borderDash: [2, 4], color: '#f3f4f6' } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-400">
                            No chart data available
                        </div>
                    )}
                </GlassCard>

                <GlassCard variants={fadeSlideUp} className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Admission Trends
                    </h3>
                    <div className="h-72">
                        <Line
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                datasets: [{
                                    label: 'New Enquiries',
                                    data: [65, 59, 80, 81, 56, 55],
                                    borderColor: 'rgb(147, 51, 234)',
                                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                                    fill: true,
                                    tension: 0.4
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { position: 'bottom' } },
                                scales: {
                                    y: { grid: { borderDash: [2, 4], color: '#f3f4f6' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
