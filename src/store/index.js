import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import admissionsReducer from './features/admin/admissionsSlice';
import studentsReducer from './features/admin/studentsSlice';
import feesReducer from './features/admin/feesSlice';
import coursesReducer from './features/admin/coursesSlice';
import attendanceReducer from './features/admin/attendanceSlice';
import examsReducer from './features/admin/examsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admissions: admissionsReducer,
        students: studentsReducer,
        fees: feesReducer,
        courses: coursesReducer,
        attendance: attendanceReducer,
        exams: examsReducer,
    },
});
