

import express from 'express';
import bodyParser from 'body-parser';
import * as tf from '@tensorflow/tfjs';
import fs from 'fs';

const app = express();
const port = 3000;




async function loadModel() {
    const modelPath = '.\backend dev\model\model.json';
    const model = await tf.loadLayersModel('file://' + modelPath);
    return model;
}


app.use(bodyParser.json());

app.post('/predict', async (req, res) => {
    try {
        
        const model = await loadModel();

        
        const inputData = req.body.input;
        const processedData = tf.tensor(inputData);

        
        const predictions = model.predict(processedData);        
        
} catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Prediction failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
