import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export const useDetection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictDisease = async (imageBase64, cropName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('Authentication required. Please log in first.');
      }
      
      const response = await fetch(`${API_BASE_URL}/detection/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: imageBase64,
          crop: cropName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to predict disease');
      }

      const data = await response.json();
      setLoading(false);
      
      return data.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const getSupportedCrops = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/detection/crops`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch crops');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const getCropDiseases = async (cropName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/detection/diseases/${cropName}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch diseases');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  return {
    predictDisease,
    getSupportedCrops,
    getCropDiseases,
    loading,
    error,
  };
};
