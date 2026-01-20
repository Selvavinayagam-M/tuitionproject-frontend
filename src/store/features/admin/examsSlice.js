import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialExams = [
    { id: 'EX-001', title: 'Physics Mid-Term', class: 'Class 12', batch: 'Batch A', date: '2023-11-15', totalMarks: 100, status: 'Scheduled' },
    { id: 'EX-002', title: 'Maths Weekly Quiz', class: 'Class 10', batch: 'Batch B', date: '2023-11-10', totalMarks: 20, status: 'Completed' },
];

export const fetchExams = createAsyncThunk('exams/fetch', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return initialExams;
});

const examsSlice = createSlice({
    name: 'exams',
    initialState: {
        list: [],
        filteredList: [],
        loading: false,
        filters: { class: 'All', status: 'All' },
        searchQuery: '',
        sortConfig: { key: 'date', direction: 'asc' }
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
        addExam: (state, action) => {
            state.list.push({ ...action.payload, id: `EX-${Math.floor(Math.random() * 1000)}`, status: 'Scheduled' });
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
        },
        updateStatus: (state, action) => {
            const exam = state.list.find(e => e.id === action.payload.id);
            if (exam) {
                exam.status = action.payload.status;
                state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExams.fulfilled, (state, action) => {
            state.list = action.payload;
            state.filteredList = applyFilters(state.list, state.filters, state.searchQuery, state.sortConfig);
            state.loading = false;
        });
    }
});

const applyFilters = (data, filters, query, sortConfig) => {
    let result = [...data];
    if (query) result = result.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
    if (filters.class !== 'All') result = result.filter(e => e.class === filters.class);
    if (filters.status !== 'All') result = result.filter(e => e.status === filters.status);
    if (sortConfig.key) result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    return result;
};

export const { setSearch, setFilter, addExam, updateStatus } = examsSlice.actions;
export default examsSlice.reducer;
