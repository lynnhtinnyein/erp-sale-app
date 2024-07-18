import { ChevronLeft } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { dashboardDrawerRoutes as routes } from "../../../../router"
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavDrawer = ({ show, onClose }) => {
    const { user } = useSelector( state => state.auth );
    const { isMobile } = useSelector( state => state.ui );
    const location = useLocation();
    const navigate = useNavigate();
    
    const isFloat = useMemo( () => {
        return isMobile
    }, [isMobile]);

    //methods
        const handleOnClickLink = (path) => {
            navigate(path);
            if(path === '/sale' || isMobile){
                onClose();
            }
        }

    return (
        <>
            <Box
                position="fixed"
                top={0}
                right={0}
                bottom={0}
                width={230}
                zIndex={9998}
                left={show ? 0 : -230}
                backgroundColor="white"
                display="flex"
                flexDirection="column"
                className="shadow"
                sx={{
                    transition: "left 300ms",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    borderBottom={1}
                    borderColor="#e5e7eb"
                    justifyContent="space-between"
                    padding="0.5rem"
                >
                    <Typography color="primary" fontSize={20} marginLeft="0.5rem">
                        ERP Sale Demo
                    </Typography>
                    <IconButton onClick={onClose}>
                        <ChevronLeft fontSize="large"/>
                    </IconButton>
                </Box>
                <Box
                    flexGrow={1}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        { routes.map( route => 
                            <ListItem key={route.id}>
                                <ListItemButton
                                    selected={route.path === location.pathname}
                                    onClick={ () => handleOnClickLink(route.path)}
                                >
                                    <ListItemText fontSize={1}>
                                        { route.title }
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </Box>
                </Box>
            </Box>

            { isFloat && show ? (
                <Box
                    position="fixed"
                    zIndex={9997}
                    top={0}
                    bottom={0}
                    right={0}
                    left={0}
                    onClick={onClose}
                />
            ) : ''}
            
            {/* nav spacer */}
            { !isFloat ? (
                <Box
                    minWidth={show ? 230 : 0}
                    sx={{
                        transition: "min-width 300ms",
                    }}
                />
            ) : ''}
        </>
    );
};

export default NavDrawer;
