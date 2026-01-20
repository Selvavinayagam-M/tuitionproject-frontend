
import { ADMISSIONS_PAGE_DATA } from './admissions.data';

export const AdmissionsService = {
    getPageData: async () => {
        // Simulate API delay
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(ADMISSIONS_PAGE_DATA);
            }, 100);
        });
    }
};
