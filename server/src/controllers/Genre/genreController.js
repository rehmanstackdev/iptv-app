import mongoose from 'mongoose';
import { httpResponse } from "../../utils/index.js";
import Genre from '../../models/Genre/genreModel.js';
import Genre_Series from '../../models/Gen_Series/gen_seriesModel.js';
const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    await genre.save();
    return httpResponse.CREATED(res, genre)
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, error)
  }
};

const getGenre = async (req, res) => {
  try {
    const genre = await Genre.find();
    return httpResponse.SUCCESS(res, genre)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return httpResponse.NOT_FOUND(res,  {message: 'Genre not found'},)
    }
    return httpResponse.SUCCESS(res, genre)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const updateGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedgenre = await Genre.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updatedgenre) {
      return httpResponse.NOT_FOUND(res, { message: 'Entry not found',})
    }
    return httpResponse.SUCCESS(res, updateGenre)
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, error)
  }
};

const deleteGenre = async (req, res) => {
  try {
    const deletedgenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedgenre) {
      return httpResponse.NOT_FOUND(res, {message: 'Genre not found',})
    }
    return httpResponse.SUCCESS(res, {message: 'Genre deleted successfully',})
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getAllSeriesByGenreId = async (req, res) => {
  try {
    const genreId = new mongoose.Types.ObjectId(req.params.id);

    const series = await Genre_Series.aggregate([
      {
        $match: { genre_id: genreId }
      },
      {
        $lookup: {
          from: 'series',
          localField: 'series_id',
          foreignField: '_id',
          as: 'seriesdetails'
        }
      },
      {
        $unwind: '$seriesdetails'
      },
      {
        $project: {
          _id: 0,       
          'seriesdetails._id': 1, 
          'seriesdetails.name': 1, 
          'seriesdetails.description': 1,
          'seriesdetails.trailer_id': 1,
        }
      }
    ]);
return httpResponse.SUCCESS(res, series)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getAllSeriesAndSeasonsByGenreId = async (req, res) => {
  try {
      const genreId = new mongoose.Types.ObjectId(req.params.id);

      const result = await Genre_Series.aggregate([
          {
              $match: { genre_id: genreId }
          },
          {
              $lookup: {
                  from: 'series',
                  localField: 'series_id',
                  foreignField: '_id',
                  as: 'series'
              }
          },
          {
              $unwind: '$series'
          },
          {
              $lookup: {
                  from: 'seasons',
                  localField: 'series._id',
                  foreignField: 'series_id',
                  as: 'seasons'
              }
          },
          {
              $unwind: {
                  path: '$seasons',
                  preserveNullAndEmptyArrays: true 
              }
          },
          {
              $project: {
                  _id: 0,
                  'series._id': 1,
                  'series.name': 1,
                  'series.description': 1,
                  'seasons._id': 1,
                  'seasons.name': 1,
                  'seasons.description': 1
              }
          }
      ]);
return httpResponse.SUCCESS(res, result)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getGenreCount = async (req, res) => {
  try {
    const count = await Genre.countDocuments(); 
return httpResponse.SUCCESS(res, count)
  } catch (error) {
    console.error('Error fetching genre count:', error);
return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};


export default {
  createGenre,
  getGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
  getAllSeriesByGenreId,
  getAllSeriesAndSeasonsByGenreId,
  getGenreCount
};
