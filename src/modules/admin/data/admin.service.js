
import { ADMIN_DATA } from './admin.data';

export const AdminService = {
    getReports: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(ADMIN_DATA.reports);
            }, 300); // Slight delay for realism
        });
    }
};
