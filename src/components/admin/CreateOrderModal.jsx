import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Close } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import useLocalDB from "../../hooks/useLocalDB";
import moment from "moment";
import { v4 as uuid } from "uuid";

const CreateOrderModal = ({ 
    open, 
    onClose,
    onAdded,
    data
}) => {
    if(!data) return null;

    const DB = useLocalDB();
    const [inputs, setInputs] = useState({
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        quantity: 1,
        deliveryDate: moment(),
        deliveryAddress: '',
    })

    const [errorCheckable, setErrorCheckable] = useState(false);

    //methods
        const handleChange = (e) => {
            setInputs( prev => ({ ...prev, [e.target.name]: e.target.value }));
        };

        const handleOnSelectDate = (newMoment) => {
            setInputs( prev => ({ ...prev, date: moment(newMoment)}));
        }

        const submit = () => {
            setErrorCheckable(true);
            if(
                inputs.customerName !== '' && 
                inputs.customerPhone !== '' &&
                inputs.customerEmail !== '' && 
                inputs.quantity !== '' &&
                inputs.deliveryAddress !== ''
            ){
                const newSaleOrder = {
                    id: uuid(),
                    customer: {
                        name: inputs.customerName,
                        phone: inputs.customerPhone,
                        email: inputs.customerEmail,
                    },
                    product: data.product,
                    quantity: inputs.quantity,
                    deliveryAddress: inputs.deliveryAddress,
                    deliveryDate: inputs.deliveryDate,
                    status: 'created',
                    createdDate: moment()
                }
                DB.post('sale_orders', newSaleOrder);
                DB.delete(`opportunities/${data.id}`);
                onAdded();
            }
        } 

    return (
        <Dialog 
            open={open} 
            fullWidth={true}
            overflow="hidden"
        >
            <Box
                display="flex"
                flexDirection="column"
            >
                {/* header */}
                <Box
                    minHeight={50}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    borderBottom={1}
                    borderColor="lightgray"
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        marginLeft="1rem"
                    >
                        <Typography
                            fontWeight="bold"
                            fontSize={15}
                        >
                            Create Sale Order
                        </Typography>
                    </Box>
                    <Button color="inherit" onClick={onClose}>
                        <Close />
                    </Button>
                </Box>

                {/* content */}
                <Box
                    maxHeight={500}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        margin={3}
                        className="space-y-5"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            className="space-y-2"
                            paddingBottom={1.5}
                        >
                            <Typography fontWeight="bold">Product Detail</Typography>
                            <Typography fontSize={14} color="gray">ProductID: { data.productId }</Typography>
                            <Typography fontSize={14} color="gray">{ data.product.name } ({ data.product.type })</Typography>
                            <Typography fontSize={14} color="gray">${ data.product.price.toFixed(2) } / item</Typography>
                        </Box>
                        <TextField
                            name="customerName"
                            label="Customer Name" 
                            variant="outlined" 
                            error={ errorCheckable && inputs.customerName === '' }
                            value={inputs.customerName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="customerPhone"
                            label="Customer Phone" 
                            type="number"
                            variant="outlined" 
                            error={ errorCheckable && inputs.customerPhone === '' }
                            value={inputs.customerPhone}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="customerEmail"
                            type="email"
                            label="Customer Email" 
                            variant="outlined" 
                            error={ errorCheckable && inputs.customerEmail === '' }
                            value={inputs.customerEmail}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="quantity"
                            label="Quantiy" 
                            type="number"
                            variant="outlined" 
                            error={ errorCheckable && inputs.quantity === '' }
                            value={inputs.quantity}
                            onChange={handleChange}
                            required
                        />
                         <TextField
                            name="deliveryAddress"
                            label="Delivery Address" 
                            variant="outlined" 
                            error={ errorCheckable && inputs.deliveryAddress === '' }
                            value={inputs.deliveryAddress}
                            onChange={handleChange}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                value={inputs.deliveryDate}
                                name="deliveryDate"
                                label="Delivery Date"
                                format="DD/MM/YYYY"
                                disablePast
                                onChange={handleOnSelectDate}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>

                {/* footer */}
                <Box
                    display="flex"
                    minHeight={45}
                    flexDirection="row"
                    borderTop={1}
                    borderColor="lightgray"
                    paddingLeft={2}
                    paddingRight={2}
                    paddingBottom={2}
                    paddingTop={1.5}
                    className="space-x-3"
                >
                    <Button 
                        fullWidth
                        size="large"
                        color="success"
                        variant="contained"
                        onClick={submit}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CreateOrderModal;
