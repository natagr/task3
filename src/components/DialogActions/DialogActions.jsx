import React from 'react';
import DialogActionsMui from '@mui/material/DialogActions';

const DialogActions = ({ children }) => {
    return (
        <DialogActionsMui>
            {children}
        </DialogActionsMui>
    );
};

export default DialogActions;
