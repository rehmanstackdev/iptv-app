import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${nanoid()}${ext}`;
    cb(null, fileName);
  }
});

export const upload = multer({ storage });
