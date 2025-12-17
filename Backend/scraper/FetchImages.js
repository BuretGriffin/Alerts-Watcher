import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function downloadImage(url, index = 0) {
  const imagesDir = path.join(process.cwd(), 'downloaded-images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  const imagePath = path.join(imagesDir, `kplc_${index}.jpg`);

  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });

  fs.writeFileSync(imagePath, response.data);
  console.log('Downloaded image:', imagePath);

  return imagePath;
}