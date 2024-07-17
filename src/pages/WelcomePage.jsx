import { Login } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const WelcomePage = () => {
    return (
            <Box
                display="flex"
                flexGrow={1}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <Paper
                    component={Stack}
                    spacing={4}
                    square={false}
                    elevation={3}
                    padding={4}
                    width="100%"
                    maxWidth={350}
                >
                    <Typography color="primary" typography="h4" align="center">
                        ERP Sale Demo
                    </Typography>
                    <Box component={Stack} spacing={2} autoComplete="off">
                        <Button
                            variant="outlined"
                            endIcon={<Login/>}
                        >
                            Lead Form Page
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<Login/>}
                        >
                            Admin Page
                        </Button>
                    </Box>                    
                </Paper>
            </Box>
    );
};

export default WelcomePage;
