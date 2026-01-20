import api from './api';

const supportService = {
    createTicket: async (data) => {
        const response = await api.post('/support/tickets', data);
        return response.data.data;
    },
    getMyTickets: async () => {
        const response = await api.get('/support/tickets');
        return response.data.data;
    }
};

export default supportService;
