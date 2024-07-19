import { Button, Dialog, IconButton, Slide } from "@mui/material";
import React, { forwardRef, useRef } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from "@mui/material";
import useDateParser from "../../hooks/useDateParser";
import { Close, Email, Print } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InvoiceModal = ({
    open,
    onClose,
    onSendEmail,
    data,
}) => {

    if(!data) return null;

    const dateParser = useDateParser();
    const headerActionButtonsRef = useRef(null);
    const footerActionButtonsRef = useRef(null);
    const today = new Date();

    const invoiceDetails = {
        date: dateParser.getDate(today),
        paymentTerms: 'Payment due within 30 days.',
        deliveryTerms: 'Delivered within 7 business days.',
        warranty: '1-year warranty on all products.',
        returnPolicy: 'Returns accepted within 30 days.',
    };

    const subTotal = data.product.price * data.quantity;
    const tax = Math.round((subTotal * 5) / 100);
    const totalAmount = subTotal + tax;

    const print = () => {
        //hide on print
        headerActionButtonsRef.current.style.display = 'none';
        footerActionButtonsRef.current.style.display = 'none';

        window.print();

        //re-enable after print
        headerActionButtonsRef.current.style.display = 'flex';
        footerActionButtonsRef.current.style.display = 'flex';
    }
      
    return (
        <Dialog
            open={open}
            fullScreen
            TransitionComponent={Transition}
            onClose={onClose}
        >
            <Box
                display="flex"
                flexDirection="column"
                margin={4}
            >
                <Box
                    ref={headerActionButtonsRef}
                    display="flex"
                    justifyContent="end"
                    marginBottom={3}
                >
                    <IconButton
                        size="large"
                        onClick={onClose}
                    >
                        <Close fontSize="large"/>
                    </IconButton>
                </Box>

                {/* invoice */}
                <Box>
                    <Box 
                        borderBottom={1}
                        borderColor="lightgray"
                        paddingBottom={2}
                        marginBottom={2}
                    >
                        <Typography variant="h4" align="center">
                            ERP Sale Demo
                        </Typography>
                        <Typography align="center">
                            Demo Address
                        </Typography>
                        <Typography align="center">
                            Phone: (123) 456-7890 | Email: demo@erp.com
                        </Typography>
                    </Box>
                    <Box marginBottom={2}>
                        <Typography>
                            Invoice Number: { data.id }
                        </Typography>
                        <Typography>Date: {invoiceDetails.date}</Typography>
                    </Box>
                    <Box marginBottom={2}>
                        <Typography>
                            Customer Name: {data.customer.name}
                        </Typography>
                        <Typography>
                            Customer Phone: {data.customer.phone}
                        </Typography>
                        <Typography>
                            Customer Email: {data.customer.email}
                        </Typography>
                        <Typography>
                            Customer Address: {data.customer.address}
                        </Typography>
                    </Box>
                    <Box marginBottom={2}>
                        <Typography variant="body1">
                            Thank you for your business. Below you will find the detailed invoice for your purchase.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography variant="h6">Products/Services:</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {data.product.name}
                                        </TableCell>
                                        <TableCell>
                                            {data.product.type}
                                        </TableCell>
                                        <TableCell>
                                            {data.quantity}
                                        </TableCell>
                                        <TableCell>
                                            ${data.product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            ${subTotal.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    <Box marginBottom={2}>
                        <Typography variant="h6">Pricing Summary:</Typography>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Subtotal:</Typography>
                            <Typography>${subTotal.toFixed(2)}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Discounts:</Typography>
                            <Typography>
                                $0.00
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Taxes:</Typography>
                            <Typography>
                                ${tax.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            sx={{ mt: 1, fontWeight: "bold" }}
                        >
                            <Typography>Total Amount:</Typography>
                            <Typography>${totalAmount.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6">Terms of Sale:</Typography>
                        <Typography>
                            Payment Terms: {invoiceDetails.paymentTerms}
                        </Typography>
                        <Typography>
                            Delivery Terms: {invoiceDetails.deliveryTerms}
                        </Typography>
                        <Typography>
                            Warranty: {invoiceDetails.warranty}
                        </Typography>
                        <Typography>
                            Return Policy: {invoiceDetails.returnPolicy}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography>
                            Thank you for your business! If you have any questions,
                            please contact us.
                        </Typography>
                        <Typography variant="h6" align="center">
                            ERP Sale Demo
                        </Typography>
                        <Typography align="center">
                            Phone: (123) 456-7890 | Email: demo@erp.com
                        </Typography>
                    </Box>
                </Box>

                {/* buttons */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    className="space-x-5"
                    ref={footerActionButtonsRef}
                    marginTop={5}
                >
                    <Button
                        variant="contained"
                        onClick={() => onSendEmail(data.id)}
                        size="large"
                        startIcon={<Email/>}
                    >
                        Send Email
                    </Button>
                    <Button
                        variant="contained"
                        onClick={print}
                        color="inherit"
                        size="large"
                        startIcon={<Print/>}
                    >
                        Print
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default InvoiceModal;
