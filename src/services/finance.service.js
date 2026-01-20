import api from './api';

const financeService = {
    // Create Stripe Payment Intent
    createOrder: async (feeId) => {
        const response = await api.post('/finance/order', { feeId });
        return response.data.data;
    },

    // Verify Payment (Check Intent Status)
    verifyPayment: async (paymentIntentId, feeId) => {
        const response = await api.post('/finance/verify', { paymentIntentId, feeId });
        return response.data;
    },

    // Get Payment History
    getHistory: async () => {
        const response = await api.get('/finance/history');
        return response.data.data;
    },

    // Get Revenue Analytics
    getRevenueAnalytics: async () => {
        const response = await api.get('/finance/analytics');
        return response.data.data;
    },

    // Get Student Fees (Real Data)
    getStudentFees: async () => {
        const response = await api.get('/student/fees');
        return response.data.data;
    }
};

export default financeService;
