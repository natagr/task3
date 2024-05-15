import React from 'react';
import DialogTitleMui from '@mui/material/DialogTitle';

const DialogTitle = ({ children }) => {
    return (
        <DialogTitleMui>
            {children}
        </DialogTitleMui>
    );
};

export default DialogTitle;
