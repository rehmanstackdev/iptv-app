// routes/authRoutes.js
import { Router } from 'express';
import authController from '../../controllers/User/userController.js';

const router = Router();

router.post('/users/registration', authController.registerUser);
router.post('/users/login', authController.loginUser);
router.get('/users', authController.getallUsers);
router.get('/users/:id', authController.getUserById);
router.patch('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

//Get all streams of a user by user id
router.get('/users/:id/streams', authController.getStreamsByUserId);
//Get episodes of all streams of a user by user id
router.get('/users/:id/streams/episode', authController.getEpisodesByUserId);
export const userRoutes=router;
