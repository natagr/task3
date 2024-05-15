import React from 'react';
import DialogContentTextMUI from '@mui/material/DialogContentText';
import useTheme from 'misc/hooks/useTheme';

function DialogContentText({
                               children,
                               customColor,
                               variant = 'body1',
                               ...rest
                           }) {
    const { theme } = useTheme();

    return (
        <DialogContentTextMUI
            sx={{
                color: customColor || theme.palette.text[variant],
            }}
            {...rest}
        >
            {children}
        </DialogContentTextMUI>
    );
}

export default DialogContentText;