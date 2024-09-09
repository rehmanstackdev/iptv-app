import mongoose from 'mongoose';
import Season from '../../models/Season/seasonModel.js';
import Episode from '../../models/Episode/episodeModel.js';
import { httpResponse } from "../../utils/index.js";
const createSeason = async (req, res) => {
  try {
      const { series_id, name, description } = req.body;
      const newSeason = new Season({
          series_id,
          name,
          description
      });

      await newSeason.save();
      return httpResponse.CREATED(res, newSeason);
  } catch (error) {
      return httpResponse.BAD_REQUEST(res, { message: error.message });
  }
};


const getallSeason = async (req, res) => {
    try {
        const seasons = await Season.find();
        return httpResponse.SUCCESS(res, seasons)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const getSeasonById = async (req, res) => {
    try {
        const season = await Season.findById(req.params.id);
        if (!season) {
            return httpResponse.NOT_FOUND(res, {message: 'Season not found'})
        }
        return httpResponse.SUCCESS(res, season)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const updateSeason = async (req, res) => {
    try {
        const { series_id, name, description } = req.body;
        const updatedSeason = await Season.findByIdAndUpdate(
            req.params.id,
            { series_id, name, description },
            { new: true }
        );

        if (!updatedSeason) {
            return httpResponse.NOT_FOUND(res, {message: 'Season not found'})
        }
        return httpResponse.SUCCESS(res, updateSeason)
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, error)
    }
};

const deleteSeason = async (req, res) => {
    try {
        const deletedSeason = await Season.findByIdAndDelete(req.params.id);
        if (!deletedSeason) {
            return httpResponse.NOT_FOUND(res, {message: 'Season not found'})
        }
        return httpResponse.SUCCESS(res, {message: 'Season deleted successfully'})
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const getEpisodeBySeasonId = async (req, res) => {
    try {
      const { id } = req.params;
  
      const getAllEpisodes = await Episode.aggregate([
        {
          $match: { season_id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'seasons',
            localField: 'season_id',
            foreignField: '_id',
            as: 'SeasonDetail',
          },
        },
        {
          $unwind: '$SeasonDetail', 
        },
        {
          $project: {
            _id: 1,
            series_id: 1,
            name: 1,
            description: 1,
            'SeasonDetail._id': 1,
            'SeasonDetail.name': 1,
            'SeasonDetail.description': 1,
          },
        },
      ]);
  
      if (getAllEpisodes.length > 0) {
        return httpResponse.SUCCESS(res, {message: 'All Episodes of Season retrieved successfully'},getAllEpisodes)
      } else {
        return httpResponse.NOT_FOUND(res, {message: 'No episodes found for this season' })
      }
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, error)
    }
  };

  const getSeasonCount = async (req, res) => {
    try {
      const count = await Season.countDocuments(); 
  return httpResponse.SUCCESS(res, count)
    } catch (error) {
  return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
  };
export default {
    createSeason,
    getallSeason,
    getSeasonById,
    updateSeason,
    deleteSeason,
    getEpisodeBySeasonId,
    getSeasonCount
};