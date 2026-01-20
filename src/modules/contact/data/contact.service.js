
import { CONTACT_PAGE_DATA } from './contact.data';

export const ContactService = {
    getPageData: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(CONTACT_PAGE_DATA);
            }, 100);
        });
    }
};
