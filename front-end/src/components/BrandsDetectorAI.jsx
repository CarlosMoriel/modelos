import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";

function BrandsDetectorAI() {
  // State variables for file, loading status, prediction result, error message, and image preview
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPrediction(null);
    setError(null);

    // Display image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  // Handle image upload and prediction
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload an image.");
      return;
    }

    setError(null);
    setPrediction(null);

    // Prepare form data
    const formData = new FormData();
    formData.append("brands_image", file);

    // Send request to the backend
    try {
      const response = await axios.post("http://localhost:5000/brands/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update prediction state or display an error
      if (response.data.success === "true") {
        setPrediction(response.data.prediction);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("An error occurred while processing the image.");
    }
  };

  // Render the component
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Brands Detector AI
        </Typography>

        <Card sx={{ mt: 4 }}>
          <CardContent>

            {imagePreview ? (
              <CardMedia component="img" image={imagePreview} alt="Selected Image" />
            ) : (
              <Box
                sx={{
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "grey.200",
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Image Preview
                </Typography>
              </Box>
            )}
          </CardContent>

          <CardActions>
            <input accept="image/*" id="contained-button-file" type="file" hidden onChange={handleFileChange} />
            <label htmlFor="contained-button-file">
              <Button variant="outlined" component="span">
                {file ? file.name : "Choose an image"}
              </Button>
            </label>

            <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading} sx={{ ml: "auto" }}>
              Upload and Predict
            </Button>

          </CardActions>
        </Card>
        
        {/** Display loading progress */}
        {loading && <LinearProgress sx={{ mt: 2, width: "100%" }} />}

        {/** Display error message if any */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        {/** Display prediction result if any */}
        {prediction && (
          <Paper sx={{ mt: 2, p: 2, width: "100%", textAlign: "center" }}>
            <Typography variant="h5">Predicted Brand: {prediction}</Typography>
          </Paper>
        )}
        
      </Box>
    </Container>
  );
}

export default BrandsDetectorAI;
