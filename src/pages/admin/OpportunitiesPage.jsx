import { Article, Call, Email, Send } from "@mui/icons-material";
import { Button, ButtonGroup, IconButton, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useLocalDB from "../../hooks/useLocalDB";
import { useEffect, useState } from "react";
import QuotationPreviewModal from "../../components/admin/QuotationPreviewModal";
import WarningMessages from "../../components/admin/WarningMessages";
import CreateOrderModal from "../../components/admin/CreateOrderModal";
import { useSnackbar } from "notistack";
import Table from "../../components/Table";

const OpportunitiesPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const DB = useLocalDB();

    const [opportunities, setOpportunities] = useState([]);
    const [modalTargetItem, setModalTargetItem] = useState(null); 
    const [showQuotationModal, setShowQuotationModal] = useState(false); 
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false); 

    const modalMapping = {
        quotation: setShowQuotationModal,
        create_order: setShowCreateOrderModal
    };

    const fetchOpportunities = () => {
        setOpportunities(DB.get('opportunities'));
    }

    useEffect( () => {
        fetchOpportunities();
    }, []);

    //methods
        const handleOnEmail = (opportunityId) => {
            DB.put(`opportunities/${opportunityId}`, {
                status: 'contacted'
            });
            fetchOpportunities();
        }

        const handleOnCall = (opportunityId) => {
            DB.put(`opportunities/${opportunityId}`, {
                status: 'contacted'
            });
            fetchOpportunities();
        }

        const sendQuotationByMail = (opportunityId) => {
            DB.put(`opportunities/${opportunityId}`, {
                status: 'quotation sent'
            });
            fetchOpportunities();
            closeModal('quotation');
            enqueueSnackbar(
                'Quotation Sent.',
                { variant: 'success' }
            )
        }

        const openModal = (modal, opportunity) => {
            const inventory = DB.get('inventory');
            const product = inventory.find( e => e.id === opportunity.productId );
            const targetItem = {...opportunity, product };
            const setShowModal = modalMapping[modal];
            setShowModal(true);
            setModalTargetItem(targetItem);
        }

        const closeModal = (modal) => {
            const setShowModal = modalMapping[modal];
            setShowModal(false);
            setModalTargetItem(null);
        }

        const handleOnNewOrderCreated = () => {
            fetchOpportunities();
            closeModal('create_order');
            enqueueSnackbar(
                'New Order Created Successfully.',
                { variant: 'success'}
            )
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

                <WarningMessages
                    padding={2}
                    messages={[
                        'Note: in demo mode, when a quotation is sent to customer, it will be assumed as accepted by customer.',
                        'Create order action will be appeared only after customer accepted the quotation.'
                    ]}
                />

                <Table
                    flexGrow={1}
                    isEmpty={opportunities.length === 0}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold'}}>
                                id
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold'}}>
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
                        {opportunities.map((row, index) => (
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
                                        { row.status ?? 'Quotation Not Sent'}
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
                                        onClick={() => openModal('quotation', row)}
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
                                            onClick={() => openModal('create_order', row)}
                                        >
                                            Create Order
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            startIcon={<Send/>}
                                            onClick={() => sendQuotationByMail(row.id)}
                                        >
                                            Send Quotation
                                        </Button>
                                    )} 
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* modals */}
            <QuotationPreviewModal 
                open={showQuotationModal}
                onClose={() => closeModal('quotation')}
                data={modalTargetItem}
                onSendEmail={sendQuotationByMail}
            />
            <CreateOrderModal 
                open={showCreateOrderModal}
                onClose={() => closeModal('create_order')}
                onAdded={handleOnNewOrderCreated}
                data={modalTargetItem}
            />
        </>
    );
};

export default OpportunitiesPage;
