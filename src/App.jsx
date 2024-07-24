import { Box } from "@mui/system";
import { RouterOutlet } from "./router";
import useWindowResize from "./hooks/useWindowResize";
import useLocalDB from "./hooks/useLocalDB";
import { useEffect, useMemo } from "react";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

const App = () => {
    const DB = useLocalDB();
    const { theme } = useSelector( state => state.ui );

    useWindowResize();

    useEffect( () => {
        DB.seed();
    },[]);

    const muiTheme = useMemo( () => {
        return createTheme({
            palette: {
                mode: theme
            }
        })
    }, [theme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <Box
                display="flex"
                position="fixed"
                top={0}
                right={0}
                left={0}
                bottom={0}
                component={Paper}
                square
            >
                <RouterOutlet/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
