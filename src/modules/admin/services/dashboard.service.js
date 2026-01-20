import { dashboardStats, revenueData, admissionsData, attendanceData } from '../data/dashboard.data';

export const dashboardService = {
    getStats: async () => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(dashboardStats), 500);
        });
    },
    getRevenue: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(revenueData), 500);
        });
    },
    getAdmissions: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(admissionsData), 500);
        });
    },
    getAttendance: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(attendanceData), 500);
        });
    }
};
