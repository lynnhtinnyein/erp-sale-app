import { Box } from "@mui/system";
import { RouterOutlet } from "./router";
import useWindowResize from "./hooks/useWindowResize";
import useLocalDB from "./hooks/useLocalDB";
import { useEffect } from "react";

const App = () => {
    const DB = useLocalDB();
    useWindowResize();

    useEffect( () => {
        DB.seed();
    },[]);
    
    return (
        <Box
            display="flex"
            position="fixed"
            top={0}
            right={0}
            left={0}
            bottom={0}
        >
            <RouterOutlet/>
        </Box>
    );
}

export default App;
