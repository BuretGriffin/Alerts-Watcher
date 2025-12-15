import Tesseract from 'tesseract.js';

export async function ocrImage(imagePath) {
  console.log('Starting OCR...');
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
    logger: m => console.log(m.status)
  });
  return text;
}