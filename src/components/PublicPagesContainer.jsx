import { Login } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const PublicPagesContainer = ({ children }) => {
    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate('/admin/login');
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
                borderBottom={1}
                borderColor="lightgray"
            >
                <Typography color="primary" variant="h6">
                    ERP Sale Demo
                </Typography>
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
