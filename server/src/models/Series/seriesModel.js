import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  description: { type: String, required: true,},
  trailer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  thumbnail_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  genre_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true }], // Array of genre references
}, 
{ timestamps: true });

const Series = mongoose.model('Series', SeriesSchema);

export default Series;