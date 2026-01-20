import { invoicesData } from '../data/fees.data';

export const feesService = {
    getAllInvoices: async () => {
        return new Promise((resolve) => setTimeout(() => resolve(invoicesData), 500));
    }
};
