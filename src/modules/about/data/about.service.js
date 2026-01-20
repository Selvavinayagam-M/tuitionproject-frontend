import { ABOUT_DATA } from './about.data';

export const AboutService = {
    getAboutData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(ABOUT_DATA);
            }, 50);
        });
    }
};
