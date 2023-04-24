import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModelSections from "./components/ModelSections";
import ColorIdentifierPage from "./components/ColorIdentifierSection";
import ImageDifferencesPage from "./components/ImageDifferencesSection";
import ObjectDetectionPage from "./components/ObjectDetectionSection";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ModelSections />} />
        <Route path="/color-identifier" element={<ColorIdentifierPage />} />
        <Route path="/image-differences" element={<ImageDifferencesPage />} />
        <Route path="/object-detection" element={<ObjectDetectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
