import React from 'react';
import MuiAlertMUI from '@mui/material/Alert';
import useTheme from 'misc/hooks/useTheme';

function MuiAlert({
                      children,
                      customBackground,
                      customColor,
                      variant = 'info',
                      ...rest
                  }) {
    const { theme } = useTheme();

    return (
        <MuiAlertMUI
            sx={{
                background: customBackground || theme.palette.alert[variant].background,
                color: customColor || theme.palette.alert[variant].text,
            }}
            variant={variant}
            {...rest}
        >
            {children}
        </MuiAlertMUI>
    );
}

export default MuiAlert;