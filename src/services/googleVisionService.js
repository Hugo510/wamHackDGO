// services/googleVisionService.js
const vision = require('@google-cloud/vision');
const config = require('../config/config');

const client = new vision.ImageAnnotatorClient({
    projectId: config.googleCloud.projectId,
    keyFilename: config.googleCloud.keyFilename,
});

const performOCR = async (imagePath) => {
    try {
        const [result] = await client.textDetection(imagePath);
        const detections = result.textAnnotations;
        if (detections.length > 0) {
            return detections[0].description;
        } else {
            throw new Error('No se detectó texto en la imagen.');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { performOCR };
