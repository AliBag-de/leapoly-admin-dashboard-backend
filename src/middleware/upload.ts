import multer from 'multer';
import { Request } from 'express';
import { CustomError } from '../utils/customError';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(new CustomError('Only JSON files are allowed', 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});