import React from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup, IconButton, Paper } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/reducers/authReducer";
import { setTheme } from "../../../../store/reducers/uiReducer";

const Header = ({ toggleNav }) => {
    const { theme } = useSelector( state => state.ui );
    const dispatch = useDispatch();

    const submitLogout = () => {
        dispatch(logout());
    }

    const changeTheme = (newTheme) => {
        dispatch(setTheme(newTheme))
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            minHeight={50}
            borderBottom={1}
            borderColor={ theme === 'light' ? 'lightgray' : 'black '}
            className="py-2"
        >
            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                className="w-1/3"
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
                justifyContent="center"
                alignItems="center"
                className="w-1/3"
            >
                <ButtonGroup
                    color={ theme === 'light' ? 'info' : 'warning'}
                >
                    <Button
                        onClick={() => changeTheme('light')}
                        variant={theme === 'light' ? 'contained' : 'outlined'}
                    >
                        Light
                    </Button>
                    <Button
                        onClick={() => changeTheme('dark')}
                        variant={theme === 'dark' ? 'contained' : 'outlined'}
                    >
                        Dark
                    </Button>
                </ButtonGroup>
            </Box>

            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                className="w-1/3"
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
