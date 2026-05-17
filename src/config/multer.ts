import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import { Request } from 'express';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req: Request, file: Express.Multer.File) => ({
    folder: 'mind-group-blog',
    format: file.mimetype.split('/')[1],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  },
});

export default upload;