
import { RESULTS_PAGE_DATA } from './results.data';

export const ResultsService = {
    getPageData: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(RESULTS_PAGE_DATA);
            }, 100);
        });
    },
    // Simulate filtering on the server/service side if needed, or just return all for client filtering
    getResults: async (year, standard) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // Return all for now, component handles filtering if logic is simple 
                // or we can implement filtering here. The original code mocked it.
                resolve(RESULTS_PAGE_DATA.results);
            }, 100);
        });
    }
};
