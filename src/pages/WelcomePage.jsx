import { Box } from "@mui/system";
import ProductItem from "../components/ProductItem";
import useLocalDB from "../hooks/useLocalDB";

const WelcomePage = () => {
    const DB = useLocalDB();
    const products = DB.get('inventory');

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
                { products.map( product => 
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
