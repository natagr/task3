import React from 'react';
import ContainerMUI from '@mui/material/Container';
import useTheme from 'misc/hooks/useTheme';

const variants = {
    paper: 'paper',
    edit: 'edit',
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
};

function Container({
                       customBackground,
                       children,
                       disablePaddings = false,
                       variant = variants.paper,
                       maxWidth = 'lg',
                       ...rest
                   }) {
    const { theme } = useTheme();

    return (
        <ContainerMUI
            maxWidth={maxWidth}
            sx={{
                background: customBackground || theme.card.color.background[variant],
                borderRadius: '0px',
                display: 'flex',
                flexDirection: 'column',
                gap: `${theme.spacing(2)}px`,
                padding: disablePaddings ? 'none' : `${theme.spacing(2)}px 0px`,
                transition: 'all 0.2s ease-out',
                width: '100%',
            }}
            {...rest}
        >
            {children}
        </ContainerMUI>
    );
}

export default Container;