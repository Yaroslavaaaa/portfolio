import { configureStore } from '@reduxjs/toolkit'
import { projectReducer } from './slices/projects'
import { authReducer } from './slices/auth'


const store = configureStore({
    reducer: {
        projects: projectReducer,
        auth: authReducer,
    }
})


export default store