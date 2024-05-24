import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('projects/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});


export const fetchAuthMe = createAsyncThunk('projects/fetchAuthMe', async (params) => {
    const { data } = await axios.get('/auth/profile');
    return data;
});

const initialState = {
        data: null,
        status: 'Loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            });
    },
});

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
