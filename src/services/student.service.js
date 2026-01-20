import api from './api';

const studentService = {
    getDashboardStats: async () => {
        const response = await api.get('/student/dashboard');
        return response.data.data;
    },
    getMyAttendance: async () => {
        const response = await api.get('/student/attendance');
        return response.data.data;
    },
    getAssignments: async () => {
        const response = await api.get('/student/assignments');
        return response.data.data;
    },
    getExams: async () => {
        const response = await api.get('/student/exams');
        return response.data.data;
    }
};

export default studentService;
