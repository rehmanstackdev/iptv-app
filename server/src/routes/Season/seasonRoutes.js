import express from 'express';
import authenticateToken from '../../middlewares/authenticateToken.js';
import seasonController from '../../controllers/Season/seasonController.js';

const router = express.Router();

router.post('/seasons',authenticateToken, seasonController.createSeason);
router.get('/seasons',authenticateToken, seasonController.getallSeason);
router.get('/seasons/:id',authenticateToken, seasonController.getSeasonById);
router.patch('/seasons/:id',authenticateToken, seasonController.updateSeason);
router.delete('/seasons/:id', seasonController.deleteSeason);
//Get all episodes of a season by season id
router.get('/seasons/:id/episodes', seasonController.getEpisodeBySeasonId);
//Get Season Count
router.get('/season-count',authenticateToken, seasonController.getSeasonCount);
export const seasonRoutes = router;
