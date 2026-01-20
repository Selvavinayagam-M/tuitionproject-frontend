import api from './api';

const teacherService = {
    // Academic
    getDashboardData: async () => {
        const response = await api.get('/teacher/dashboard');
        return response.data.data;
    },
    getBatches: async () => {
        const response = await api.get('/teacher/batches');
        return response.data.data;
    },
    getSubjects: async () => {
        const response = await api.get('/teacher/subjects');
        return response.data.data;
    },

    // Attendance
    markAttendance: async (data) => {
        const response = await api.post('/teacher/attendance', data);
        return response.data.data;
    },
    getAttendanceHistory: async (batchId) => {
        const response = await api.get(`/teacher/attendance/${batchId}`);
        return response.data.data;
    },

    // CMS (Assignments & Exams)
    createAssignment: async (data) => {
        const response = await api.post('/teacher/assignments', data);
        return response.data.data;
    },
    getAssignments: async () => {
        const response = await api.get('/teacher/assignments');
        return response.data.data;
    },
    createExam: async (data) => {
        const response = await api.post('/teacher/exams', data);
        return response.data.data;
    },

    // Student Management
    getStudents: async () => {
        const response = await api.get('/teacher/students');
        return response.data.data;
    },
    addStudentToBatch: async (data) => { // { studentId, batchId }
        const response = await api.post('/teacher/students/add-batch', data);
        return response.data;
    },
    removeStudentFromBatch: async (data) => {
        const response = await api.post('/teacher/students/remove-batch', data);
        return response.data;
    },

    // Mock Batch
    createMockBatch: async (data) => {
        const response = await api.post('/teacher/batches/mock', data);
        return response.data;
    },
    deleteBatch: async (id) => {
        const response = await api.delete(`/teacher/batches/${id}`);
        return response.data;
    },

    // Settings
    updateSettings: async (data) => {
        const response = await api.put('/teacher/settings', data);
        return response.data;
    }
};

export default teacherService;
