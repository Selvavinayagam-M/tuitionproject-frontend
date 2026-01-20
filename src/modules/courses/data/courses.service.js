import { COURSES_DATA, COURSES_PAGE_DATA } from './courses.data';

export const CoursesService = {
    getCourses: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(COURSES_DATA);
            }, 50);
        });
    },
    getPageData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(COURSES_PAGE_DATA);
            }, 20);
        });
    }
};
