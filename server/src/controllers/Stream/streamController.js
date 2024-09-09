import mongoose from 'mongoose';
import Stream from '../../models/Stream/streamModel.js';
import { response } from 'express';
import { httpResponse } from '../../utils/httpResponse.js';
import Season from '../../models/Season/seasonModel.js';

const createStream = async (req, res) => {
  try {
    const { user_id, episode_id} = req.body;
    const stream = new Stream({episode_id,user_id});
    await stream.save();
    return httpResponse.CREATED(res, stream)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getallStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    return httpResponse.SUCCESS(res, streams)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const getStreamById = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);
    if (!stream) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream not found'})
    }
    return httpResponse.SUCCESS(res, stream)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

const updateStream = async (req, res) => {
  try {
    const { user_id, episode_id} = req.body;
    const updatedStream = await Stream.findByIdAndUpdate(req.params.id, { user_id, episode_id}, { new: true });
    if (!updatedStream) {
      return res.status(404).json({
        status: 404,
        response: 'Not Found',
        message: 'Stream not found',
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      response: 'Success',
      message: 'Stream updated successfully',
      data: updatedStream
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      response: 'Bad Request',
      message: err.message,
      data: null
    });
  }
};

const deleteStream = async (req, res) => {
  try {
    const deletedStream = await Stream.findByIdAndDelete(req.params.id);
    if (!deletedStream) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream not found'})
    }
    return httpResponse.SUCCESS(res, { message: 'Stream deleted successfully'})
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getEpisodeByStreamId = async (req, res) => {
  try {
      const streamId = req.params.id;
      const result = await Stream.aggregate([
          {
              $match: { _id:new mongoose.Types.ObjectId(streamId) }
          },
          {
              $lookup: {
                  from: 'episodes',
                  localField: 'episode_id',
                  foreignField: '_id',
                  as: 'episode'
              }
          },
          {
              $unwind: '$episode'
          },
          {
              $project: {
                  _id: 0,
                  'episode._id':1,
                  'episode.name':1,
                  'episode.description':1,
                  'episode.thumbnail_id':1,

              }
          }
      ]);

      if (result.length === 0) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream or episode not found'})
      }
return httpResponse.SUCCESS(res, {message: 'Episode of the Stream fetched successfully'})
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, {message: 'Internal Server Error'})
  }
};
const getUserByStreamId = async (req, res) => {
  try {
      const streamId = req.params.id;

      const result = await Stream.aggregate([
          {
              $match: { _id: new mongoose.Types.ObjectId(streamId) }
          },
          {
              $lookup: {
                  from: 'users', 
                  localField: 'user_id',
                  foreignField: '_id',
                  as: 'user'
              }
          },
          {
              $unwind: '$user'
          },
          {
              $project: {
                  _id: 0, 
                   'user._id':1,
                   'user.first_name':1,
                   'user.last_name':1,
                   'user.email':1,
                   'user.password':1,
              }
          }
      ]);

      if (result.length === 0) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream or user not found'})
      }
return httpResponse.SUCCESS(res, result)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getSeasonOfEpisode = async (req, res) => {
  try {
      const streamId = req.params.id;

      const result = await Stream.aggregate([
          { 
              $match: { _id: new mongoose.Types.ObjectId(streamId) } 
          },
          {
              $lookup: {
                  from: 'episodes',
                  localField: 'episode_id',
                  foreignField: '_id',
                  as: 'episode'
              }
          },
          { 
              $unwind: '$episode' 
          },
          {
              $lookup: {
                  from: 'seasons',
                  localField: 'episode.season_id',
                  foreignField: '_id',
                  as: 'season'
              }
          },
          { 
              $unwind: '$season' 
          },
          {
            $project: {
              _id: 0,
              'season._id': 1,
              'season.series_id': 1,
              'season.name': 1,
              'season.description': 1,
              
            }
          }
      ]);

      if (result.length === 0) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream or related data not found'})
      }
return httpResponse.SUCCESS(res, Season)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getSeriesOfSeason = async (req, res) => {
  try {
      const streamId = req.params.id;
      const result = await Stream.aggregate([
          { 
              $match: { _id:new mongoose.Types.ObjectId(streamId) } 
          },
          {
              $lookup: {
                  from: 'episodes',
                  localField: 'episode_id',
                  foreignField: '_id',
                  as: 'episode'
              }
          },
          { 
              $unwind: '$episode' 
          },
          {
              $lookup: {
                  from: 'seasons',
                  localField: 'episode.season_id',
                  foreignField: '_id',
                  as: 'season'
              }
          },
          { 
              $unwind: '$season' 
          },
          {
              $lookup: {
                  from: 'series',
                  localField: 'season.series_id',
                  foreignField: '_id',
                  as: 'series'
              }
          },
          { 
              $unwind: '$series' 
          },
          {
              $project: {
                  _id: 0,
                  'series._id': 1,
                  'series.name': 1,
                  'series.description': 1,
                  'series.trailer_id': 1,
                  'series.thumbnail_id': 1
              }
          }
      ]);

      if (result.length === 0) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream or related data not found'})
      }
      return httpResponse.SUCCESS(res, result[0].series)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getGenreOfSeries = async (req, res) => {
  try {
      const streamId = req.params.id;

      const result = await Stream.aggregate([
          { 
              $match: { _id: new mongoose.Types.ObjectId(streamId) } 
          },
          {
              $lookup: {
                  from: 'episodes',
                  localField: 'episode_id',
                  foreignField: '_id',
                  as: 'episode'
              }
          },
          { 
              $unwind: '$episode' 
          },
          {
              $lookup: {
                  from: 'seasons',
                  localField: 'episode.season_id',
                  foreignField: '_id',
                  as: 'season'
              }
          },
          { 
              $unwind: '$season' 
          },
          {
              $lookup: {
                  from: 'series',
                  localField: 'season.series_id',
                  foreignField: '_id',
                  as: 'series'
              }
          },
          { 
              $unwind: '$series' 
          },
          {
              $lookup: {
                  from: 'genres',
                  localField: 'series.genre_id',
                  foreignField: '_id',
                  as: 'genre'
              }
          },
          { 
              $unwind: '$genre' 
          },
          {
              $project: {
                  _id: 0,
                  'genre._id': 1,
                  'genre.name': 1,
              }
          }
      ]);

      if (result.length === 0) {
        return httpResponse.NOT_FOUND(res, {message: 'Stream or related data not found'})
      }
return httpResponse.SUCCESS(res, {data: result[0].genre})
  } catch (error) {
    return httpResponse.error(res, error)
  }
};

export default {
  createStream,
  getallStreams,
  getStreamById,
  updateStream,
  deleteStream,
  getEpisodeByStreamId,
  getUserByStreamId,
  getSeasonOfEpisode,
  getSeriesOfSeason,
  getGenreOfSeries 
};
