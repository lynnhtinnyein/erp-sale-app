import { v4 as uuid } from "uuid";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const demoUser = {
                id: uuid(),
                name: 'Demo User'
            }
            localStorage.setItem('user', JSON.stringify(demoUser));
            state.user = demoUser;
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    }
});

export const {
    login,
    logout
} =  authSlice.actions;

export default authSlice.reducer;