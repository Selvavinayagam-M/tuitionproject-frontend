import { adminService } from '../../../../services/admin.service'; // Adjust import if default export
// Actually I exported generic default in step 648: export default adminService;
import adminService from '../../../../services/admin.service';
import { FiUsers, FiCreditCard, FiBriefcase, FiAward } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import AdmissionsChart from '../components/dashboard/AdmissionsChart';
import AttendanceChart from '../components/dashboard/AttendanceChart';

const DashboardPage = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Keep charts empty or mock for now as backend doesn't support them yet
    const [revenue, setRevenue] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch real stats
                const data = await adminService.getStats();

                // Map backend data to UI format
                // Data: { totalStudents, totalTeachers, totalRevenue, activeBatches }
                const formattedStats = [
                    { title: 'Total Students', value: data.totalStudents, icon: 'Users', trend: 'up', trendValue: '+5%' },
                    { title: 'Total Teachers', value: data.totalTeachers, icon: 'Briefcase', trend: 'neutral', trendValue: '0%' },
                    { title: 'Total Revenue', value: `₹${data.totalRevenue}`, icon: 'CreditCard', trend: 'up', trendValue: '+12%' },
                    { title: 'Active Batches', value: data.activeBatches, icon: 'GraduationCap', trend: 'up', trendValue: '+2' }
                ];

                setStats(formattedStats);

                // Mock Charts for Demo Visuals (since backend chart APIs aren't ready)
                setRevenue([
                    { month: 'Jan', revenue: 45000 },
                    { month: 'Feb', revenue: 52000 },
                    { month: 'Mar', revenue: 48000 },
                    { month: 'Apr', revenue: 61000 },
                    { month: 'May', revenue: 55000 },
                    { month: 'Jun', revenue: 67000 },
                ]);
                setAdmissions([
                    { month: 'Jan', admissions: 12 },
                    { month: 'Feb', admissions: 19 },
                    { month: 'Mar', admissions: 15 },
                    { month: 'Apr', admissions: 22 },
                ]);
                setAttendance([
                    { day: 'Mon', present: 85 },
                    { day: 'Tue', present: 88 },
                    { day: 'Wed', present: 82 },
                    { day: 'Thu', present: 90 },
                    { day: 'Fri', present: 87 },
                ]);

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-6">Loading Dashboard...</div>;

    const iconMap = {
        Users: FiUsers,
        CreditCard: FiCreditCard,
        Briefcase: FiBriefcase,
        GraduationCap: FiAward // Using Award as fallback/equivalent
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        {...stat}
                        icon={iconMap[stat.icon]}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <RevenueChart data={revenue} />
                <AdmissionsChart data={admissions} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1">
                    <AttendanceChart data={attendance} />
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
                    <p className="text-gray-500">No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
