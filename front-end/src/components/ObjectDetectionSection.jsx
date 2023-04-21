import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ObjectDetectionSection = () => {
  return (
    <Card style={{ background: "#fcf7f8", color: "#355070" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Object Detection Model
        </Typography>
        <Typography variant="body2" component="div">
          This model classifies images as keyboard, mouse, or monitor.
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/object-detection">
          Try it out
        </Button>
      </CardActions>
    </Card>
  );
};

export default ObjectDetectionSection;
