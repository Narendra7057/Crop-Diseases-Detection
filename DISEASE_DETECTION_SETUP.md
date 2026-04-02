# Grape Leaf Disease Detection Setup Guide

## Overview
This document provides instructions for setting up and running the grape leaf disease detection feature in the CropGuard application.

## Prerequisites

### Python Environment
- Python 3.8 or higher
- TensorFlow 2.14.0
- Keras 2.14.0
- NumPy 1.24.0
- Pillow 10.0.0

### Required Files
- `Model/grape_leaf_disease_model.keras` - The trained Keras model
- `backend/predict.py` - Python prediction script
- `backend/controllers/detectionController.js` - Node.js controller

## Installation Steps

### Step 1: Install Python Dependencies

```bash
# Navigate to the project root directory
cd d:\SY\ LAB\Sem2\ML\CropDetection

# Install Python packages
pip install -r requirements.txt
```

### Step 2: Verify Model File

Ensure the model file is present:
```
Model/grape_leaf_disease_model.keras
```

If the model file is missing, make sure it's placed in the `Model` directory before proceeding.

### Step 3: Backend Configuration

The backend is already configured with:
- Detection controller (`backend/controllers/detectionController.js`)
- Detection routes (`backend/routes/detectionRoutes.js`)
- Python integration via `backend/predict.py`

### Step 4: Start the Application

#### Terminal 1: Backend Server
```bash
cd backend
npm install
npm run dev
```

Backend will run on: `http://localhost:5000`

#### Terminal 2: Frontend Server
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`

## How to Use Disease Detection

### Step-by-Step:

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your browser
   - Log in or sign up if required

2. **Go to Disease Detection Page**
   - Click "Disease Detection" in the main navigation

3. **Select Your Crop**
   - Click on "Grapes" (or another crop if available)
   - The button will highlight in green when selected

4. **Upload Leaf Image**
   - Drag and drop an image of the grape leaf, or
   - Click "Browse Files" to select an image from your computer
   - Supported formats: JPG, PNG, GIF

5. **Analyze the Image**
   - Click the "Analyze Image" button
   - Wait for the AI model to process the image

6. **View Results**
   - Disease Name: The predicted disease (or "Healthy")
   - Confidence Score: How confident the model is (0-100%)
   - Severity: Critical, High, Medium, or None
   - Recommendation: Treatment and prevention advice

## Disease Classes

The model can predict the following grape leaf diseases:

| Class | Disease | Indicator |
|-------|---------|-----------|
| 0 | Healthy | Green leaf, no symptoms |
| 1 | Powdery Mildew | White powder on leaves |
| 2 | Downy Mildew | Yellow-brown spots with gray mold |
| 3 | Black Rot | Dark spots and tissue death |
| 4 | Isariopsis Leaf Spot | Brown spots with concentric rings |

## API Endpoints

### Predict Disease
**POST** `/api/detection/predict`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "crop": "Grapes"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "disease": "Powdery Mildew",
    "confidence": 92.5,
    "severity": "High",
    "recommendation": "Apply sulfur powder or potassium bicarbonate solution...",
    "crop": "grapes"
  }
}
```

### Get Supported Crops
**GET** `/api/detection/crops`

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Tomato", "icon": "🍅" },
    { "id": 2, "name": "Grapes", "icon": "🍇" },
    ...
  ]
}
```

### Get Diseases by Crop
**GET** `/api/detection/diseases/{cropName}`

**Response:**
```json
{
  "success": true,
  "crop": "Grapes",
  "data": [
    {
      "name": "Powdery Mildew",
      "symptoms": ["White powder on leaves", ...],
      "treatment": "Spray sulfur powder...",
      "severity": "High"
    },
    ...
  ]
}
```

## Troubleshooting

### Issue: "Model not found" error
- **Solution**: Verify that `Model/grape_leaf_disease_model.keras` exists in the project root

### Issue: "Python not found" error
- **Solution**: Install Python 3.8+ and add it to your system PATH

### Issue: Python package errors (TensorFlow, Keras, etc.)
- **Solution**: Run `pip install -r requirements.txt` in the project root

### Issue: "Failed to analyze image" error
- **Solution**: 
  - Check that the image format is JPG, PNG, or GIF
  - Ensure the image is a clear leaf photo
  - Check the terminal logs for Python errors

### Issue: Port already in use (5000 or 3000)
- **Solution**: 
  - Kill the process using the port, or
  - Change the PORT in backend `.env` file (e.g., `PORT=5001`)
  - Use `-p 3001` flag with Vite for frontend

## Model Details

### Input Requirements
- **Image Size**: 224x224 pixels (automatically resized)
- **Format**: RGB/JPG/PNG/GIF
- **Normalization**: 0-1 float range

### Output
- **Confidence Score**: Probability (0-100%)
- **Disease Class**: One of the 5 classified diseases
- **Additional Info**: Severity level and treatment recommendations

## Performance Tips

1. **Image Quality**: Provide clear, well-lit photos of the affected leaf
2. **Angle**: Take photos directly above or at an angle to see the leaf surface clearly
3. **Background**: Use a plain background to reduce confusion
4. **Multiple Uploads**: If unsure, test multiple images for comparison

## Development Notes

### Adding New Crops
Edit `backend/controllers/detectionController.js`:
```javascript
export const getSupportedCrops = (req, res) => {
  const crops = [
    { id: 1, name: 'Tomato', icon: '🍅', color: 'red' },
    // Add new crops here
  ];
};
```

### Updating Disease Mapping
Edit `backend/predict.py`:
```python
disease_mapping = {
    0: "Healthy",
    1: "Powdery Mildew",
    # Update with your model's classes
}
```

### Model Retraining
To use a newly trained model:
1. Replace `Model/grape_leaf_disease_model.keras` with your new model
2. Update the `disease_mapping` in `predict.py` if classes changed
3. Restart the backend servers

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console (F12) for client-side errors
3. Check the backend terminal for server-side errors
4. Verify Python installation: `python --version`
5. Verify required packages: `pip list | grep -E "tensorflow|keras|numpy|pillow"`
