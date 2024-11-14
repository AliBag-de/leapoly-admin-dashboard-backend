import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { User } from '../models/User';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      if (!roles.includes(user.role)) {
        throw new CustomError('Unauthorized access', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};