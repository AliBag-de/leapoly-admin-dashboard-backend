import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { CustomError } from '../utils/customError';

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new CustomError('Email already exists', 400);
      }

      const user = new User({ email, password, name });
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      res.status(201).json({ token, userId: user._id });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        throw new CustomError('Invalid credentials', 401);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new CustomError('Invalid credentials', 401);
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      res.json({ token, userId: user._id });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      
      const user = await User.findById(req.user.userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new CustomError('Email already exists', 400);
        }
        user.email = email;
      }

      if (name) {
        user.name = name;
      }

      await user.save();
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findByIdAndDelete(req.user.userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};