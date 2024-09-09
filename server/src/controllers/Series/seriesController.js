
import mongoose from 'mongoose';
import Series from '../../models/Series/seriesModel.js';
import Season from'../../models/Season/seasonModel.js';
import Episode from '../../models/Episode/episodeModel.js';
import { httpResponse } from "../../utils/index.js";
const createSeries = async (req, res) => {
    try {
      const { name, description, trailer_id, thumbnail_id,genre_ids } = req.body; 
      const series = new Series({ name, description,trailer_id, thumbnail_id,genre_ids });
      await series.save(); 
      return httpResponse.CREATED(res, series)
    } catch (error) {
      return httpResponse.BAD_REQUEST(res, error)
    }
  };
  
const getSeries = async (req, res) => {
  try {
    const series = await Series.find();
    return httpResponse.SUCCESS(res, series)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return httpResponse.NOT_FOUND(res, {message: 'Entry not found'},)
    }
    return httpResponse.SUCCESS(res, series)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res,error)
  }
};
const updateSeries = async (req, res) => {
  try {
    const { name, description, trailer_id, thumbnail_id ,genre_ids} = req.body;
    const updatedSeries = await Series.findByIdAndUpdate(req.params.id, { name, description, trailer_id, thumbnail_id,genre_ids  }, { new: true });
    if (!updatedSeries) {
      return httpResponse.NOT_FOUND(res, {message: 'series not found',})
    }
    return httpResponse.SUCCESS(res, updateSeries)
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, error)
  }
};
const deleteSeries = async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);
    if (!deletedSeries) {
      return httpResponse.NOT_FOUND(res, {message: 'series not found',})
    }
    return httpResponse.SUCCESS(res, {message: 'Series deleted successfully'})
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getAllSeasonBySeriesId = async (req, res) => {
  try {
    const { id } = req.params;
    const seasons = await Season.aggregate([
      {
        $match: { series_id: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'series',
          localField: 'series_id',
          foreignField: '_id',
          as: 'seriesDetails'
        }
      },
      {
        $unwind: '$seriesDetails'
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          series: '$seriesDetails.name', // If you want to include series details
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    if (!seasons.length) {
      return httpResponse.NOT_FOUND(res, { message: 'No seasons found for this series.' });
    }

    return httpResponse.SUCCESS(res, seasons);
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error);
  }
};

const getAllEpisodeBySeriesId = async (req, res) => {
  try {
    const { id } = req.params;

    const episodes = await Episode.aggregate([
      {
        $lookup: {
          from: 'seasons',
          localField: 'season_id',
          foreignField: '_id',
          as: 'seasonDetails',
        },
      },
      {
        $unwind: '$seasonDetails',
      },
      {
        $match: { 'seasonDetails.series_id': new mongoose.Types.ObjectId(id) }, 
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          'seasonDetails._id': 1,
          'seasonDetails.name': 1,
          'seasonDetails.description': 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (!episodes.length) {
      return httpResponse.NOT_FOUND(res, {message: 'No episodes found for this series.'})
    }
    return httpResponse.SUCCESS(res, episodes)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)

  }
};

const getGenresBySeriesId = async (req, res) => {
  try {
    const seriesId = new mongoose.Types.ObjectId(req.params.id);
    const result = await Series.aggregate([
      {
        $match: { _id: seriesId },
      },
      {
        $lookup: {
          from: 'genres',
          localField: 'genre_ids',
          foreignField: '_id',
          as: 'genre_info',
        },
      },
      {
        $unwind: '$genre_info',
      },
      {
        $project: {
          _id: 0,
          genre: '$genre_info.name',
          createdAt: '$genre_info.createdAt',
          updatedAt: '$genre_info.updatedAt',
        },
      },
    ]);
    if (result.length === 0) {
      return httpResponse.NOT_FOUND(res, { message: 'No genres found for this series.' });
    }
    return httpResponse.SUCCESS(res, { message: 'Genres successfully retrieved.', data: result });
  } catch (error) {
    console.error('Error in getGenresBySeriesId:', error); 
    return httpResponse.INTERNAL_SERVER_ERROR(res, error);
  }
};

const getSeriesCount = async (req, res) => {
  try {
    const count = await Series.countDocuments(); 
return httpResponse.SUCCESS(res, count)
  } catch (error) {
return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

export default {
  createSeries,
  getSeries,
  getSeriesById,
  updateSeries,
  deleteSeries,
  getAllSeasonBySeriesId,
  getAllEpisodeBySeriesId,
  getGenresBySeriesId,
  getSeriesCount
};
