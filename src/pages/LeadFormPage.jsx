import { Button, FormControlLabel, Radio, RadioGroup, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { v4 as uuid } from 'uuid';
import useLocalDB from "../hooks/useLocalDB";
import moment from "moment";
import { useSnackbar } from "notistack";

const defaultInputs = { 
    name: '', 
    phone: '',
    email: '',
    companyName: '',
    description: '',
    type: 'appointment',
    date: null
}

const LeadFormPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const DB = useLocalDB();
    const { state } = useLocation();
    const productId = state?.id;  
    const product = DB.get(`inventory/${productId}`);

    const [inputs, setInputs] = useState(defaultInputs);
    const [errorCheckable, setErrorCheckable] = useState(false);

    //methods
        const handleChange = (e) => {
            setInputs( prev => ({ ...prev, [e.target.name]: e.target.value }));
        };

        const handleOnSelectDate = (newMoment) => {
            setInputs( prev => ({ ...prev, date: moment(newMoment)}));
        }

        const handleSubmit = () => {
            setErrorCheckable(true);

            const hasEmptyInput = !inputs.name || 
            !inputs.phone || 
            !inputs.email || 
            !inputs.companyName || 
            !inputs.type || 
            !inputs.date;
            
            if(!hasEmptyInput){
                const newLead = {
                    ...inputs, 
                    id: uuid(),
                    productId
                };
                
                DB.post('leads', newLead )

                //success msges
                setInputs(defaultInputs);
                setErrorCheckable(false);
                enqueueSnackbar(
                    'Submitted! Thank you for your inquiry. We will contact you ASAP.', 
                    { variant: 'success'}
                );
            }
        };

    return !productId ?
        <Navigate to="/"/>
    : (
        <Box flexGrow={1} overflow="auto">
            <Box 
                display="flex"
                flexDirection="column"
                width="100%"
                className="space-y-7"
                padding={3}
                paddingBottom={10}
                overflow="auto"
            >
                <Typography variant="h3" textAlign="center">
                    { product.name }
                </Typography>

                <Typography color="gray" textAlign="center">
                    Please fill out your information to inquire about this product.
                </Typography>

                <Box 
                    display="flex"
                    flexDirection="column"
                    className="space-y-3"
                >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                    { errorCheckable && !inputs.date ? (
                            <Typography color="error" fontSize={12}>* Please select date</Typography>
                        ) : ''}
                        <MobileDatePicker
                            value={inputs.date}
                            label="Choose Date"
                            format="DD/MM/YYYY"
                            onChange={handleOnSelectDate}
                            disablePast
                        />
                        
                    </LocalizationProvider>
                    <TextField
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        label="name"
                        required
                        error={ errorCheckable && !inputs.name}
                    />
                    <TextField
                        type="number"
                        name="phone"
                        value={inputs.phone}
                        onChange={handleChange}
                        label="Phone"
                        required
                        error={ errorCheckable && !inputs.phone}
                    />
                    <TextField
                        type="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        label="Email"
                        required
                        error={ errorCheckable && !inputs.email}
                    />
                    <TextField
                        type="text"
                        name="companyName"
                        value={inputs.companyName}
                        onChange={handleChange}
                        label="Company Name"
                        required
                        error={ errorCheckable && !inputs.companyName}
                    />
                    <TextareaAutosize
                        value={inputs.description}
                        placeholder="Description (optional)"
                        className="border border-1 border-gray-400 rounded bg-transparent focus:outline-blue-500 p-3"
                        maxRows={8}
                        minRows={3}
                        name="description"
                        onChange={handleChange}
                    />
                    <RadioGroup
                        row
                        name="type"
                        value={inputs.type}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="appointment" control={<Radio />} label="Demo Appointment" />
                        <FormControlLabel value="price_inquiry" control={<Radio />} label="Price Inquiry" />
                        <FormControlLabel value="service_inquiry" control={<Radio />} label="Service Inquiry" />
                    </RadioGroup>
                </Box>
                
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default LeadFormPage;
