import { Request, Response, NextFunction } from 'express';
import { File } from '../models/File';
import { CustomError } from '../utils/customError';

export const fileController = {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new CustomError('No file uploaded', 400);
      }

      const fileContent = req.file.buffer.toString();
      let jsonData;
      
      try {
        jsonData = JSON.parse(fileContent);
      } catch (error) {
        throw new CustomError('Invalid JSON file', 400);
      }

      const file = new File({
        filename: req.file.filename || `file-${Date.now()}`,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedBy: req.user.userId,
        data: jsonData
      });

      await file.save();

      res.status(201).json({
        message: 'File uploaded successfully',
        file: {
          id: file._id,
          filename: file.originalName,
          size: file.size,
          uploadedAt: file.createdAt
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async getFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await File.find({ uploadedBy: req.user.userId })
        .select('filename originalName size createdAt')
        .sort({ createdAt: -1 });

      res.json(files);
    } catch (error) {
      next(error);
    }
  },

  async getFileById(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await File.findOne({
        _id: req.params.id,
        uploadedBy: req.user.userId
      });

      if (!file) {
        throw new CustomError('File not found', 404);
      }

      res.json(file);
    } catch (error) {
      next(error);
    }
  },

  async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await File.findOneAndDelete({
        _id: req.params.id,
        uploadedBy: req.user.userId
      });

      if (!file) {
        throw new CustomError('File not found', 404);
      }

      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};