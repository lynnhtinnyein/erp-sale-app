import { Box } from "@mui/system";
import { RouterOutlet } from "./router";
import { useEffect } from "react";
import useWindowResize from "./hooks/useWindowResize";

const App = () => {
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
