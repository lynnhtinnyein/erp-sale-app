import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useLocalDB from "../../hooks/useLocalDB";
import { Fragment, useEffect, useState } from "react";
import useDateParser from "../../hooks/useDateParser";
import Table from "../../components/Table";

const InventoryPage = () => {
    const DB = useLocalDB();
    const dateParser = useDateParser();

    const [inventory, setInventory] = useState([]);

    const fetchInventory = () => {
        setInventory(DB.get('inventory'));
    }

    useEffect( () => {
        fetchInventory();
    }, []);

    return (
        <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            className="space-y-3"
        >
            <Box padding={2}>
                <Typography variant="h4">
                    Inventory
                </Typography>
            </Box>

            <Table isEmpty={inventory.length === 0}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold'}}>
                            id
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Name
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Type
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Available Platforms
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Price
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Stock
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold'}}>
                            Stock Updated At
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventory.map((row, index) => (
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
                                {row.name}
                            </TableCell>
                            <TableCell scope="row" align="right">
                                {row.type}
                            </TableCell>
                            <TableCell scope="row" align="right">
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="end"
                                    className="space-x-1"
                                >
                                    { row.platforms.map( (platform, index) =>
                                        <Fragment key={index}>
                                            <Typography fontSize={12} key={index}>
                                                { platform }
                                            </Typography>
                                            { row.platforms.length !== (index + 1) ? (
                                                <Typography>,</Typography>
                                            ) : ''}
                                        </Fragment>
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell scope="row" align="right">
                                ${row.price.toFixed(2)}
                            </TableCell>
                            <TableCell scope="row" align="right">
                                {row.stock}
                            </TableCell>
                            <TableCell scope="row" align="right">
                                {dateParser.getDateTime(row.updatedAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default InventoryPage;
