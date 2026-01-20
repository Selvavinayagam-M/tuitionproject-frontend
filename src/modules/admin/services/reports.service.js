import { reportData } from '../data/reports.data';

export const reportsService = {
    getFinancialReport: async () => {
        return new Promise((resolve) => setTimeout(() => resolve(reportData), 500));
    }
};
