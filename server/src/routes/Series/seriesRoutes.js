import { Router } from 'express';
import authenticateToken from '../../middlewares/authenticateToken.js';
import seriesController from '../../controllers/Series/seriesController.js';

const router = Router();

router.post('/series',authenticateToken, seriesController.createSeries);
router.get('/series',authenticateToken, seriesController.getSeries);
router.get('/series/:id',authenticateToken, seriesController.getSeriesById);
router.patch('/series/:id',authenticateToken, seriesController.updateSeries);
router.delete('/series/:id',authenticateToken, seriesController.deleteSeries);

//Get all seasons of a series by series id
router.get('/series/:id/seasons',authenticateToken,seriesController.getAllSeasonBySeriesId)
//Get all episodes of a series by series id
router.get('/seasons/:id/episodes',authenticateToken,seriesController.getAllEpisodeBySeriesId)
//Get all genre by series id
router.get('/series/:id/genres',authenticateToken,seriesController.getGenresBySeriesId)
//Get Genre Count
router.get('/series-count',authenticateToken, seriesController.getSeriesCount);
export const seriesRoutes = router;
