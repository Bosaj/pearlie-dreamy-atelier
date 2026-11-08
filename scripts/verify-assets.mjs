import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src', 'data', 'atelierData.ts');
const bespokeFile = path.join(rootDir, 'src', 'components', 'BespokeStudio.tsx');
const publicImagesDir = path.join(rootDir, 'public', 'images');

const sourceText =
  fs.readFileSync(dataFile, 'utf8') + '\n' + fs.readFileSync(bespokeFile, 'utf8');

const regex = /\.\/images\/([a-zA-Z0-9_.-]+\.(?:jpg|webp|png))/g;
const referenced = new Set();
let match;
while ((match = regex.exec(sourceText)) !== null) {
  referenced.add(match[1]);
}

let missing = 0;
for (const filename of referenced) {
  const fullPath = path.join(publicImagesDir, filename);
  if (!fs.existsSync(fullPath)) {
    console.error(`[ERROR] Missing referenced image asset: public/images/${filename}`);
    missing++;
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      console.error(`[ERROR] Empty (0-byte) image asset: public/images/${filename}`);
      missing++;
    }
  }
}

const allDiskFiles = fs
  .readdirSync(publicImagesDir)
  .filter((f) => /\.(jpg|webp|png)$/i.test(f));

console.log(
  `[verify:assets] Checked ${referenced.size} referenced media paths across ${allDiskFiles.length} total local assets in public/images/.`
);

if (missing > 0) {
  process.exit(1);
}
console.log('[verify:assets] All Instagram & Atelier image assets verified with non-zero byte size.');
