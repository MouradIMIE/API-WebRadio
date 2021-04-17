import { Router } from 'express';
import { SongController } from '../controllers/songController/SongController';
import { authMiddleware } from '../middleware/authMiddleware';

const songRoutes = Router();

songRoutes.post('/addSong',[authMiddleware],SongController.addSong);

export default songRoutes;