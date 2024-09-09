
import mongoose from 'mongoose';
import User from '../../models/user/userModel.js';
import Stream from '../../models/Stream/streamModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { httpResponse } from "../../utils/index.js";

dotenv.config();

const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return httpResponse.CONFLICT(res, { message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return httpResponse.CREATED(res, );
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return httpResponse.UNAUTHORIZED(res, { message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return httpResponse.UNAUTHORIZED(res, { message: 'Invalid email or password' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };


    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return httpResponse.SUCCESS(res, {
      token,
      data: user,
    });
    
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getallUsers = async (req, res) => {
  try {
    const users = await User.find();
    return httpResponse.SUCCESS(res, users)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return httpResponse.NOT_FOUND(res,)
    }

    return httpResponse.SUCCESS(res, user)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const updateUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { first_name, last_name, email, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return httpResponse.NOT_FOUND(res, {
        message: 'User not found',
        data: null
      });
    }
    return httpResponse.SUCCESS(res, user)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return httpResponse.NOT_FOUND(res, 
        {
          message: 'User Not Found',
        }
      )
    }
    return httpResponse.SUCCESS(res, {
      message: 'User deleted successfully',
      data: null
    });
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};


const getStreamsByUserId = async (req, res) => {
  try {
      const userId = req.params.id;
      const result = await Stream.aggregate([
          {
              $match: { user_id: new mongoose.Types.ObjectId(userId) }
          },
          {
              $project: {
                  _id: 1,      
                  user_id: 1, 
                  episode_id: 1, 
              }
          }
      ]);

      if (result.length === 0) {
          return res.status(404).json({
              status: 404,
              message: 'No streams found for this user',
              data: null,
          });
      }

      res.status(200).json({
          status: 200,
          message: 'All Streams of User fetched successfully',
          data: result,
      });
  } catch (error) {
      res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
          error: error.message,
          data: null,
      });
  }
};

const getEpisodesByUserId = async (req, res) => {
  try {
      const userId = req.params.id;
      const result = await Stream.aggregate([
          {
              $match: { user_id: new mongoose.Types.ObjectId(userId) }
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
                  'episode._id': 1,
                  'episode.name': 1,     
                  'episode.description': 1, 
                  'episode.thumbnail_id': 1, 
                  stream_id: '$_id', 
              
              }
          }
      ]);

      if (result.length === 0) {
          return res.status(404).json({
              status: 404,
              message: 'No episodes found for this user',
              data: null,
          });
      }

      res.status(200).json({
          status: 200,
          message: 'All Episodes of User fetched successfully',
          data: result,
      });
  } catch (error) {
      res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
          error: error.message,
          data: null,
      });
  }
};

export default {
  registerUser,
  loginUser,
  getallUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStreamsByUserId,
  getEpisodesByUserId
};
