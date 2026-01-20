import { examsData } from '../data/exams.data';

export const examsService = {
    getAll: async () => {
        return new Promise((resolve) => setTimeout(() => resolve(examsData), 500));
    }
};
