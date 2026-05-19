/**
 * Gera favicon a partir da logo em public/livraria-images/livraria-logo.jpeg
 * Uso: node scripts/generate-favicon.mjs
 */
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/livraria-images/livraria-logo.jpeg");
const appDir = path.join(root, "src/app");

const sizes = [
  { file: "icon.png", size: 32 },
  { file: "apple-icon.png", size: 180 },
];

for (const { file, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(appDir, file));
  console.log(`✓ src/app/${file} (${size}×${size})`);
}
