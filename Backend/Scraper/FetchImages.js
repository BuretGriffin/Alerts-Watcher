import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function downloadImage(url, filename = 'kplc_outage.jpg') {
  const outputPath = path.join('./', filename);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(outputPath, response.data);
  console.log('Downloaded image to', outputPath);
  return outputPath;
}