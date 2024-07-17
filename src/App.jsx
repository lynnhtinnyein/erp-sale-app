import { Box } from "@mui/system";
import { RouterOutlet } from "./router";
import { useEffect } from "react";
import useWindowResize from "./hooks/useWindowResize";
import HeaderBar from "./components/HeaderBar";

const App = () => {
    useWindowResize();

    return (
        <Box
            display="flex"
            flexDirection="column"
            position="fixed"
            top={0}
            right={0}
            left={0}
            bottom={0}
        >
            <HeaderBar/>
            <Box
                flexGrow={1}
                display="flex"
                overflow="hidden"
            >
                <RouterOutlet/>
            </Box>
        </Box>
    );
}

export default App;
