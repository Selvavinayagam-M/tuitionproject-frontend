import api from './api';

const adminService = {
    // Stats
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data.data;
    },

    // User Management
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    // Course Management (Reusing Academic APIs but could be specific)
    // Batch Management
    // ...
};

export default adminService;
