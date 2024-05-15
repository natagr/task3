import React from 'react';
import DeleteIconMUI from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const DeleteIcon = ({
                               onClick,
                               tooltip = 'Delete',
                               color = 'default',
                               size = 'medium',
                           }) => {
    return (
        <Tooltip title={tooltip}>
            <IconButton onClick={onClick} color={color} size={size}>
                <DeleteIconMUI />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteIcon;
