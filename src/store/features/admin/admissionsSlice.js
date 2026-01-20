import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// Mock initial data to simulate DB
const initialLeads = [
    { id: '1', name: 'Rohan Malhotra', phone: '9876543210', class: 'Class 12', source: 'Website', status: 'New', date: '2023-10-25' },
    { id: '2', name: 'Sanya Mir', phone: '9876543211', class: 'Class 9', source: 'Walk-in', status: 'Contacted', date: '2023-10-24' },
    { id: '3', name: 'Amit Kumar', phone: '9876543212', class: 'Class 10', source: 'Referral', status: 'New', date: '2023-10-23' },
    { id: '4', name: 'Kavita Singh', phone: '9876543213', class: 'Class 11', source: 'Website', status: 'Demo', date: '2023-10-22' },
    { id: '5', name: 'Arjun Das', phone: '9876543214', class: 'Class 8', source: 'Facebook', status: 'Admitted', date: '2023-10-20' },
];

export const fetchLeads = createAsyncThunk('admissions/fetchLeads', async (_, { getState }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // In real app: const response = await api.get('/leads');
    // return response.data;
    return initialLeads;
});

const admissionsSlice = createSlice({
    name: 'admissions',
    initialState: {
        leads: [],
        filteredLeads: [],
        loading: false,
        error: null,
        filters: {
            status: 'All',
            class: 'All',
            source: 'All',
        },
        searchQuery: '',
        sortConfig: { key: 'date', direction: 'desc' },
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
        },
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
        },
        setSort: (state, action) => {
            state.sortConfig = action.payload;
            state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
        },
        updateLeadStatus: (state, action) => {
            const { id, status } = action.payload;
            const leadIndex = state.leads.findIndex(l => l.id === id);
            if (leadIndex !== -1) {
                state.leads[leadIndex].status = status;
                state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
            }
        },
        addLead: (state, action) => {
            state.leads.unshift(action.payload);
            state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leads = action.payload;
                state.filteredLeads = applyFilters(state.leads, state.filters, state.searchQuery, state.sortConfig);
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Helper to filter and sort
const applyFilters = (data, filters, query, sortConfig) => {
    let result = [...data];

    // 1. Search
    if (query) {
        const lowerQuery = query.toLowerCase();
        result = result.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.phone.includes(query)
        );
    }

    // 2. Filters
    if (filters.status !== 'All') {
        result = result.filter(item => item.status === filters.status);
    }
    if (filters.class !== 'All') {
        result = result.filter(item => item.class === filters.class);
    }
    if (filters.source !== 'All') {
        result = result.filter(item => item.source === filters.source);
    }

    // 3. Sort
    if (sortConfig.key) {
        result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    }

    return result;
};

export const { setSearchQuery, setFilter, setSort, updateLeadStatus, addLead } = admissionsSlice.actions;
export default admissionsSlice.reducer;
