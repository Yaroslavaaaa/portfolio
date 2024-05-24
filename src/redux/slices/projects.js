import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const { data } = await axios.get('/projects');
    return data;
});


export const fetchRemoveProject = createAsyncThunk('projects/fetchRemoveProject', async (id) => {
    axios.delete(`/projects/${id}`);
});


const initialState = {
    projects: {
        items: [],
        status: 'Loading'
    }
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get projects
            .addCase(fetchProjects.pending, (state) => {
                state.projects.items = [];
                state.projects.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects.items = action.payload;
                state.projects.status = 'loaded';
            })
            .addCase(fetchProjects.rejected, (state) => {
                state.projects.items = [];
                state.projects.status = 'error';
            })
            //remove projects
            .addCase(fetchRemoveProject.pending, (state, action) => {
                state.projects.items = state.projects.items.filter(obj => obj._id !== action.meta.arg);
            });
    },
});

export const projectReducer = projectSlice.reducer;
