import axios from 'axios';

// Create generic axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor (Auth Token)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Response Interceptor (Global Error Handling)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Auto logout on unauthorized - DISABLED FOR DEBUGGING
            console.error("API 401 Unauthorized - Token might be invalid or expired.", error.response.data);
            // localStorage.clear();
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// MOCK DATA GENERATORS (To ensure "Real Feel" without live backend)
// In production, these would be removed and simple API calls used.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
    // DASHBOARD METRICS
    getDashboardStats: async () => {
        await delay(800); // Simulate network latency
        return {
            totalStudents: 1240,
            newAdmissions: 45,
            pendingEnquiries: 12,
            revenueCollected: 850000,
            pendingDues: 120000,
            attendanceRate: 92
        };
    },

    // ADMISSIONS
    getEnquiries: async (filters = {}) => {
        await delay(600);
        // Mocking a filtered query
        return [
            { id: 101, name: "Rahul Singh", phone: "9876543210", class: "Class 10", status: "New", date: "2026-01-05", source: "Website" },
            { id: 102, name: "Priya Sharma", phone: "8765432109", class: "Class 12", status: "Counselling", date: "2026-01-06", source: "Walk-in" },
            { id: 103, name: "Amit Kumar", phone: "7654321098", class: "Class 9", status: "Ready to Pay", date: "2026-01-07", source: "Referral" },
            { id: 104, name: "Sneha Gupta", phone: "6543210987", class: "Class 11", status: "Enrolled", date: "2026-01-04", source: "Website" },
        ].filter(e => filters.status ? e.status === filters.status : true);
    },

    // FINANCE
    getRevenueChartData: async () => {
        await delay(500);
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Revenue (₹)',
                    data: [450000, 520000, 480000, 600000, 580000, 850000],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
                {
                    label: 'Pending (₹)',
                    data: [20000, 15000, 30000, 25000, 40000, 120000],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        };
    }
};

export default api;
