import mongoose from 'mongoose';

const StreamSchema = new mongoose.Schema({
    episode_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Episode',required: true,},
    user_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,},
  },
  { timestamps: true });

const Stream = mongoose.model('Stream', StreamSchema);
export default Stream;
