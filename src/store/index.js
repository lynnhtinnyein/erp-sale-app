import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";

const combinedReduers = combineReducers({
    auth: authReducer,
    //...other reducers
})

export const store = configureStore({
    reducer: combinedReduers,
});
