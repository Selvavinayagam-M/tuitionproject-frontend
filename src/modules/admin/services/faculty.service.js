import api from '../../../services/api';

export const facultyService = {
    getAll: async () => {
        const response = await api.get('/admin/teachers');
        return response.data.data;
    }
};
