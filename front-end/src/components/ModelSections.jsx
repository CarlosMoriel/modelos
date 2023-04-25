import React from 'react';
import { Grid } from '@mui/material';
import ColorIdentifierSection from './ColorIdentifierSection';
import ImageDifferencesSection from './ImageDifferencesSection';
import ObjectDetectionSection from './ObjectDetectionSection';

const ModelSections = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <ColorIdentifierSection />
      </Grid>
      <Grid item xs={4}>
        <ImageDifferencesSection />
      </Grid>
      <Grid item xs={4}>
        <ObjectDetectionSection />
      </Grid>
    </Grid>
  );
};

export default ModelSections;
