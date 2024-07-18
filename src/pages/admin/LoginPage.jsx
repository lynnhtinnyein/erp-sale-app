import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/authReducer";

const LoginPage = () => {
    const dispatch = useDispatch();

    const submitLogin = () => {
        dispatch(login());
    }

    return (
        <Box
            flexGrow={1}
            display="flex"
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
                maxWidth={400}
            >
                <Typography typography="h2" align="center">Login</Typography>
                <Box
                    component={Stack}
                    spacing={2}
                    autoComplete="off"
                >
                    <TextField 
                        name="username" 
                        label="Username" 
                        variant="outlined" 
                        value="demouser"
                        disabled
                    />
                    <TextField 
                        name="password" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        value="demouser"
                        disabled
                    />
                </Box>

                <Button
                    size="large"
                    color="primary"
                    onClick={submitLogin}
                    variant="contained"
                >
                    <span>Continue</span>
                </Button>
            </Paper>
        </Box>
    )
}

export default LoginPage;