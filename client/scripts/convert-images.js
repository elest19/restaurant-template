import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');

const pngFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

async function convertToWebP() {
  for (const pngFile of pngFiles) {
    const inputPath = path.join(inputDir, pngFile);
    const outputPath = path.join(outputDir, pngFile.replace('.png', '.webp'));
    
    const stats = fs.statSync(inputPath);
    const originalSizeKB = (stats.size / 1024).toFixed(2);
    
    try {
      await sharp(inputPath)
        .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      
      console.log(`✓ ${pngFile}`);
      console.log(`  Original: ${originalSizeKB} KB → WebP: ${newSizeKB} KB`);
    } catch (err) {
      console.error(`✗ Failed to convert ${pngFile}:`, err.message);
    }
  }
}

convertToWebP();
