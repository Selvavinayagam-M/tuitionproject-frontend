import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// Mock Data
const initialStudents = [
    { id: 'ST-1001', name: 'Aarav Gupta', class: 'Class 10', batch: 'Batch A', phone: '9876543210', status: 'Active', admissionDate: '2023-04-15' },
    { id: 'ST-1002', name: 'Ishita Sharma', class: 'Class 12', batch: 'Batch B', phone: '9876543211', status: 'Active', admissionDate: '2023-04-16' },
    { id: 'ST-1003', name: 'Rahul Verma', class: 'Class 10', batch: 'Batch A', phone: '9876543212', status: 'Inactive', admissionDate: '2023-05-01' },
    { id: 'ST-1004', name: 'Sneha Patel', class: 'Class 9', batch: 'Batch C', phone: '9876543213', status: 'Active', admissionDate: '2023-06-10' },
    { id: 'ST-1005', name: 'Vikram Singh', class: 'Class 11', batch: 'Batch B', phone: '9876543214', status: 'Active', admissionDate: '2023-04-20' },
];

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return initialStudents;
});

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        list: [],
        filteredList: [],
        loading: false,
        filters: { class: 'All', batch: 'All', status: 'All' },
        searchQuery: '',
        sortConfig: { key: 'name', direction: 'asc' }
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
        deleteStudent: (state, action) => {
            state.list = state.list.filter(s => s.id !== action.payload);
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.list = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            state.loading = false;
        }).addCase(fetchStudents.pending, (state) => {
            state.loading = true;
        });
    }
});

const applyFilters = (data, filters, query, sortConfig) => {
    let result = [...data];
    if (query) {
        const q = query.toLowerCase();
        result = result.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (filters.class !== 'All') result = result.filter(s => s.class === filters.class);
    if (filters.batch !== 'All') result = result.filter(s => s.batch === filters.batch);
    if (filters.status !== 'All') result = result.filter(s => s.status === filters.status);

    if (sortConfig.key) result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    return result;
};

export const { setSearch, setFilter, setSort, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
