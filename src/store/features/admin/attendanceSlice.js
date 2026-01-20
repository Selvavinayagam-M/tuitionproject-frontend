import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock Data: today's attendance
const initialAttendance = [
    { id: 'ST-1001', name: 'Aarav Gupta', batch: 'Batch A', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { id: 'ST-1002', name: 'Ishita Sharma', batch: 'Batch B', date: new Date().toISOString().split('T')[0], status: 'Absent' },
    { id: 'ST-1003', name: 'Rahul Verma', batch: 'Batch A', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { id: 'ST-1004', name: 'Sneha Patel', batch: 'Batch C', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { id: 'ST-1005', name: 'Vikram Singh', batch: 'Batch B', date: new Date().toISOString().split('T')[0], status: 'Late' },
];

export const fetchAttendance = createAsyncThunk('attendance/fetch', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return initialAttendance;
});

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        list: [],
        loading: false,
        date: new Date().toISOString().split('T')[0],
        selectedBatch: 'All'
    },
    reducers: {
        setDate: (state, action) => { state.date = action.payload; },
        setBatch: (state, action) => { state.selectedBatch = action.payload; },
        markStatus: (state, action) => {
            const { id, status } = action.payload;
            const student = state.list.find(s => s.id === id);
            if (student) student.status = status;
        },
        markAll: (state, action) => {
            state.list.forEach(s => {
                if (state.selectedBatch === 'All' || s.batch === state.selectedBatch) {
                    s.status = action.payload;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAttendance.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
    }
});

export const { setDate, setBatch, markStatus, markAll } = attendanceSlice.actions;
export default attendanceSlice.reducer;
