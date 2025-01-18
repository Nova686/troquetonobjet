import React from 'react';
import { Link as MaterialLink, LinkProps } from '@mui/material';

const Link: React.FC<LinkProps> = ({ children, ...other }) => {
    return (
        <MaterialLink {...other}>
            {children}
        </MaterialLink>
    );
};

export default Link;
