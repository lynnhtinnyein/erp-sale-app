import { Call, Email } from "@mui/icons-material";
import { ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WarningMessages from "../../components/admin/WarningMessages";
import useLocalDB from "../../hooks/useLocalDB";
import { useEffect, useState } from "react";

const LeadsPage = () => {
    const DB = useLocalDB();

    const [leads, setLeads] = useState([]);

    const fetchLeads = () => {
        setLeads(DB.get('leads'));
    }

    useEffect( () => {
        fetchLeads();
    }, []);

    //methods
        const markAsInterest = (leadId) => {
            const targetLead = leads.find( e => e.id === leadId );
            DB.post('opportunities', targetLead);
            DB.delete(`leads/${leadId}`);
            fetchLeads()
        }

        const handleOnEmail = (leadId) => {
            markAsInterest(leadId);
        }

        const handleOnCall = (leadId) => {
            markAsInterest(leadId);
        }

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
                    Leads
                </Typography>
            </Box>

            <WarningMessages
                padding={2}
                messages={[
                    'Note: In demo mode, the certain lead will be marked as "interested" when admin choose to email or call.'
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
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leads.map((row) => (
                                <TableRow
                                    key={row.id}
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default LeadsPage;
