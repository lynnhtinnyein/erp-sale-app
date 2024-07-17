import { Button, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const defaultInputs = { 
    name: '', 
    phone: '',
    email: '',
    companyName: '',
    description: '',
    date: null
}

const LeadFormPage = () => {
    const { state } = useLocation();
    const productId = state?.id;  

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

            const hasEmptyInput = !inputs.name || !inputs.phone || !inputs.email || !inputs.companyName || !inputs.date;
            
            if(!hasEmptyInput){
                const storedLeads = JSON.parse(localStorage.getItem('leads')) || [];
                storedLeads.push(inputs);
                localStorage.setItem("leads", JSON.stringify(storedLeads));
                setInputs(defaultInputs);
                alert("Submitted! Thank you for making appointment. We will contact you ASAP.");
                setErrorCheckable(false);
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
                    Appointment
                </Typography>

                <Typography color="gray" textAlign="center">
                    Please fill your information to make an appointment for demo.
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
