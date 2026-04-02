import os
import sys
import json
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras
import base64
from io import BytesIO

MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'Model')

MODEL_CONFIGS = {
    'grapes': {
        'path': os.path.join(MODEL_DIR, 'grape_leaf_disease_model.keras'),
        'class_names': [
            'Healthy',
            'Powdery Mildew',
            'Downy Mildew',
            'Black Rot',
            'Isariopsis Leaf Spot'
        ]
    },
    'tomato': {
        'path': os.path.join(MODEL_DIR, 'tomato_disease_model.keras'),
        'class_names': [
            'Bacterial Spot',
            'Early Blight',
            'Late Blight',
            'Leaf Mold',
            'Septoria Leaf Spot',
            'Spider Mites',
            'Target Spot',
            'Tomato Yellow Leaf Curl Virus',
            'Tomato Mosaic Virus',
            'Healthy'
        ]
    },
    'onion': {
        'path': os.path.join(MODEL_DIR, 'onion_disease_model.keras'),
        'class_names': [
            'Healthy',
            'Purple Blotch',
            'Stemphylium Leaf Blight',
            'Downy Mildew',
            'Fusarium Basal Rot',
            'Pink Root',
            'White Rot'
        ]
    }
}

CROP_ALIASES = {
    'grape': 'grapes',
    'grapes': 'grapes',
    'tomato': 'tomato',
    'tomatoes': 'tomato',
    'onion': 'onion',
    'onions': 'onion'
}

model_cache = {}


def normalize_crop_type(crop_type):
    crop_key = str(crop_type or 'grapes').strip().lower()
    return CROP_ALIASES.get(crop_key, crop_key)


def get_model_config(crop_type):
    normalized_crop = normalize_crop_type(crop_type)
    config = MODEL_CONFIGS.get(normalized_crop)
    if not config:
        raise ValueError(
            f"Unsupported crop '{crop_type}'. Supported crops: {', '.join(sorted(MODEL_CONFIGS.keys()))}"
        )
    return normalized_crop, config


def load_model_for_crop(crop_type):
    normalized_crop, config = get_model_config(crop_type)
    model_path = config['path']

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")

    if normalized_crop not in model_cache:
        model_cache[normalized_crop] = keras.models.load_model(model_path)

    return normalized_crop, model_cache[normalized_crop]


def load_class_names(crop_type):
    normalized_crop, config = get_model_config(crop_type)
    class_names = list(config.get('class_names', []))

    # Optional override file if user wants custom class ordering.
    classes_file = os.path.join(MODEL_DIR, f'{normalized_crop}_classes.json')
    if os.path.exists(classes_file):
        try:
            with open(classes_file, 'r', encoding='utf-8') as f:
                file_data = json.load(f)
                if isinstance(file_data, list) and all(isinstance(item, str) for item in file_data):
                    class_names = file_data
        except Exception:
            pass

    return class_names


def build_recommendation(disease_name, confidence):
    disease_lower = disease_name.lower()

    if 'healthy' in disease_lower:
        return 'None', 'Continue regular maintenance and monitoring.'

    if confidence > 85:
        severity = 'Critical'
    elif confidence > 70:
        severity = 'High'
    else:
        severity = 'Medium'

    if 'powdery' in disease_lower:
        recommendation = 'Apply sulfur powder or potassium bicarbonate solution immediately. Ensure good air circulation.'
    elif 'downy' in disease_lower:
        recommendation = 'Use copper sulfate or fixed copper fungicides. Reduce humidity and improve drainage.'
    elif 'blight' in disease_lower:
        recommendation = 'Apply recommended fungicide and remove heavily infected leaves. Avoid overhead irrigation.'
    elif 'spot' in disease_lower:
        recommendation = 'Remove affected leaves and apply copper-based fungicide. Improve ventilation around plants.'
    elif 'virus' in disease_lower:
        recommendation = 'Remove infected plants and control insect vectors. Use certified disease-free seedlings.'
    elif 'purple' in disease_lower or 'blotch' in disease_lower:
        recommendation = 'Apply mancozeb or chlorothalonil fungicides. Improve air circulation and reduce humidity.'
    elif 'stemphylium' in disease_lower:
        recommendation = 'Remove infected leaves and apply copper-based fungicide. Avoid overhead irrigation.'
    elif 'rot' in disease_lower or 'fusarium' in disease_lower:
        recommendation = 'Remove infected plants immediately. Practice crop rotation and use disease-free sets.'
    else:
        recommendation = 'Apply appropriate treatment as per local agricultural guidelines and monitor progression closely.'

    return severity, recommendation

def preprocess_image(image_data, target_size=(224, 224)):
    """
    Preprocess image for model prediction
    Args:
        image_data: base64 encoded image string or PIL Image
        target_size: tuple of (height, width)
    Returns:
        numpy array of preprocessed image
    """
    try:
        # If it's a base64 string, decode it
        if isinstance(image_data, str):
            if image_data.startswith('data:image'):
                # Handle data URL format
                image_data = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_data)
            image = Image.open(BytesIO(image_bytes))
        else:
            image = image_data
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize to target size
        image = image.resize(target_size, Image.Resampling.LANCZOS)
        
        # Convert to numpy array
        image_array = np.array(image, dtype=np.float32)
        
        # Normalize to 0-1 range
        image_array = image_array / 255.0
        
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        
        return image_array
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def predict_disease(image_data, crop_type='grapes'):
    """
    Predict disease from image
    Args:
        image_data: base64 encoded image or image path
        crop_type: type of crop
    Returns:
        dict with prediction results
    """
    try:
        normalized_crop, model = load_model_for_crop(crop_type)
        class_names = load_class_names(normalized_crop)
        
        # Preprocess image
        processed_image = preprocess_image(image_data)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        
        # Get the class with highest probability
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class]) * 100

        if predicted_class < len(class_names):
            disease_name = class_names[predicted_class]
        else:
            disease_name = f"Disease {predicted_class}"

        severity, recommendation = build_recommendation(disease_name, confidence)
        
        return {
            "disease": disease_name,
            "confidence": round(confidence, 2),
            "severity": severity,
            "recommendation": recommendation,
            "crop": normalized_crop
        }
    except Exception as e:
        raise ValueError(f"Error during prediction: {str(e)}")

def main():
    try:
        # Read input from stdin
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        image_data = data.get('image')
        crop_type = data.get('crop', 'grapes')
        
        if not image_data:
            print(json.dumps({"error": "No image data provided"}))
            sys.exit(1)
        
        result = predict_disease(image_data, crop_type)
        print(json.dumps(result))
        
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

