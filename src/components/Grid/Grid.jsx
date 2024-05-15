import React from 'react';
import GridMui from '@mui/material/Grid';

const spacingVariants = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
};

const Grid = ({
                         children,
                         spacing = spacingVariants[2],
                         direction = 'row',
                         justify = 'flex-start',
                         alignItems = 'stretch',
                     }) => {
    return (
        <GridMui
            container
            spacing={spacing}
            direction={direction}
            justifyContent={justify}
            alignItems={alignItems}
        >
            {children}
        </GridMui>
    );
};

export default Grid;
