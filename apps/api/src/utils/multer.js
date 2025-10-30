import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (type = 'image') => (req, file, cb) => {
  if (type === 'image' && !file.mimetype.startsWith('image')) {
    throw new Error('Please upload a valid image file')
  }
  cb(null, true);
};

export const uploadSingle = (fieldName, type = 'image') => {
  return multer({ storage, fileFilter: fileFilter(type) }).single(fieldName);
};

export const uploadMultiple = (fieldName, maxCount = 5, type = 'image') => {
  return multer({ storage, fileFilter: fileFilter(type) }).array(fieldName, maxCount);
};
