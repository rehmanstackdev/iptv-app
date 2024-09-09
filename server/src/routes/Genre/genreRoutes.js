import { Router } from 'express';
import genreController from '../../controllers/Genre/genreController.js';
import authenticateToken from '../../middlewares/authenticateToken.js'
const router = Router();

router.post('/genres',authenticateToken, genreController.createGenre);
router.get('/genres',authenticateToken, genreController.getGenre);
router.get('/genres/:id', genreController.getGenreById);
router.patch('/genres/:id',authenticateToken, genreController.updateGenre);
router.delete('/genres/:id',authenticateToken, genreController.deleteGenre);
//Get all series of a genre by genre id
router.get('/genres/:id/series',authenticateToken,genreController.getAllSeriesByGenreId);
//Get all seasons of all series of a genre by genre id
router.get('/genres/:id/series/seasons',authenticateToken,genreController.getAllSeriesAndSeasonsByGenreId);
//Get Genre Count
router.get('/genres-count',authenticateToken, genreController.getGenreCount);
export const genreRoutes = router;
