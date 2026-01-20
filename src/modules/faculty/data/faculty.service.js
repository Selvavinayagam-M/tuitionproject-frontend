
import { FACULTY_PAGE_DATA } from './faculty.data';

export const FacultyService = {
    getPageData: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(FACULTY_PAGE_DATA);
            }, 100);
        });
    }
};
