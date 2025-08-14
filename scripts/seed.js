/*
  Seed script to upload example images to Cloudinary with tags and context.
  Usage:
    1) Ensure .env.local has:
       - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
       - CLOUDINARY_API_KEY
       - CLOUDINARY_API_SECRET
       - CLOUDINARY_FOLDER
    2) Run: npm run seed
*/

const fs = require("fs");
const path = require("path");

// Load env (.env.local first, then .env)
try {
  const dotenv = require("dotenv");
  const localEnv = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(localEnv)) {
    dotenv.config({ path: localEnv, override: true });
  } else {
    dotenv.config();
  }
} catch (e) {
  // dotenv is optional if you export env in your shell
}

const cloudinary = require("cloudinary").v2;

const required = [
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_FOLDER",
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing env var: ${key}`);
    process.exit(1);
  }
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folder = process.env.CLOUDINARY_FOLDER;

const samples = [
  {
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
    context: {
      caption: "Golden Hour Portrait",
      camera: "Mamiya 645",
      film: "Kodak Portra 400",
      settings: "f/2.8 · 1/250s",
    },
    tags: ["camera:Mamiya 645", "film:Portra 400", "theme:Golden Hour"],
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    context: {
      caption: "Street Scene",
      camera: "Ricoh FF-9",
      film: "Kodak Ektar 100",
      settings: "f/8 · 1/500s",
    },
    tags: ["camera:Ricoh FF-9", "film:Ektar 100", "theme:Fun Stuffs"],
  },
  {
    url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80",
    context: {
      caption: "City Lights at Night",
      camera: "Canon A1",
      film: "Cinestill 800T",
      settings: "f/1.8 · 1/60s",
    },
    tags: ["camera:Canon A1", "film:Cinestill 800T", "theme:Sharpest Aperture"],
  },
  {
    url: "https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&w=1600&q=80",
    context: {
      caption: "Square Composition Portrait",
      camera: "Yashica D",
      film: "Kodak Portra 160",
      settings: "f/4 · 1/125s",
    },
    tags: ["camera:Yashica D", "film:Portra 160", "theme:Golden Hour"],
  },
  {
    url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1600&q=80",
    context: {
      caption: "Daylight Scene",
      camera: "Olympus AF-1 Twin",
      film: "Kodak Ektar 100",
      settings: "f/5.6 · 1/250s",
    },
    tags: ["camera:Olympus AF-1 Twin", "film:Ektar 100", "theme:Fun Stuffs"],
  },
];

async function main() {
  console.log(`Uploading ${samples.length} samples to folder '${folder}' ...`);
  for (const sample of samples) {
    try {
      const res = await cloudinary.uploader.upload(sample.url, {
        folder,
        tags: sample.tags,
        context: sample.context,
        overwrite: false,
      });
      console.log(`✓ Uploaded: ${res.public_id} (${res.secure_url})`);
    } catch (err) {
      console.error("Upload failed:", err?.message || err);
    }
  }
  console.log("Done.");
}

main();


