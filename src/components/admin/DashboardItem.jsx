import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardItem = ({
    name,
    color,
    icon,
    count,
    path
}) => {
    const { screenSize, theme } = useSelector( state => state.ui );
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
                className={`cursor-pointer shadow-md active:scale-95 rounded ${
                    theme === 'light' ? 'bg-white shadow-gray-300 ' : 'bg-zinc-700 shadow-black'
                }`}
                onClick={handleOnClick}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    padding={2}
                    borderBottom={1}
                    borderColor={ theme === 'light' ? 'lightgray' : 'black '}
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
