import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import uiReducer from "./reducers/uiReducer";

const combinedReduers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

export const store = configureStore({
    reducer: combinedReduers,
});
