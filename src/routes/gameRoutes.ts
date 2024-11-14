import express from 'express';
import { gameController } from '../controllers/gameController';
import { auth } from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';

export const gameRouter = express.Router();

// Lesson routes
gameRouter.post('/lessons', auth, checkRole(['teacher']), gameController.addLesson);
gameRouter.put('/lessons/:id', auth, checkRole(['teacher']), gameController.updateLesson);
gameRouter.delete('/lessons/:id', auth, checkRole(['teacher']), gameController.deleteLesson);

// Player routes
gameRouter.post('/players', auth, gameController.addPlayer);
gameRouter.put('/players/:id', auth, checkRole(['admin']), gameController.updatePlayer);
gameRouter.delete('/players/:id', auth, checkRole(['admin']), gameController.deletePlayer);

// Teacher routes
gameRouter.post('/teachers', auth, checkRole(['admin']), gameController.addTeacher);
gameRouter.put('/teachers/:id', auth, checkRole(['admin']), gameController.updateTeacher);
gameRouter.delete('/teachers/:id', auth, checkRole(['admin']), gameController.deleteTeacher);

// Parent routes
gameRouter.post('/parents', auth, gameController.addParent);
gameRouter.put('/parents/:id', auth, checkRole(['admin']), gameController.updateParent);
gameRouter.delete('/parents/:id', auth, checkRole(['admin']), gameController.deleteParent);

// Map routes
gameRouter.post('/maps', auth, checkRole(['admin', 'teacher']), gameController.addMap);
gameRouter.put('/maps/:id', auth, checkRole(['admin', 'teacher']), gameController.updateMap);
gameRouter.delete('/maps/:id', auth, checkRole(['admin']), gameController.deleteMap);

// User approval routes
gameRouter.post('/approve/:id', auth, checkRole(['admin']), gameController.approvePendingUser);
gameRouter.post('/reject/:id', auth, checkRole(['admin']), gameController.rejectPendingUser);