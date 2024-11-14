import { Request, Response, NextFunction } from 'express';
import { Lesson } from '../models/Lesson';
import { Player } from '../models/Player';
import { Teacher } from '../models/Teacher';
import { Parent } from '../models/Parent';
import { GameMap } from '../models/GameMap';
import { CustomError } from '../utils/customError';

export const gameController = {
  // Lesson Controllers
  async addLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = new Lesson({
        ...req.body,
        teacherId: req.user.userId
      });
      await lesson.save();
      res.status(201).json(lesson);
    } catch (error) {
      next(error);
    }
  },

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await Lesson.findOneAndUpdate(
        { _id: req.params.id, teacherId: req.user.userId },
        req.body,
        { new: true }
      );
      if (!lesson) throw new CustomError('Lesson not found', 404);
      res.json(lesson);
    } catch (error) {
      next(error);
    }
  },

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await Lesson.findOneAndDelete({
        _id: req.params.id,
        teacherId: req.user.userId
      });
      if (!lesson) throw new CustomError('Lesson not found', 404);
      res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Player Controllers
  async addPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const player = new Player({
        ...req.body,
        userId: req.user.userId
      });
      await player.save();
      res.status(201).json(player);
    } catch (error) {
      next(error);
    }
  },

  async updatePlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const player = await Player.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!player) throw new CustomError('Player not found', 404);
      res.json(player);
    } catch (error) {
      next(error);
    }
  },

  async deletePlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const player = await Player.findOneAndDelete({
        _id: req.params.id
      });
      if (!player) throw new CustomError('Player not found', 404);
      res.json({ message: 'Player deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Teacher Controllers
  async addTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacher = new Teacher({
        ...req.body,
        userId: req.user.userId
      });
      await teacher.save();
      res.status(201).json(teacher);
    } catch (error) {
      next(error);
    }
  },

  async updateTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacher = await Teacher.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!teacher) throw new CustomError('Teacher not found', 404);
      res.json(teacher);
    } catch (error) {
      next(error);
    }
  },

  async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacher = await Teacher.findOneAndDelete({
        _id: req.params.id
      });
      if (!teacher) throw new CustomError('Teacher not found', 404);
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Parent Controllers
  async addParent(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = new Parent({
        ...req.body,
        userId: req.user.userId
      });
      await parent.save();
      res.status(201).json(parent);
    } catch (error) {
      next(error);
    }
  },

  async updateParent(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await Parent.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!parent) throw new CustomError('Parent not found', 404);
      res.json(parent);
    } catch (error) {
      next(error);
    }
  },

  async deleteParent(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await Parent.findOneAndDelete({
        _id: req.params.id
      });
      if (!parent) throw new CustomError('Parent not found', 404);
      res.json({ message: 'Parent deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Map Controllers
  async addMap(req: Request, res: Response, next: NextFunction) {
    try {
      const map = new GameMap(req.body);
      await map.save();
      res.status(201).json(map);
    } catch (error) {
      next(error);
    }
  },

  async updateMap(req: Request, res: Response, next: NextFunction) {
    try {
      const map = await GameMap.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!map) throw new CustomError('Map not found', 404);
      res.json(map);
    } catch (error) {
      next(error);
    }
  },

  async deleteMap(req: Request, res: Response, next: NextFunction) {
    try {
      const map = await GameMap.findByIdAndDelete(req.params.id);
      if (!map) throw new CustomError('Map not found', 404);
      res.json({ message: 'Map deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // User Approval Controllers
  async approvePendingUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await Teacher.findByIdAndUpdate(
        req.params.id,
        { isVerified: true },
        { new: true }
      );
      if (!user) throw new CustomError('User not found', 404);
      res.json({ message: 'User approved successfully' });
    } catch (error) {
      next(error);
    }
  },

  async rejectPendingUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await Teacher.findByIdAndDelete(req.params.id);
      if (!user) throw new CustomError('User not found', 404);
      res.json({ message: 'User rejected successfully' });
    } catch (error) {
      next(error);
    }
  }
};