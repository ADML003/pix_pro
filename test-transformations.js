// Test file to verify Cloudinary transformations
import { getCldImageUrl } from "next-cloudinary";

// Test configurations for new features
const testConfigs = {
  crop: {
    crop: "auto",
    gravity: "auto",
    quality: "auto:good",
  },
  compress: {
    quality: "auto:good",
    format: "auto",
    flags: ["progressive", "immutable_cache"],
  },
};

// Test function to generate URLs
export const testTransformations = (publicId: string) => {
  const cropUrl = getCldImageUrl({
    width: 800,
    height: 600,
    src: publicId,
    ...testConfigs.crop,
  });

  const compressUrl = getCldImageUrl({
    width: 800,
    height: 600,
    src: publicId,
    ...testConfigs.compress,
  });

  console.log("Crop URL:", cropUrl);
  console.log("Compress URL:", compressUrl);

  return { cropUrl, compressUrl };
};

export default testConfigs;
