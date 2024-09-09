import { Router } from 'express';
import episodeController from '../../controllers/Episode/episodeController.js';
import authenticateToken from '../../middlewares/authenticateToken.js'
const router = Router();

router.post('/episodes',authenticateToken, episodeController.createEpisode);
router.get('/episodes',authenticateToken, episodeController.getallEpisode);
router.get('/episodes/:id',authenticateToken, episodeController.getEpisodeById);
router.patch('/episodes/:id',authenticateToken, episodeController.updateEpisode);
router.delete('/episodes/:id',authenticateToken, episodeController.deleteEpisode);
//Get all streams of an episode by episode id
router.get('/episodes/:id/streams',authenticateToken, episodeController.getStreamsByEpisodeId);
export const episodeRoutes = router;
