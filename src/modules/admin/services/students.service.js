import api from '../../../services/api';

export const studentsService = {
    getAll: async () => {
        const response = await api.get('/admin/students');
        return response.data.data;
    },
    getById: async (id) => {
        // Assume backend supports this or find from getAll
        const response = await api.get(`/admin/students/${id}`);
        return response.data.data;
    },
    create: async (student) => {
        // Note: Admin student creation likely goes through AuthService execution or /admin/users/create
        // For now, keeping structure but logging warning if endpoint missing
        const response = await api.post('/admin/students', student);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/admin/users/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    }
};
