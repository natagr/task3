import React from 'react';
import Box from '@mui/material/Box';

const defaultStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
};

const BoxWrapper = ({
                        children,
                        flexDirection = defaultStyles.flexDirection,
                        justifyContent = defaultStyles.justifyContent,
                        alignItems = defaultStyles.alignItems,
                        style = {},
                    }) => {
    return (
        <Box
            sx={{
                ...defaultStyles,
                flexDirection,
                justifyContent,
                alignItems,
                ...style,
            }}
        >
            {children}
        </Box>
    );
};

export default BoxWrapper;
