import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme: 'light',
    isMobile: false,
    screenSize: 'lg', // sm, md, lg, xl
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScreenSize: (state, action) => {
            state.screenSize = action.payload;
            state.isMobile = action.payload === 'sm';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const {
    setScreenSize,
    setTheme
} =  uiSlice.actions;

export default uiSlice.reducer;