import { Box } from "@mui/system";
import dummyProducts from "../dummy-data/dummyProducts";
import ProductItem from "../components/ProductItem";

const WelcomePage = () => {
    return (
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
    );
};

export default WelcomePage;
