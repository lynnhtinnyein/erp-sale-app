import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const WarningMessages = ({ messages, color = 'gray', margin, padding }) => {
    return (
        <Box
            display="flex" 
            flexDirection="column"
            margin={margin}
            padding={padding}
            className="space-y-3"
        >
            { messages.map( (msg, index) => 
                <Box
                    key={index}
                    display="flex" 
                    className="space-x-2"
                >
                    <Typography fontSize={17} color={color}>
                        *
                    </Typography>
                    <Typography flexGrow={1} key={index} fontSize={12} color={color}>
                        {msg}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default WarningMessages;
