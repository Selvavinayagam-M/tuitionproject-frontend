import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock User Generator
const generateMockUser = (userData) => ({
    id: `USR-${Math.floor(Math.random() * 1000)}`,
    name: userData.name || `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} User`,
    email: userData.email,
    role: userData.role,
    phone: userData.phone || '',
    grade: userData.grade || '',
    token: `mock-jwt-token-${userData.role}-${Date.now()}`
});

// Async Thunks
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // For demo/dev purposes, we accept any login if it matches our mock pattern or just succeeds
        // In a real app, this would validate against backend
        // We expect userData to contain { email, password, role, name, phone, etc } based on the new requirements

        const user = generateMockUser({ ...userData, role: userData.role || 'student' });
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Ensure token is also removed
});

// Load user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    role: user ? user.role : null,
    isAuthenticated: !!user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        // Manual login success action if needed explicitly as per prompt
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isSuccess = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.role = action.payload.role;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
            });
    },
});

export const { reset, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
