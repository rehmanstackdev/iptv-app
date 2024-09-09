import {Router} from 'express';
import { upload } from '../../config/multerConfig.js';
import fileController from '../../controllers/File/fileController.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
const router = Router();

router.post('/files', upload.single('file'), authenticateToken,fileController.uploadFile);
router.get('/files',authenticateToken, fileController.getAllFiles);
router.get('/files/:id',authenticateToken,fileController.getFileById);
router.put('/files/:id',authenticateToken, fileController.updateFile);
router.delete('/files/:id',authenticateToken, fileController.deleteFile);

export const fileRoutes =  router;
