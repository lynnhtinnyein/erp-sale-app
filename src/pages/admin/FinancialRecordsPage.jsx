import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useLocalDB from "../../hooks/useLocalDB";
import useDateParser from "../../hooks/useDateParser";
import Table from "../../components/Table";

const FinancialRecordsPage = () => {
    const DB = useLocalDB();
    const dateParser = useDateParser();

    const [financialRecords, setFinancialRecords] = useState([]);

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

            <Table isEmpty={financialRecords.length === 0}>
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
                    {financialRecords.map((row, index) => (
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
        </Box>
    );
};

export default FinancialRecordsPage;
