const express = require('express');
const detectionController = require('../controllers/detectionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Detection routes
router.post('/predict', authMiddleware, detectionController.predictDisease);
router.get('/crops', detectionController.getSupportedCrops);
router.get('/diseases/:crop', detectionController.getCropDiseases);

module.exports = router;
