export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Auto Crop & Focus",
    route: "/transformations/add/crop",
    icon: "/assets/icons/crop.svg",
  },
  {
    label: "Image Compression",
    route: "/transformations/add/compress",
    icon: "/assets/icons/compress.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/coins.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/stars.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
  crop: {
    type: "crop",
    title: "Auto Crop & Focus",
    subTitle: "Intelligent cropping with face and object detection",
    config: {
      crop: "auto",
      gravity: "auto",
      quality: "auto:good",
    },
    icon: "crop.svg",
  },
  compress: {
    type: "compress",
    title: "Image Compression",
    subTitle: "Optimize images for web while maintaining quality",
    config: {
      quality: "auto:good",
      format: "auto",
      flags: ["progressive", "immutable_cache"],
    },
    icon: "compress.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const compressionOptions = {
  "auto:best": {
    quality: "auto:best",
    label: "Best Quality",
    description: "Highest quality, larger file size",
  },
  "auto:good": {
    quality: "auto:good",
    label: "Good Quality",
    description: "Balanced quality and file size",
  },
  "auto:eco": {
    quality: "auto:eco",
    label: "Eco Mode",
    description: "Smaller file size, good for web",
  },
  "auto:low": {
    quality: "auto:low",
    label: "Low Quality",
    description: "Smallest file size, basic quality",
  },
};

export const formatOptions = {
  auto: {
    format: "auto",
    label: "Auto Format",
    description: "Automatically choose the best format",
  },
  webp: {
    format: "webp",
    label: "WebP",
    description: "Modern format with excellent compression",
  },
  avif: {
    format: "avif",
    label: "AVIF",
    description: "Next-gen format with superior compression",
  },
  jpg: {
    format: "jpg",
    label: "JPEG",
    description: "Traditional format, widely supported",
  },
  png: {
    format: "png",
    label: "PNG",
    description: "Lossless format, good for graphics",
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
  quality: "auto:good",
  format: "auto",
};

export const creditFee = -1;
