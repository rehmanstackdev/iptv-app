
import mongoose from 'mongoose';
import Stream from '../../models/Stream/streamModel.js';
import Episode from '../../models/Episode/episodeModel.js';
import { httpResponse } from '../../utils/httpResponse.js';

const createEpisode = async (req, res) => {
    try {
        const { season_id, thumbnail_id, name, description } = req.body;
        const episode = new Episode({ season_id, thumbnail_id, name, description });
        await episode.save();
        return httpResponse.CREATED(res, episode)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const getallEpisode = async (req, res) => {
    try {
        const episode = await Episode.find();
        return httpResponse.SUCCESS(res, episode)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        if (!episode) {
            return httpResponse.NOT_FOUND(res,{message: 'Episode not found'})
        }
        return httpResponse.SUCCESS(res, episode)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const updateEpisode = async (req, res) => {
    try {
        const { season_id, thumbnail_id, name, description } = req.body;
        const updatedEpisode = await Episode.findByIdAndUpdate(
            req.params.id,
            { season_id, thumbnail_id, name, description },
            { new: true }
        );
        if (!updatedEpisode) {
            return httpResponse.NOT_FOUND(res, {message: 'Episode not found'})
        }
        return httpResponse.SUCCESS(res, updateEpisode)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const deleteEpisode = async (req, res) => {
    try {
        const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);
        if (!deletedEpisode) {
            return httpResponse.NOT_FOUND(res, {message: 'Episode not found'})
        }
        return httpResponse.SUCCESS(res, {message: 'Episode deleted successfully'})
    } catch (error) {
return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

const getStreamsByEpisodeId = async (req, res) => {
    try {
      const { id } = req.params;
  
      const streams = await Stream.aggregate([
        {
          $match: { episode_id: new mongoose.Types.ObjectId(id) } 
        },
        {
          $lookup: {
            from: 'episodes',
            localField: 'episode_id',
            foreignField: '_id',
            as: 'StreamEpisodeDetail'
          }
        },
        {
          $unwind: '$StreamEpisodeDetail'
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            episode_id: 1,
            'StreamEpisodeDetail.name': 1,
            'StreamEpisodeDetail.description': 1,
          }
        }
      ]);
  
      if (streams.length > 0) {
        return httpResponse.SUCCESS(res, { message: 'All Streams of episode retrieved successfully'},streams)
      } else {
        return httpResponse.NOT_FOUND(res, {message: 'No streams found for this episode'})
      }
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
  };
export default { 
    createEpisode, 
    getallEpisode, 
    getEpisodeById,
     updateEpisode, 
     deleteEpisode,
     getStreamsByEpisodeId 
    };