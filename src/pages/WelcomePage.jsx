import { Login } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../dummy-data/dummyProducts";
import ProductItem from "../components/ProductItem";

const WelcomePage = () => {
    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate('admin/login');
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
                    endIcon={<Login/>}
                    onClick={navigateToAdminPage}
                >
                    Admin Page
                </Button>
            </Box>
            
            <Box
                flexGrow={1}
                overflow="auto"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                >
                    { dummyProducts.map( product => 
                        <ProductItem
                            key={product.id}
                            {...product}
                        />
                    )}

                </Box>
            </Box>
        </Box>
    );
};

export default WelcomePage;
