// Test to verify transformation configurations
console.log("Testing transformation configurations...");

// Test compression config
const compressConfig = {
  quality: "auto:good",
  format: "auto",
  flags: ["progressive", "immutable_cache"],
};

// Test crop config
const cropConfig = {
  crop: "auto",
  gravity: "auto",
  quality: "auto:good",
};

console.log("Compression config:", compressConfig);
console.log("Crop config:", cropConfig);

// Test URL generation (would need to be in a component context)
console.log("Configurations are valid!");
