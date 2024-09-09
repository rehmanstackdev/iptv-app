import express from 'express';
import streamController from '../../controllers/Stream/streamController.js';

const router = express.Router();

router.post('/streams', streamController.createStream);
router.get('/streams', streamController.getallStreams);
router.get('/streams/:id', streamController.getStreamById);
router.put('/streams/:id', streamController.updateStream);
router.delete('/streams/:id', streamController.deleteStream);
//Get the episode of a stream by stream id
router.get('/streams/:id/episode', streamController.getEpisodeByStreamId);
//Get the user of a stream by stream id
router.get('/streams/:id/user', streamController.getUserByStreamId);
// Get the season of an episode of a stream by stream id
router.get('/streams/:id/episode/season', streamController.getSeasonOfEpisode);
// Get the genre of a series of a season of an episode of a stream by stream id
router.get('/streams/:id/episode/season/series/genre', streamController.getGenreOfSeries);
// Get the series of a season of an episode of a stream by stream id
router.get('/streams/:id/episode/season/series', streamController.getSeriesOfSeason);
export const streamRoutes = router;
