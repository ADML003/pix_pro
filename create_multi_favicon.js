const fs = require("fs");

// Create a proper ICO file with 16x16 and 32x32 sizes
const createMultiSizeICO = () => {
  // ICO header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 for ICO)
  header.writeUInt16LE(2, 4); // Number of images (16x16 and 32x32)

  // Image directory entries (16 bytes each)
  const createDirEntry = (size, offset, dataSize) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette (0 = no palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel (32-bit RGBA)
    entry.writeUInt32LE(dataSize, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data
    return entry;
  };

  // Create pixel data for different sizes
  const createPixelData = (size) => {
    const pixelData = Buffer.alloc(size * size * 4 + 40); // +40 for BMP header

    // BMP header (40 bytes)
    const bmpHeader = Buffer.alloc(40);
    bmpHeader.writeUInt32LE(40, 0); // Header size
    bmpHeader.writeInt32LE(size, 4); // Width
    bmpHeader.writeInt32LE(size * 2, 8); // Height (double for ICO)
    bmpHeader.writeUInt16LE(1, 12); // Planes
    bmpHeader.writeUInt16LE(32, 14); // Bits per pixel
    bmpHeader.writeUInt32LE(0, 16); // Compression
    bmpHeader.writeUInt32LE(size * size * 4, 20); // Image size
    bmpHeader.writeUInt32LE(0, 24); // X pixels per meter
    bmpHeader.writeUInt32LE(0, 28); // Y pixels per meter
    bmpHeader.writeUInt32LE(0, 32); // Colors used
    bmpHeader.writeUInt32LE(0, 36); // Important colors

    // Blue color (BGRA format)
    const blue = [0xf6, 0x82, 0x3b, 0xff]; // #3B82F6
    const white = [0xff, 0xff, 0xff, 0xff];

    // Create image data
    const imageData = Buffer.alloc(size * size * 4);

    // Fill background with blue
    for (let i = 0; i < size * size; i++) {
      imageData[i * 4] = blue[0];
      imageData[i * 4 + 1] = blue[1];
      imageData[i * 4 + 2] = blue[2];
      imageData[i * 4 + 3] = blue[3];
    }

    // Add simple icon pattern
    const setPixel = (x, y, color) => {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        const index = ((size - 1 - y) * size + x) * 4; // Flip Y coordinate
        imageData[index] = color[0];
        imageData[index + 1] = color[1];
        imageData[index + 2] = color[2];
        imageData[index + 3] = color[3];
      }
    };

    // Draw a simple camera/photo icon
    const center = Math.floor(size / 2);
    const iconSize = Math.floor(size * 0.6);
    const start = center - Math.floor(iconSize / 2);
    const end = start + iconSize;

    // Draw border
    for (let x = start; x < end; x++) {
      for (let y = start; y < end; y++) {
        if (x === start || x === end - 1 || y === start || y === end - 1) {
          setPixel(x, y, white);
        }
      }
    }

    // Draw center elements
    const centerOffset = Math.floor(iconSize * 0.3);
    for (let x = center - centerOffset; x <= center + centerOffset; x++) {
      for (let y = center - centerOffset; y <= center + centerOffset; y++) {
        const dx = x - center;
        const dy = y - center;
        if (dx * dx + dy * dy <= centerOffset * centerOffset) {
          setPixel(x, y, white);
        }
      }
    }

    // Small center circle
    const smallCenter = Math.floor(centerOffset * 0.5);
    for (let x = center - smallCenter; x <= center + smallCenter; x++) {
      for (let y = center - smallCenter; y <= center + smallCenter; y++) {
        const dx = x - center;
        const dy = y - center;
        if (dx * dx + dy * dy <= smallCenter * smallCenter) {
          setPixel(x, y, blue);
        }
      }
    }

    return Buffer.concat([bmpHeader, imageData]);
  };

  // Create data for both sizes
  const size16Data = createPixelData(16);
  const size32Data = createPixelData(32);

  // Calculate offsets
  const size16Offset = 6 + 32; // Header + 2 directory entries
  const size32Offset = size16Offset + size16Data.length;

  // Create directory entries
  const dir16 = createDirEntry(16, size16Offset, size16Data.length);
  const dir32 = createDirEntry(32, size32Offset, size32Data.length);

  // Combine all parts
  const ico = Buffer.concat([header, dir16, dir32, size16Data, size32Data]);

  return ico;
};

// Write both ICO files
const icoData = createMultiSizeICO();
fs.writeFileSync("public/favicon.ico", icoData);
fs.writeFileSync("app/favicon.ico", icoData);

console.log("Multi-size favicon.ico created successfully in both locations");
