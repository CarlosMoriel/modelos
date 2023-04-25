import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ColorIdentifierSection = () => {
  return (
    <Card style={{ background: '#fcf7f8', color: '#355070' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Color Identifier Model
        </Typography>
        <Typography variant="body2" component="div">
          This model identifies colors in images.
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/color-identifier">
          Try it out
        </Button>
      </CardActions>
    </Card>
  );
};

export default ColorIdentifierSection;
