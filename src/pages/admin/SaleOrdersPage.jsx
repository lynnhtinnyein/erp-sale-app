import { Article, Call, Email } from "@mui/icons-material";
import { Button, ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useLocalDB from "../../hooks/useLocalDB";
import { useEffect, useState } from "react";
import QuotationPreviewModal from "../../components/admin/QuotationPreviewModal";

const SaleOrdersPage = () => {
    const DB = useLocalDB();

    const [saleOrders, setSaleOrders] = useState([]);
    const [previewTarget, setPreviewTarget] = useState(null); 

    const fetchSaleOrders = () => {
        setSaleOrders(DB.get('sale_orders'));
    }

    useEffect( () => {
        fetchSaleOrders();
    }, []);

    //methods
        const handleOnEmail = (opportunityId) => {
            DB.put(`sale_orders/${opportunityId}`, {
                status: 'contacted'
            });
            fetchSaleOrders();
        }

        const handleOnCall = (opportunityId) => {
            DB.put(`sale_orders/${opportunityId}`, {
                status: 'contacted'
            });
            fetchSaleOrders();
        }

        const sendQuotationByMail = () => {
            const opportunityId = previewTarget.id;
            DB.put(`sale_orders/${opportunityId}`, {
                status: 'quotation sent'
            });
            fetchSaleOrders();
            setPreviewTarget(null);
        }

        const showQuotation = (opportunityId) => {
            const opportunity = saleOrders.find( e => e.id === opportunityId);
            const inventory = DB.get('inventory');
            const product = inventory.find( e => e.id === opportunity.productId );
            const previewTargetItem = {...opportunity, product };
            setPreviewTarget(previewTargetItem);
        }

        const markAsAccepted = (opportunityId) => {
            const targetOpportunity = saleOrders.find( e => e.id === opportunityId );
            DB.post('sale_orders', {
                id: uuid(),
                ...targetOpportunity
            });
            DB.delete(`sale_orders/${opportunityId}`);
            fetchSaleOrders();
        }

    return (
        <>
            <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                overflow="hidden"
                className="space-y-3"
            >
                <Box padding={2}>
                    <Typography variant="h4">
                        Opportunity Management
                    </Typography>
                </Box>

                <Box 
                    flexGrow={1} 
                    overflow="auto"
                >
                    <TableContainer component={Paper} square>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold'}}>
                                        Name
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Phone
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Email
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        CompanyName
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        ProductID
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Type
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Date
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Description
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Status
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Contact
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Auto Generated Quotations
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {saleOrders.map((row, index) => (
                                    <TableRow
                                        key={row.id + index}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 }
                                        }}
                                    >
                                        <TableCell scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.phone}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.email}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.companyName}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.productId}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.type}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.date}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.description}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            <Typography textTransform="capitalize" fontSize={13} color={row.status ? 'green' : 'error'}>
                                                { row.status ?? 'Not Contacted'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            <ButtonGroup
                                                display="flex"
                                            >
                                                <IconButton
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOnEmail(row.id)}
                                                >
                                                    <Email />
                                                </IconButton>
                                                <IconButton
                                                    variant="contained"
                                                    size="small"
                                                    color="success"
                                                    onClick={() => handleOnCall(row.id)}
                                                >
                                                    <Call />
                                                </IconButton>
                                            </ButtonGroup>
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="inherit"
                                                onClick={() => showQuotation(row.id)}
                                                startIcon={<Article/>}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            { row.status === 'quotation sent' ? (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="success"
                                                    onClick={() => markAsAccepted(row.id)}
                                                >
                                                    Mark as accepted
                                                </Button>
                                            ) : '' } 
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <QuotationPreviewModal 
                open={Boolean(previewTarget)}
                onClose={() => setPreviewTarget(null)}
                data={previewTarget}
                onSendEmail={sendQuotationByMail}
            />
        </>
    );
};

export default SaleOrdersPage;
