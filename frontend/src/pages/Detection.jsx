import React, { useState } from "react";
import { Upload, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { Button, EmptyState, LoadingSpinner } from "../components/Common";
import { mockCrops } from "../data/mockData";
import { useDetection } from "../hooks/useDetection";
import { addDetectionHistoryItem } from "../utils/detectionHistory";

export const DetectionPage = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const { predictDisease, loading } = useDetection();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage || !selectedCrop) {
      alert("Please select a crop and upload an image");
      return;
    }

    setError(null);
    try {
      const predictionResult = await predictDisease(preview, selectedCrop);
      setResult(predictionResult);
      addDetectionHistoryItem({
        crop: selectedCrop,
        disease: predictionResult.disease,
        confidence: predictionResult.confidence,
        severity: predictionResult.severity,
        recommendation: predictionResult.recommendation,
      });
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Disease Detection</h1>
        <p className="text-gray-600 mb-8">Upload a crop image and let our AI analyze it for disease detection</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Step 1: Select Crop */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 1: Select Your Crop</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockCrops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.name)}
                  className={`p-4 rounded-lg border-2 transition ${
                    selectedCrop === crop.name
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{crop.icon}</div>
                  <div className="font-medium text-sm">{crop.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Upload Image */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 2: Upload Crop Leaf Image</h2>

            {!preview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDragDrop}
                className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:bg-green-50 transition"
              >
                <Upload className="mx-auto text-green-500 mb-4" size={40} />
                <h3 className="font-semibold mb-2">Drag and drop your image here</h3>
                <p className="text-gray-600 mb-4">or</p>
                <label className="cursor-pointer">
                  <span className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition inline-block">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-4">Supported formats: JPG, PNG, GIF</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img src={preview} alt="Preview" className="h-48 rounded-lg border-2 border-green-300" />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setUploadedImage(null);
                      setResult(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-2">
                  <label>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-block cursor-pointer">
                      Change Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Analyze */}
          {preview && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Step 3: Analyze Image</h2>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAnalyze}
                disabled={loading || !selectedCrop}
                className="w-full"
                loading={loading}
              >
                {loading ? "Analyzing..." : "Analyze Image"}
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-12">
            <LoadingSpinner />
            <p className="text-center mt-4 text-gray-600">Analyzing your crop image...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={32} />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-900 mb-2">Error Analyzing Image</h2>
                <p className="text-red-800 mb-4">{error}</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setError(null);
                    setResult(null);
                    setPreview(null);
                    setUploadedImage(null);
                    setSelectedCrop("");
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {result && !loading && !error && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              {result.severity === "None" || result.severity === "Medium" ? (
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={32} />
              ) : (
                <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={32} />
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{result.disease}</h2>
                <p className="text-gray-600 mb-4">
                  Crop: <span className="font-semibold">{selectedCrop}</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                <p className="text-2xl font-bold text-blue-600">{result.confidence}%</p>
              </div>
              <div className={`p-4 rounded-lg ${
                result.severity === "None" ? "bg-green-50" :
                result.severity === "Medium" ? "bg-yellow-50" :
                "bg-red-50"
              }`}>
                <p className="text-sm text-gray-600 mb-1">Severity</p>
                <p className={`text-2xl font-bold ${
                  result.severity === "None" ? "text-green-600" :
                  result.severity === "Medium" ? "text-yellow-600" :
                  "text-red-600"
                }`}>
                  {result.severity}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-2xl font-bold text-purple-600">
                  {result.severity === "None" ? "✓ Healthy" : "⚠ Diseased"}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">💡 Recommendation</h3>
              <p className="text-gray-700">{result.recommendation}</p>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setResult(null);
                setPreview(null);
                setUploadedImage(null);
                setSelectedCrop("");
                setError(null);
              }}
              className="w-full mt-6"
            >
              Analyze Another Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
