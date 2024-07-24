import { Button, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { FilterAltOff, Receipt, Search, Send } from "@mui/icons-material";
import useLocalDB from "../../hooks/useLocalDB";
import useDateParser from "../../hooks/useDateParser";
import WarningMessages from "../../components/admin/WarningMessages";
import InvoiceModal from "../../components/admin/InvoiceModal";
import moment from "moment";
import { useSnackbar } from "notistack";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";

const ActionButton = ({ 
    order,
    status,
    onConfirmOrder,
    onConfirmPayment,
    onSendInvoice
}) => {
    const buttonPropsMap = {
        'created': {
            icon: null,
            color: 'success',
            text: 'Confirm And Deliver',
            action: () => onConfirmOrder(order.id)
        },
        'delivered': {
            icon: <Send/>,
            color: 'primary',
            text: 'Send Invoice',
            action: () => onSendInvoice(order.id)
        },
        'invoice sent': {
            icon: null,
            color: 'success',
            text: 'Confirm Payment',
            action: () => onConfirmPayment(order)
        }
    }

    const buttonProps = buttonPropsMap[status];

    if(!buttonProps) return null;

    return (
        <Button
            variant="contained"
            size="small"
            color={buttonProps.color}
            startIcon={buttonProps.icon}
            onClick={buttonProps.action}
        >
            { buttonProps.text }
        </Button>
    )
}

const SaleOrdersPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const DB = useLocalDB();
    const dateParser = useDateParser();

    const { state } = useLocation();
    const orderIdParam = state?.id;
    
    const [orderId, setOrderId] = useState(orderIdParam ?? '');
    const [saleOrders, setSaleOrders] = useState([]);
    const [modalTargetItem, setModalTargetItem] = useState(null); 

    const fetchSaleOrders = (id) => {
        const url = id ? `sale_orders/${id}` : 'sale_orders';
        const res = DB.get(url);
        setSaleOrders(id ? [res] : res);
    }

    useEffect( () => {
        fetchSaleOrders(orderIdParam);
    }, []);

    //methods
        const showInvoice = (saleOrder) => {
            setModalTargetItem(saleOrder);
        }

        const confirmOrder = (saleOrderId) => {
            DB.put(`sale_orders/${saleOrderId}`, {
                status: 'delivered',
                deliveredDate: moment(),
            });
            fetchSaleOrders();
        }

        const sendInvoiceByMail = (saleOrderId) => {
            DB.put(`sale_orders/${saleOrderId}`, {
                status: 'invoice sent'
            });
            fetchSaleOrders();
            setModalTargetItem(null);
            enqueueSnackbar(
                'Invoice sent to customer.',
                { variant: 'success' }
            );
        }

        const confirmPayment = (saleOrder) => {
            DB.put(`sale_orders/${saleOrder.id}`, {
                status: 'paid',
                paymentDate: moment(),
            });
            DB.post('financial_records', {
                ...saleOrder,
                paymentDate: moment()
            });
            fetchSaleOrders();
            enqueueSnackbar(
                'Payment confirmed.',
                { variant: 'success' }
            );
        }

        const handleOrderIdChange = (e) => {
            setOrderId(e.target.value);
        }

        const searchByOrderId = () => {
            fetchSaleOrders(orderId);
        }

        const clearFilters = () => {
            setOrderId('');
            fetchSaleOrders();
        }

        const handleOnKeyUp = (event) => {
            if(event.key === 'Enter'){
                fetchSaleOrders(orderId);
            }
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
                <Box
                    display="flex"
                    flexDirection="column"
                    padding={2}
                    className="space-y-2"
                >
                    <Typography variant="h4">
                        Sale Orders
                    </Typography>
                    <Typography color="gray" variant="h6">
                        Review and confrim orders
                    </Typography>
                </Box>

                <WarningMessages
                    padding={2}
                    messages={[
                        'Note: in demo mode, when an order is confirmed to deliver, it will be assumed as delivered immediately.',
                    ]}
                />

                {/* Search Section */}
                <Box 
                    margin={2}
                    display="flex"
                    className="space-x-1"
                >
                    <TextField
                        fullWidth
                        type="text"
                        variant="filled"
                        label="Search By Order ID"
                        value={orderId}
                        onChange={handleOrderIdChange}
                        onKeyUp={handleOnKeyUp}
                    />
                    <Button
                        variant="contained"
                        onClick={searchByOrderId}
                    >
                        <Search/>
                    </Button>
                    <Button
                        color="inherit"
                        onClick={clearFilters}
                    >
                        <FilterAltOff/>
                    </Button>
                </Box>

                <Table isEmpty={saleOrders.length === 0}>
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
                                Status
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
                                    <Typography 
                                        scope="row"
                                        align="right"
                                        textTransform="capitalize" 
                                        fontSize={13} 
                                        color={row.status === 'created' ? 'error' : 'green'}
                                    >
                                        { row.status === 'created' ? 'Waiting for confirmation' : row.status }
                                    </Typography>
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
                                    <ActionButton 
                                        order={row}
                                        status={row.status}
                                        onConfirmOrder={confirmOrder}
                                        onSendInvoice={sendInvoiceByMail}    
                                        onConfirmPayment={confirmPayment}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <InvoiceModal
                open={Boolean(modalTargetItem)}
                onClose={() => setModalTargetItem(null)}
                data={modalTargetItem}
                onSendEmail={sendInvoiceByMail}
                showActionButtons={modalTargetItem?.status !== 'created'}
            />
        </>
    );
};

export default SaleOrdersPage;
