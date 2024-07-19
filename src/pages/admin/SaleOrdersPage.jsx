import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useLocalDB from "../../hooks/useLocalDB";
import { useEffect, useState } from "react";
import useDateParser from "../../hooks/useDateParser";
import WarningMessages from "../../components/admin/WarningMessages";
import { Receipt } from "@mui/icons-material";
import InvoiceModal from "../../components/admin/InvoiceModal";
import moment from "moment";
import { v4 as uuid } from "uuid";

const SaleOrdersPage = () => {
    const DB = useLocalDB();
    const dateParser = useDateParser();

    const [saleOrders, setSaleOrders] = useState([]);
    const [modalTargetItem, setModalTargetItem] = useState(null); 

    const fetchSaleOrders = () => {
        setSaleOrders(DB.get('sale_orders'));
    }

    useEffect( () => {
        fetchSaleOrders();
    }, []);

    //methods
        const showInvoice = (saleOrder) => {
            setModalTargetItem(saleOrder);
        }

        const confirmOrder = (saleOrderId) => {
            const targetSaleOrder = saleOrders.find( e => e.id === saleOrderId );
            DB.post('delivered_orders', {
                id: uuid(),
                ...targetSaleOrder
            });
            const newStockCount = targetSaleOrder.product.stock - targetSaleOrder.quantity;
            DB.put(`inventory/${targetSaleOrder.product.id}`, {
                stock: newStockCount,
                updatedAt: moment()
            })
            DB.delete(`sale_orders/${saleOrderId}`);
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
                        Sale Orders
                    </Typography>
                </Box>

                <WarningMessages
                    padding={2}
                    messages={[
                        'When an order is confirmed to deliver, the invoice will be sent to customer via provided email automatically.',
                    ]}
                />

                <Box 
                    flexGrow={1} 
                    overflow="auto"
                >
                    <TableContainer component={Paper} square>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold'}}>
                                        OrderID
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Customer Name
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Customer Phone
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Customer Email
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Product ID
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Product Name
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Product Price
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Product Stock
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Order Qty
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        TotalPrice
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Delivery Address
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Delivery Date
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Order Created Date
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                        Auto Generated Invoice
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
                                            {row.id}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.customer.name}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.customer.phone}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.customer.email}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.product.id}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.product.name}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            ${row.product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.product.stock}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.quantity}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            ${(row.product.price * row.quantity).toFixed(2)}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {row.deliveryAddress}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {dateParser.getDate(row.deliveryDate)}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            {dateParser.getDate(row.createdDate)}
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="inherit"
                                                onClick={() => showInvoice(row)}
                                                startIcon={<Receipt/>}
                                            >
                                                View Invoice
                                            </Button>
                                        </TableCell>
                                        <TableCell scope="row" align="right">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                onClick={() => confirmOrder(row.id)}
                                            >
                                                Confirm And Deliver
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <InvoiceModal
                open={Boolean(modalTargetItem)}
                onClose={() => setModalTargetItem(null)}
                data={modalTargetItem}
                showActionButtons={false}
            />
        </>
    );
};

export default SaleOrdersPage;
