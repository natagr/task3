import React from 'react';
import PaginationMui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationWrapper = ({
                               count,
                               page,
                               onChange,
                               color = 'primary',
                               size = 'medium',
                               variant = 'text',
                               showFirstButton = false,
                               showLastButton = false,
                               siblingCount = 1,
                               boundaryCount = 1,
                           }) => {
    return (
        <Stack spacing={2}>
            <PaginationMui
                count={count}
                page={page}
                onChange={onChange}
                color={color}
                size={size}
                variant={variant}
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
                siblingCount={siblingCount}
                boundaryCount={boundaryCount}
            />
        </Stack>
    );
};

export default PaginationWrapper;
