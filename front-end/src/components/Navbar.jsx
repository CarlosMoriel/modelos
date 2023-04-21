import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: '#355070' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          AI Model Showcase
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
