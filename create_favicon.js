const fs = require("fs");

// Create a simple ICO file with proper header
const createICO = () => {
  // ICO header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 for ICO)
  header.writeUInt16LE(1, 4); // Number of images

  // Image directory entry (16 bytes)
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(16, 0); // Width (16 pixels)
  dirEntry.writeUInt8(16, 1); // Height (16 pixels)
  dirEntry.writeUInt8(0, 2); // Color palette (0 = no palette)
  dirEntry.writeUInt8(0, 3); // Reserved
  dirEntry.writeUInt16LE(1, 4); // Color planes
  dirEntry.writeUInt16LE(32, 6); // Bits per pixel (32-bit RGBA)
  dirEntry.writeUInt32LE(1024 + 40, 8); // Size of image data (1024 for 16x16 32-bit + 40 for BMP header)
  dirEntry.writeUInt32LE(22, 12); // Offset to image data

  // BMP header (40 bytes)
  const bmpHeader = Buffer.alloc(40);
  bmpHeader.writeUInt32LE(40, 0); // Header size
  bmpHeader.writeInt32LE(16, 4); // Width
  bmpHeader.writeInt32LE(32, 8); // Height (double for ICO)
  bmpHeader.writeUInt16LE(1, 12); // Planes
  bmpHeader.writeUInt16LE(32, 14); // Bits per pixel
  bmpHeader.writeUInt32LE(0, 16); // Compression
  bmpHeader.writeUInt32LE(1024, 20); // Image size
  bmpHeader.writeUInt32LE(0, 24); // X pixels per meter
  bmpHeader.writeUInt32LE(0, 28); // Y pixels per meter
  bmpHeader.writeUInt32LE(0, 32); // Colors used
  bmpHeader.writeUInt32LE(0, 36); // Important colors

  // Create 16x16 pixel data (blue background with white design)
  const pixelData = Buffer.alloc(1024); // 16x16 * 4 bytes per pixel

  // Blue color (BGRA format)
  const blue = [0xf6, 0x82, 0x3b, 0xff]; // #3B82F6
  const white = [0xff, 0xff, 0xff, 0xff];

  // Fill background with blue
  for (let i = 0; i < 256; i++) {
    pixelData[i * 4] = blue[0];
    pixelData[i * 4 + 1] = blue[1];
    pixelData[i * 4 + 2] = blue[2];
    pixelData[i * 4 + 3] = blue[3];
  }

  // Add white pixels for a simple camera icon
  const setPixel = (x, y, color) => {
    const index = ((15 - y) * 16 + x) * 4; // Flip Y coordinate
    pixelData[index] = color[0];
    pixelData[index + 1] = color[1];
    pixelData[index + 2] = color[2];
    pixelData[index + 3] = color[3];
  };

  // Draw a simple camera icon
  for (let x = 4; x < 12; x++) {
    for (let y = 4; y < 12; y++) {
      if (x === 4 || x === 11 || y === 4 || y === 11) {
        setPixel(x, y, white);
      }
    }
  }

  // Center circle
  setPixel(7, 7, white);
  setPixel(8, 7, white);
  setPixel(7, 8, white);
  setPixel(8, 8, white);

  // Combine all parts
  const ico = Buffer.concat([header, dirEntry, bmpHeader, pixelData]);

  return ico;
};

// Write the ICO file
fs.writeFileSync("public/favicon.ico", createICO());
console.log("Favicon.ico created successfully");
