import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const assetsDir = 'd:/Mi udyojak honarach 2/Me-Udyojag-Honarch/public/assets';

// Test Pravin Mane
const inputPath = path.join(assetsDir, 'WhatsApp Image 2026-09-17 at 3.17.07 PM.jpeg');
const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

// Flood fill from borders to find flat ~247 background
const visited = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push(x);
  queue.push((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  queue.push(y * width);
  queue.push(y * width + (width - 1));
}

let head = 0;
while (head < queue.length) {
  const idx = queue[head++];
  if (visited[idx]) continue;
  
  const p = idx * 3;
  const r = data[p], g = data[p+1], b = data[p+2];
  
  const isBg = Math.abs(r - 247) <= 12 && Math.abs(g - 247) <= 12 && Math.abs(b - 247) <= 12;
  if (isBg) {
    visited[idx] = 1;
    const x = idx % width;
    const y = Math.floor(idx / width);
    if (x > 0 && !visited[idx - 1]) queue.push(idx - 1);
    if (x < width - 1 && !visited[idx + 1]) queue.push(idx + 1);
    if (y > 0 && !visited[idx - width]) queue.push(idx - width);
    if (y < height - 1 && !visited[idx + width]) queue.push(idx + width);
  }
}

// Build RGBA with transparency
const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const p3 = i * 3;
  const p4 = i * 4;
  rgba[p4] = data[p3];
  rgba[p4 + 1] = data[p3 + 1];
  rgba[p4 + 2] = data[p3 + 2];
  rgba[p4 + 3] = visited[i] ? 0 : 255;
}

// Convert to PNG with slight feather
const cutoutPng = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png()
  .toBuffer();

// Background SVG: Dark navy #0B1320 with executive amber radial glow
const outW = 600, outH = 750;
const bgSvg = `
<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ambGlow" cx="50%" cy="36%" r="55%">
      <stop offset="0%" stop-color="#1B2B3F" />
      <stop offset="50%" stop-color="#101C2C" />
      <stop offset="100%" stop-color="#080E18" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#ambGlow)" />
</svg>
`;

const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

// Scale cutout nicely to fill upper portion of the portrait card
const scaledCutout = await sharp(cutoutPng)
  .resize(520, 520, { fit: 'inside' })
  .png()
  .toBuffer();

const scaledMeta = await sharp(scaledCutout).metadata();

// Composite cutout onto background
const result = await sharp(bgBuffer)
  .composite([
    {
      input: scaledCutout,
      top: 50,
      left: Math.round((outW - scaledMeta.width) / 2)
    }
  ])
  .jpeg({ quality: 95 })
  .toFile(path.join(assetsDir, 'test-pravin-clean.jpg'));

console.log('Successfully generated test-pravin-clean.jpg');
