import * as vision from '@google-cloud/vision';

require('dotenv').config();

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_CRED
});

export const imageToText = async (fileName) => {
    const [result] = await client.textDetection(`gs://${process.env.G_BUCKET_NAME}/${fileName}`);
    const detections = result.textAnnotations;
    return detections[0].description.replace(/\n/g, "<br />")
};