import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./partials/Header";
import NavDrawer from "./partials/NavDrawer";

const DashboardPagesContainer = ({ children }) => {
    const [showNav, setShowNav] = useState(false);
    const { isMobile } = useSelector( state => state.ui );

    useEffect(() => {
        if (isMobile) setShowNav(false);
    }, [isMobile]);

    return (
        <Box
            display="flex"
            flexDirection="row"
            position="fixed"
            backgroundColor="#f3f4f6"
            top={0}
            right={0}
            left={0}
            bottom={0}
        >
            <NavDrawer show={showNav} onClose={() => setShowNav(false)} />
            <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                overflow="hidden"
            >
                <Header toggleNav={setShowNav} />
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="row"
                    overflow="hidden"
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardPagesContainer;
