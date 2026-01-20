import { HOME_DATA } from './home.data';

export const HomeService = {
    getHomeData: async () => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(HOME_DATA);
            }, 100);
        });
    }
};
