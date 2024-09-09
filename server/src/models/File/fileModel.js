import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  original_name: { type: String, required: true },
  current_name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true }
},
{ timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
