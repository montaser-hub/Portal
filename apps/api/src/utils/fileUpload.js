import sharp from "sharp";
import fs from "fs";
import path from "path";

export const resizeAndSaveImage = async (file, options = {}) => {
  const {
    folder = "assets/images/users", // default save folder
    prefix = "file",
    width = 500,
    height = 500,
    quality = 90,
  } = options;

  if (!file) return null;

  const filename = `${prefix}-${Date.now()}.jpeg`;
  const filepath = path.join(folder, filename);

  // Ensure folder exists
  fs.mkdirSync(folder, { recursive: true });

  // Process and save image
  await sharp(file.buffer)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality })
    .toFile(filepath);

  return filename;
};
