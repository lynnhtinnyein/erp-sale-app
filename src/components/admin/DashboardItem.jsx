import { Inventory } from "@mui/icons-material";
import { Icon, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardItem = ({
    name,
    color,
    icon,
    count,
    path
}) => {

    const { screenSize } = useSelector( state => state.ui );
    const navigate = useNavigate();

    const width = useMemo( () => {
        switch (screenSize) {
            case 'sm':
                return 100 / 1;

            case 'md':
                return 100 / 2;
        
            case 'lg':
                return 100 / 3;

            case 'xl':
                return 100 / 4;

            default:
                return 150;
        }
    }, [screenSize]);

    const height = useMemo( () => {
        const reduceAmount = Math.round((width * 30) / 100);
        return width - reduceAmount;
    }, [width]);

    const handleOnClick = () => {
        navigate(`/admin/${path}`);
    }

    return (
        <Box
            display="flex"
            width={`${width}vw`}
            height={`${height}vw`}
            onClick={handleOnClick}
        >
            <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                overflow="hidden"
                margin={2}
                backgroundColor="white"
                component={Paper}
                className="cursor-pointer active:scale-95"
                onClick={handleOnClick}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    padding={2}
                    borderBottom={1}
                    borderColor="lightgray"
                    height={50}
                >
                    <Typography color={color} variant="h6" fontWeight="bold">
                        { name }
                    </Typography>
                </Box>
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="center"
                    padding={2}
                    justifyContent="space-evenly"
                >
                    { icon }
                    <Typography color={color} variant="h3" fontWeight="bold">
                        { count }
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DashboardItem);
