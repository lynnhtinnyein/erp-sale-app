import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const WarningMessages = ({ messages, color = 'error', margin, padding }) => {
    return (
        <Box
            display="flex" 
            className="space-x-2"
            margin={margin}
            padding={padding}
        >
            <Typography fontSize={17} color="error">
                *
            </Typography>
            { messages.map( (msg, index) => 
                <Typography key={index} fontSize={12} color={color}>
                    {msg}
                </Typography>
            )}
        </Box>
    );
};

export default WarningMessages;
