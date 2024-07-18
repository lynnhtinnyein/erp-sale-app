import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItem = ({
    id,
    name,
    type,
    platforms,
    image
}) => {

    const { screenSize } = useSelector( state => state.ui );
    const navigate = useNavigate();

    const dimension = useMemo( () => {
        switch (screenSize) {
            case 'sm':
                return 100 / 2 + 'vw';

            case 'md':
                return 100 / 3 + 'vw';
        
            case 'lg':
                return 100 / 4 + 'vw';

            case 'xl':
                return 100 / 5 + 'vw';

            default:
                return 150;
        }
    }, [screenSize]);

    const handleOnClick = () => {
        navigate('lead_form', { state: { 
            id: id 
        }});
    }

    return (
        <Box
            display="flex"
            width={dimension}
            height={dimension}
            onClick={handleOnClick}
        >
            <Box
                flexGrow={1}
                display="flex"
                alignItems="center"
                position="relative"
                overflow="hidden"
                justifyContent="center"
                margin={0.04}
            >
                <img
                    className="w-full h-full"
                    src={image}
                />
                <Box
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    className="space-y-1 bg-opacity-35 cursor-pointer bg-black hover:scale-110 hover:bg-opacity-45 transition-all"
                >
                    <Typography color="white">
                        {name}
                    </Typography>
                    <Typography fontSize={14} textTransform="capitalize" color="white">
                        {type}
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        className="space-x-3"
                    >
                        { platforms.map( (platform, index) =>
                            <Fragment key={index}>
                                <Typography fontSize={12} key={index} color="white">
                                    { platform }
                                </Typography>
                                { platforms.length !== (index + 1) ? (
                                    <Typography color="white">|</Typography>
                                ) : ''}
                            </Fragment>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(ProductItem);
