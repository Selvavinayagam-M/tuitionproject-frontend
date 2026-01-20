import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// Mock Data
const initialFees = [
    { id: 'INV-001', student: 'Aarav Gupta', date: '2023-10-01', amount: 5000, type: 'Tuition', status: 'Paid' },
    { id: 'INV-002', student: 'Ishita Sharma', date: '2023-10-05', amount: 8000, type: 'Exam', status: 'Pending' },
    { id: 'INV-003', student: 'Rahul Verma', date: '2023-09-28', amount: 5000, type: 'Tuition', status: 'Overdue' },
    { id: 'INV-004', student: 'Sneha Patel', date: '2023-10-10', amount: 4500, type: 'Tuition', status: 'Paid' },
];

export const fetchFees = createAsyncThunk('fees/fetchFees', async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return initialFees;
});

const feesSlice = createSlice({
    name: 'fees',
    initialState: {
        list: [],
        filteredList: [],
        loading: false,
        filters: { status: 'All', type: 'All' },
        searchQuery: '',
        sortConfig: { key: 'date', direction: 'desc' },
        stats: { collected: 125000, pending: 45000, overdue: 12000 }
    },
    reducers: {
        setSearch: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        setSort: (state, action) => {
            state.sortConfig = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        markAsPaid: (state, action) => {
            const index = state.list.findIndex(f => f.id === action.payload);
            if (index !== -1) {
                state.list[index].status = 'Paid';
                state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFees.fulfilled, (state, action) => {
            state.list = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            state.loading = false;
        }).addCase(fetchFees.pending, (state) => {
            state.loading = true;
        });
    }
});

const applyFilters = (data, filters, query, sortConfig) => {
    let result = [...data];
    if (query) {
        const q = query.toLowerCase();
        result = result.filter(f => f.student.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
    }
    if (filters.status !== 'All') result = result.filter(f => f.status === filters.status);
    if (filters.type !== 'All') result = result.filter(f => f.type === filters.type);

    if (sortConfig.key) result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    return result;
};

export const { setSearch, setFilter, setSort, markAsPaid } = feesSlice.actions;
export default feesSlice.reducer;
