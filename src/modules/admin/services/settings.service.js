import { settingsData } from '../data/settings.data';

export const settingsService = {
    getSettings: async () => {
        return new Promise((resolve) => setTimeout(() => resolve(settingsData), 300));
    },
    updateSettings: async (newSettings) => {
        return Promise.resolve({ ...settingsData, ...newSettings });
    }
};
