import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
        }
    }
});

export const {
    setScreenSize
} =  uiSlice.actions;

export default uiSlice.reducer;