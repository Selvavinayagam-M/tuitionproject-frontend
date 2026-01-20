import { admissionsData } from '../data/admissions.data';

export const admissionsService = {
    getAll: async () => {
        return new Promise((resolve) => setTimeout(() => resolve(admissionsData), 600));
    },
    updateStatus: async (id, status) => {
        console.log("Mock Update Admission Status:", id, status);
        return Promise.resolve(true);
    }
};
