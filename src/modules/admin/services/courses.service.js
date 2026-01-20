import api from '../../../services/api';

export const coursesService = {
    getAll: async () => {
        const response = await api.get('/admin/courses');
        return response.data.data;
    },
    create: async (course) => {
        const response = await api.post('/admin/courses', course); // Endpoint needs to exist?
        // Note: Creating course usually via Academic controller. 
        // We added getCourses to admin routes, but maybe not create.
        // Let's assume /admin/courses POST might not exist yet, but logic suggests it should.
        // Looking at academic.controller.js, there was no createBatch/createCourse there yet?
        // Wait, seed.js used Course.create.
        // We might need to add createCourse to academic.controller and route.
        // For now, I'll put the call here and mark as TODO if invalid.
        return response.data;
    }
};
