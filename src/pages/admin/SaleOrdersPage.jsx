import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Receipt, Send } from "@mui/icons-material";
import useLocalDB from "../../hooks/useLocalDB";
import useDateParser from "../../hooks/useDateParser";
import WarningMessages from "../../components/admin/WarningMessages";
import InvoiceModal from "../../components/admin/InvoiceModal";
import moment from "moment";

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
                    </TableContainer>
                </Box>
            </Box>
            <InvoiceModal
                open={Boolean(modalTargetItem)}
                onClose={() => setModalTargetItem(null)}
                data={modalTargetItem}
                onSendEmail={sendInvoiceByMail}
            />
        </>
    );
};

export default SaleOrdersPage;
