import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useLocalDB from "../../hooks/useLocalDB";
import useDateParser from "../../hooks/useDateParser";

const FinancialRecordsPage = () => {
    const DB = useLocalDB();
    const dateParser = useDateParser();

    const [fetchRecords, setFinancialRecords] = useState([]);

    const fetchFinancialRecords = () => {
        setFinancialRecords(DB.get('financial_records'));
    }

    useEffect( () => {
        fetchFinancialRecords();
    }, []);

    return (
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
                    Financial Records
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
                                    OrderID / InvoiceNo
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Product ID
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Quantity
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Unit Price
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Delivered Date
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Payment Date
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                                    Transition Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fetchRecords.map((row, index) => (
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
                                        {row.product.id}
                                    </TableCell>
                                    <TableCell scope="row" align="right">
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell scope="row" align="right">
                                        ${row.product.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell scope="row" align="right">
                                        {dateParser.getDateTime(row.deliveredDate)}
                                    </TableCell>
                                    <TableCell scope="row" align="right">
                                        {dateParser.getDateTime(row.paymentDate)}
                                    </TableCell>
                                    <TableCell scope="row" align="right">
                                        <Typography color="green">
                                            + ${row.product.price.toFixed(2) * row.quantity}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default FinancialRecordsPage;
