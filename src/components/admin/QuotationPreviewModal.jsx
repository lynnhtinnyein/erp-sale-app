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
import { v4 as uuid } from "uuid";
import useDateParser from "../../hooks/useDateParser";
import { Close, Email, Print } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuotationPreviewModal = ({
    open,
    onClose,
    onSendEmail,
    data
}) => {

    if(!data) return null;

    const dateParser = useDateParser();
    const today = new Date();

    const quotationDetails = {
        id: uuid(),
        date: dateParser.getDate(today),
        paymentTerms: "Payment due within 30 days.",
        deliveryTerms: "Delivered within 7 business days.",
        warranty: "1-year warranty on all products.",
        returnPolicy: "Returns accepted within 30 days.",
    };

    const headerActionButtonsRef = useRef(null);
    const footerActionButtonsRef = useRef(null);

    const tax = Math.round((data.product.price * 5) / 100);

    const totalAmount = data.product.price + tax;

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

                {/* Quotation */}
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
                            Quotation Number: { quotationDetails.id }
                        </Typography>
                        <Typography>Date: {quotationDetails.date}</Typography>
                    </Box>
                    <Box marginBottom={2}>
                        <Typography>
                            Customer Name: {data.name}
                        </Typography>
                        <Typography>
                            Customer Phone: {data.phone}
                        </Typography>
                        <Typography>
                            Customer Email: {data.email}
                        </Typography>
                        <Typography>
                            Customer Company: {data.companyName}
                        </Typography>
                    </Box>
                    <Box marginBottom={2}>
                        <Typography variant="body1">
                            Introduction: Thank you for your interest in our
                            products/services. Below you will find the detailed
                            quotation as per your request.
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
                                            1
                                        </TableCell>
                                        <TableCell>
                                            ${data.product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                        ${data.product.price.toFixed(2)}
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
                            <Typography>${data.product.price.toFixed(2)}</Typography>
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
                            Payment Terms: {quotationDetails.paymentTerms}
                        </Typography>
                        <Typography>
                            Delivery Terms: {quotationDetails.deliveryTerms}
                        </Typography>
                        <Typography>
                            Warranty: {quotationDetails.warranty}
                        </Typography>
                        <Typography>
                            Return Policy: {quotationDetails.returnPolicy}
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
                        onClick={onSendEmail}
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

export default QuotationPreviewModal;
