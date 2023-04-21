import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ImageDifferencesSection = () => {
  return (
    <Card style={{ background: "#fcf7f8", color: "#355070" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Image Differences Model
        </Typography>
        <Typography variant="body2" component="div">
          This model finds differences between images.
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/image-differences">
          Try it out
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImageDifferencesSection;
