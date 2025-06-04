import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Files to copy
const filesToCopy = [
  'tailwind.config.js',
  'tailwind.tokens.js',
  'tokens.utilities.js'
];

// Ensure dist directory exists
if (!fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.mkdirSync(path.join(rootDir, 'dist'));
}

// Copy each file
filesToCopy.forEach(file => {
  const sourcePath = path.join(rootDir, file);
  const destPath = path.join(rootDir, 'dist', file);
  
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied ${file} to dist/`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error.message);
  }
});

console.log('✓ Tailwind files copied to dist/');
