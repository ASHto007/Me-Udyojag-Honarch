import sharp from 'sharp';
import path from 'path';

const assetsDir = 'd:/Mi udyojak honarach 2/Me-Udyojag-Honarch/public/assets';

const outW = 600;
const outH = 800;

function getBackgroundSvg() {
  return `
<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="studioGlow" cx="50%" cy="30%" r="58%">
      <stop offset="0%" stop-color="#1E2F46" />
      <stop offset="50%" stop-color="#111D2D" />
      <stop offset="100%" stop-color="#080E18" />
    </radialGradient>
    <linearGradient id="bottomShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="65%" stop-color="#080E18" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#080E18" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#studioGlow)" />
  <rect width="100%" height="100%" fill="url(#bottomShadow)" />
</svg>
`;
}

async function processRealMentor(filename, outputName, isBgFn, scaleMultiplier = 1.0) {
  const inputPath = path.join(assetsDir, filename);
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Flood fill ONLY from the top edge and top-half side edges
  // NEVER seed from bottom so we never enter shirts, collars or suits!
  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    queue.push(0 * width + x);
  }
  for (let y = 0; y < Math.floor(height * 0.45); y++) {
    queue.push(y * width + 0);
    queue.push(y * width + (width - 1));
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    if (visited[idx]) continue;

    const p = idx * 3;
    const r = data[p], g = data[p + 1], b = data[p + 2];

    if (isBgFn(r, g, b)) {
      visited[idx] = 1;
      const x = idx % width;
      const y = Math.floor(idx / width);
      if (x > 0 && !visited[idx - 1]) queue.push(idx - 1);
      if (x < width - 1 && !visited[idx + 1]) queue.push(idx + 1);
      if (y > 0 && !visited[idx - width]) queue.push(idx - width);
      if (y < height - 1 && !visited[idx + width]) queue.push(idx + width);
    }
  }

  // Construct clean RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const p3 = i * 3;
    const p4 = i * 4;
    rgba[p4] = data[p3];
    rgba[p4 + 1] = data[p3 + 1];
    rgba[p4 + 2] = data[p3 + 2];
    rgba[p4 + 3] = visited[i] ? 0 : 255;
  }

  const personPng = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();

  const maxW = Math.min(outW, Math.round(outW * scaleMultiplier));
  const maxH = Math.round(outH * 0.88);

  const resized = await sharp(personPng)
    .resize(maxW, maxH, { fit: 'inside', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.3 })
    .toBuffer();

  const rMeta = await sharp(resized).metadata();
  const bgBuffer = await sharp(Buffer.from(getBackgroundSvg())).png().toBuffer();

  const left = Math.max(0, Math.round((outW - rMeta.width) / 2));
  const top = Math.max(0, outH - rMeta.height);

  await sharp(bgBuffer)
    .composite([
      {
        input: resized,
        left,
        top
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, outputName));

  console.log(`Successfully processed authentic ${outputName}`);
}

// 1. Mentor 1: Pravin Mane (~247 flat background)
await processRealMentor(
  'WhatsApp Image 2026-09-17 at 3.17.07 PM.jpeg',
  'mentor-1.jpg',
  (r, g, b) => Math.abs(r - 247) <= 12 && Math.abs(g - 247) <= 12 && Math.abs(b - 247) <= 12,
  1.0
);

// 2. Mentor 2: Dr. Sunil Kulkarni (Pure white background r,g,b >= 238)
await processRealMentor(
  'WhatsApp Image 2026-09-17 at 3.17.10 PM (1).jpeg',
  'mentor-2.jpg',
  (r, g, b) => r >= 238 && g >= 238 && b >= 238,
  1.0
);

// 3. Mentor 3: Aniket Shinde (~247 flat background)
await processRealMentor(
  'WhatsApp Image 2026-09-17 at 3.17.11 PM (1).jpeg',
  'mentor-3.jpg',
  (r, g, b) => Math.abs(r - 247) <= 12 && Math.abs(g - 247) <= 12 && Math.abs(b - 247) <= 12,
  1.0
);

// 4. Mentor 4: CA Rajesh Deshmukh (~247 flat background)
await processRealMentor(
  'WhatsApp Image 2026-09-17 at 3.17.11 PM.jpeg',
  'mentor-4.jpg',
  (r, g, b) => Math.abs(r - 247) <= 12 && Math.abs(g - 247) <= 12 && Math.abs(b - 247) <= 12,
  1.0
);

// 5. Mentor 5: Keynote Speaker with Pheta (~247 flat background)
await processRealMentor(
  'WhatsApp Image 2026-09-17 at 3.17.12 PM.jpeg',
  'mentor-5.jpg',
  (r, g, b) => Math.abs(r - 247) <= 12 && Math.abs(g - 247) <= 12 && Math.abs(b - 247) <= 12,
  1.0
);

// 6. Mentor 6: Hanmantrao Gaikwad (BVG India Chairman)
// Crop to eliminate the Google Lens watermark in bottom-left and apply vignette
const hgInput = path.join(assetsDir, 'WhatsApp Image 2026-09-17 at 3.17.13 PM.jpeg');
const hgCropped = await sharp(hgInput)
  .extract({ left: 140, top: 10, width: 820, height: 1050 })
  .resize(outW, outH, { fit: 'cover' })
  .modulate({ brightness: 0.95, saturation: 1.05 })
  .sharpen({ sigma: 0.9, m1: 0.6, m2: 0.3 })
  .toBuffer();

const hgVignetteSvg = `
<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="40%" r="55%">
      <stop offset="50%" stop-color="#000000" stop-opacity="0" />
      <stop offset="85%" stop-color="#080E18" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#080E18" stop-opacity="0.95" />
    </radialGradient>
    <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="50%" stop-color="transparent" />
      <stop offset="100%" stop-color="#080E18" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#vignette)" />
  <rect width="100%" height="100%" fill="url(#bottomGrad)" />
</svg>
`;

await sharp(hgCropped)
  .composite([
    {
      input: Buffer.from(hgVignetteSvg),
      left: 0,
      top: 0
    }
  ])
  .jpeg({ quality: 95 })
  .toFile(path.join(assetsDir, 'mentor-6.jpg'));

console.log('Successfully processed authentic mentor-6.jpg');

// 7. Nilesh More (Founder)
// Process Nilesh More.png directly from the high-res keynote photo
const nmInput = path.join(assetsDir, 'Nilesh More.png');
await sharp(nmInput)
  .extract({ left: 30, top: 0, width: 1080, height: 1350 })
  .resize(900, 1125, { fit: 'cover' })
  .sharpen({ sigma: 1.0, m1: 0.8, m2: 0.4 })
  .modulate({ brightness: 1.02, saturation: 1.05 })
  .jpeg({ quality: 95 })
  .toFile(path.join(assetsDir, 'nilesh-more.jpg'));

console.log('Successfully processed authentic real nilesh-more.jpg');
