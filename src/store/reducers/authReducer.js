import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthChecked: true,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const {
    setIsAuthChecked,
    setUser
} =  authSlice.actions;

export default authSlice.reducer;