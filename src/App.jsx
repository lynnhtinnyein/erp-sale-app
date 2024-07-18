import { Box } from "@mui/system";
import { RouterOutlet } from "./router";
import useWindowResize from "./hooks/useWindowResize";
import useLocalDB from "./hooks/useLocalDB";

const App = () => {
    const DB = useLocalDB();
    DB.seed();
    useWindowResize();

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
