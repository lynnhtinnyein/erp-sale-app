import { Box } from "@mui/system";
import DashboardItem from "../../components/admin/DashboardItem";
import { v4 as uuid } from "uuid";
import useLocalDB from "../../hooks/useLocalDB";
import { ContactMail, Inventory, PriceChange, ShoppingCart, TrendingUp } from "@mui/icons-material";
    
const DashboardPage = () => {
    const DB = useLocalDB();

    const dashboardItems = [
        {
            id: uuid(),
            name: 'Inventory',
            path: 'inventory',
            count: DB.get('inventory').length,
            icon: <Inventory sx={{ fontSize: 50}}/>,
            color: '#1976d2'
        },
        {
            id: uuid(),
            name: 'Leads',
            path: 'leads',
            count: DB.get('leads').length,
            icon: <ContactMail sx={{ fontSize: 50}}/>,
            color: '#9c27b0'
        },
        {
            id: uuid(),
            name: 'Opportunities',
            path: 'opportunities',
            count: DB.get('opportunities').length,
            icon: <TrendingUp sx={{ fontSize: 50}}/>,
            color: '#d32f2f'
        },
        {
            id: uuid(),
            name: 'Sale Orders',
            path: 'sale_orders',
            count: DB.get('sale_orders').length,
            icon: <ShoppingCart sx={{ fontSize: 50}}/>,
            color: '#2e7d32'
        },
        {
            id: uuid(),
            name: 'Financial Records',
            path: 'financial_records',
            count: DB.get('financial_records').length,
            icon: <PriceChange sx={{ fontSize: 50}}/>,
            color: '#ed6c02'
        },
    ];

    return (
        <Box
            flexGrow={1}
            overflow="auto"
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                flexWrap="wrap"
            >
                { dashboardItems.map( item =>
                    <DashboardItem
                        key={item.id}
                        {...item}
                    />
                )}
                
            </Box>
        </Box>
    );
};

export default DashboardPage;
