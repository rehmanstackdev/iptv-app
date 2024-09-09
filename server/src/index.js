// index.js
import express from 'express';
import connectDB from './config/dbConnection.js';
import dotenv from "dotenv";
import cors from 'cors';
import {userRoutes} from './routes/User/userRoutes.js';
import {genreRoutes} from './routes/Genre/genreRoutes.js';
import {seriesRoutes} from './routes/Series/seriesRoutes.js';
import {seasonRoutes} from './routes/Season/seasonRoutes.js';
import {fileRoutes} from './routes/File/fileRoutes.js';
import {episodeRoutes} from './routes/Episode/episodeRoutes.js';
import {streamRoutes} from './routes/Stream/streamRoutes.js';

dotenv.config();
const app = express();
const port =process.env.PORT|| 3000;
app.use(express.json())
connectDB()

app.use(cors());
app.use('/uploads', express.static('src/uploads'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('', userRoutes);
app.use('', genreRoutes);
app.use('', seriesRoutes);
app.use('', seasonRoutes);
app.use('', episodeRoutes);
app.use('', fileRoutes);
app.use('',streamRoutes)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
