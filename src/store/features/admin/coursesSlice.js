import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// Mock Data
const initialCourses = [
    { id: 'CRS-001', name: 'Mathematics - Class 10', class: 'Class 10', board: 'CBSE', subject: 'Mathematics', mode: 'Offline', fees: 15000, status: 'Active' },
    { id: 'CRS-002', name: 'Physics - Class 12', class: 'Class 12', board: 'ICSE', subject: 'Physics', mode: 'Hybrid', fees: 18000, status: 'Active' },
    { id: 'CRS-003', name: 'Science Bundle - Class 9', class: 'Class 9', board: 'State', subject: 'Science', mode: 'Online', fees: 10000, status: 'Active' },
    { id: 'CRS-004', name: 'Chemistry - Class 11', class: 'Class 11', board: 'CBSE', subject: 'Chemistry', mode: 'Offline', fees: 16000, status: 'Inactive' },
];

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return initialCourses;
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: [],
        filteredList: [],
        loading: false,
        filters: { class: 'All', mode: 'All' },
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
        addCourse: (state, action) => {
            const newCourse = { ...action.payload, id: `CRS-${Math.floor(Math.random() * 1000)}`, status: 'Active' };
            state.list.unshift(newCourse);
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        deleteCourse: (state, action) => {
            state.list = state.list.filter(c => c.id !== action.payload);
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        toggleStatus: (state, action) => {
            const index = state.list.findIndex(c => c.id === action.payload);
            if (index !== -1) {
                state.list[index].status = state.list[index].status === 'Active' ? 'Inactive' : 'Active';
                state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.list = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            state.loading = false;
        }).addCase(fetchCourses.pending, (state) => {
            state.loading = true;
        });
    }
});

const applyFilters = (data, filters, query, sortConfig) => {
    let result = [...data];
    if (query) {
        const q = query.toLowerCase();
        result = result.filter(c => c.name.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q));
    }
    if (filters.class !== 'All') result = result.filter(c => c.class === filters.class);
    if (filters.mode !== 'All') result = result.filter(c => c.mode === filters.mode);

    if (sortConfig.key) result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    return result;
};

export const { setSearch, setFilter, setSort, addCourse, deleteCourse, toggleStatus } = coursesSlice.actions;
export default coursesSlice.reducer;
