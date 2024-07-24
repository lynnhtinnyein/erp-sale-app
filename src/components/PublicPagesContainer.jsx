import { Login } from "@mui/icons-material";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../store/reducers/uiReducer";

const PublicPagesContainer = ({ children }) => {
    const { theme } = useSelector( state => state.ui );
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate('/admin/login');
    }

    const navigateToWelcomePage = () => {
        navigate('/');
    }

    const changeTheme = (newTheme) => {
        dispatch(setTheme(newTheme))
    }

    return (
        <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
        >
            <Box
                padding={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                component={Paper}
                square
                borderBottom={1}
                borderColor={ theme === 'light' ? 'white' : 'black '}
            >
                <Typography 
                    color="primary" 
                    variant="h6"
                    onClick={navigateToWelcomePage}
                    className="cursor-pointer"
                >
                    ERP Sale Demo
                </Typography>

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

                <Button
                    variant="contained"
                    endIcon={<Login />}
                    onClick={navigateToAdminPage}
                >
                    Admin Page
                </Button>
            </Box>
            {children}
        </Box>
    );
};

export default PublicPagesContainer;
