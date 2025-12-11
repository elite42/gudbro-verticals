/**
 * PWA Icon Generator Script
 *
 * This script generates PNG icons for the PWA manifest using Node.js canvas.
 * Run: node scripts/generate-pwa-icons.js
 *
 * Prerequisites:
 *   npm install canvas --save-dev
 *
 * If canvas is not available, use the fallback method with sharp:
 *   npm install sharp --save-dev
 */

const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Colors from the brand
const BACKGROUND_COLOR = '#1E293B'; // Dark slate
const ACCENT_COLOR = '#DC2626'; // Red

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../public/icons/pwa');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate a simple placeholder icon
 * This creates a minimal valid PNG that can be replaced later
 */
function generatePlaceholderPNG(size) {
  // Create a minimal 8-bit grayscale PNG
  // PNG structure: signature + IHDR + IDAT + IEND

  const width = size;
  const height = size;

  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk (image header)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);   // width
  ihdrData.writeUInt32BE(height, 4);  // height
  ihdrData.writeUInt8(8, 8);          // bit depth (8)
  ihdrData.writeUInt8(2, 9);          // color type (RGB)
  ihdrData.writeUInt8(0, 10);         // compression method
  ihdrData.writeUInt8(0, 11);         // filter method
  ihdrData.writeUInt8(0, 12);         // interlace method

  const ihdrCRC = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdrChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 13]), // length
    Buffer.from('IHDR'),
    ihdrData,
    Buffer.from([(ihdrCRC >> 24) & 0xff, (ihdrCRC >> 16) & 0xff, (ihdrCRC >> 8) & 0xff, ihdrCRC & 0xff])
  ]);

  // Create raw pixel data (RGB)
  const rawData = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35;

  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte for each row
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      // Draw background
      let r = 0x1E; // Background red
      let g = 0x29; // Background green
      let b = 0x3B; // Background blue

      // Draw red circle in center
      if (dist < radius) {
        r = 0xDC; // Accent red
        g = 0x26; // Accent green
        b = 0x26; // Accent blue
      }

      // Add a simple R letter
      if (dist < radius * 0.6 && dist > radius * 0.3) {
        const angle = Math.atan2(y - centerY, x - centerX);
        if (angle > -Math.PI * 0.7 && angle < Math.PI * 0.2) {
          r = 255;
          g = 255;
          b = 255;
        }
      }

      rawData.push(r, g, b);
    }
  }

  // Compress with zlib (deflate)
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });

  // IDAT chunk (image data)
  const idatCRC = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]));
  const idatLength = Buffer.alloc(4);
  idatLength.writeUInt32BE(compressed.length, 0);
  const idatChunk = Buffer.concat([
    idatLength,
    Buffer.from('IDAT'),
    compressed,
    Buffer.from([(idatCRC >> 24) & 0xff, (idatCRC >> 16) & 0xff, (idatCRC >> 8) & 0xff, idatCRC & 0xff])
  ]);

  // IEND chunk
  const iendCRC = crc32(Buffer.from('IEND'));
  const iendChunk = Buffer.from([
    0, 0, 0, 0, // length
    0x49, 0x45, 0x4E, 0x44, // IEND
    (iendCRC >> 24) & 0xff, (iendCRC >> 16) & 0xff, (iendCRC >> 8) & 0xff, iendCRC & 0xff
  ]);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 implementation for PNG chunks
function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = [];

  // Build CRC table
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  // Calculate CRC
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons
console.log('Generating PWA icons...');

for (const size of sizes) {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  try {
    const png = generatePlaceholderPNG(size);
    fs.writeFileSync(filepath, png);
    console.log(`✓ Generated ${filename} (${png.length} bytes)`);
  } catch (error) {
    console.error(`✗ Failed to generate ${filename}: ${error.message}`);
  }
}

// Also generate apple-touch-icon
const appleIcon = generatePlaceholderPNG(180);
fs.writeFileSync(path.join(OUTPUT_DIR, 'apple-touch-icon.png'), appleIcon);
console.log('✓ Generated apple-touch-icon.png');

console.log('\nDone! Icons generated in public/icons/pwa/');
console.log('\nNote: These are placeholder icons. For production, replace with properly designed icons.');
