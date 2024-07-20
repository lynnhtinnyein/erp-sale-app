import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const snackbarProps = {
    maxSnack: 3,
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
    },
    autoHideDuration: 3000
} 

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider {...snackbarProps} >
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
);
