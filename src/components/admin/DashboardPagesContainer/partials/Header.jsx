import React from "react";
import { Box } from "@mui/system";
import { Button, IconButton } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/reducers/authReducer";

const Header = ({ toggleNav }) => {
    const dispatch = useDispatch();
    
    const submitLogout = () => {
        dispatch(logout());
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            minHeight={50}
            borderBottom={1}
            borderColor="lightgray"
            backgroundColor="white"
        >
            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
            >
                <Box marginLeft="0.5rem">    
                    <IconButton 
                        onClick={() => toggleNav( prev => !prev )}
                    >
                        <Menu/>
                    </IconButton>
                </Box>
            </Box>
            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
            >
                <Box marginRight="0.5rem">
                    <Button 
                        variant="contained"
                        color="error" 
                        onClick={submitLogout}
                        endIcon={<Logout/>}
                    >
                        Log out
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
