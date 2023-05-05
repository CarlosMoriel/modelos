import React, { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Lottie from "lottie-react";

function BrandsDetectorAI() {
  
  // State variables for file, loading status, prediction result, error message, and image preview
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [magicianAnimationData, setMagicianAnimationData] = useState(null);


  // Overrides for predictions.
  const predictionMapping = {
    pc_gamer: "Nada mas y nada menos que... La Poderosa!",
    macbook: "La Fiera!",
    nvidia_gpu: "Una Nvidia gi-pi-u",
    amd_gpu: "Una AMD gi-pi-u",
    intel_cpu: "Un Intel ci-pi-u",
    amd_cpu: "Un AMD ci-pi-u",
    Uncertain: "Perdoneme, no le se... :'("
  };

  // Helper function that fetch the magician animation.
  const fetchMagicianAnimation = async () => {
    try {
      const response = await fetch("https://assets6.lottiefiles.com/packages/lf20_mthcmrjn.json");
      const animationData = await response.json();
      setMagicianAnimationData(animationData);
    } catch (error) {
      console.error("Error fetching magician animation:", error);
    }
  };

  // Fetch the magician animation on component mount.
  useEffect(() => {
    fetchMagicianAnimation();
  }, []);
  
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
    setLoading(true);

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

        // Overriding the prediction with a powerful one.
        const prediction = predictionMapping[response.data.prediction];
        setPrediction(prediction);
        
      } else {
        setError(response.data.error);
      }

    } catch (error) {
      setError("An error occurred while processing the image.");
    }
    
    // Hide our magician.
    setLoading(false);
  };

  // Render the component
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 6 }}>

        <Typography variant="h4" align="center" gutterBottom>
          Brands Detector AI
        </Typography>

        {/** Display supported components */}
        <Typography variant="h6" align="center" gutterBottom>
          Supported Brands:
        </Typography>

        <Grid container spacing={1} justifyContent="center">
          {["Nvidia Gpu", "Amd Gpu", "Intel Cpu", "Amd Cpu", "La Poderosa", "La Fiera"].map((component, index) => (
            <Grid item key={index}>
              <Chip label={component} sx={{ backgroundColor: "#1976d2", color: "#eeeeee" }} />
            </Grid>
          ))}
        </Grid>

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
        
        {/** Display magician animation while loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Lottie animationData={magicianAnimationData} style={{ width: 150, height: 150 }} />
          </Box>
        )}

        {/** Display error message if any */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        {/** Display prediction result if any */}
        {prediction && (
          <Box width="100%" mx="auto">
            <Paper sx={{ mt: 2, p: 2, textAlign: "center" }}>
              <Typography variant="h5">Predicted Brand: {prediction}</Typography>
            </Paper>
          </Box>
        )}

      </Box>
    </Container>
  );
}

export default BrandsDetectorAI;
