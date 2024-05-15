import React from 'react';
import DialogContentMui from '@mui/material/DialogContent';

const DialogContent = ({ children }) => {
    return (
        <DialogContentMui>
            {children}
        </DialogContentMui>
    );
};

export default DialogContent;
