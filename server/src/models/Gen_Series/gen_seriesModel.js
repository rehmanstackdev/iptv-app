import mongoose from 'mongoose';

const GenSchema = new mongoose.Schema({
    genre_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Genre',required: true,},
    series_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Series',required: true,},
  },
  { timestamps: true });

const Gen_Series = mongoose.model('Gen_Series', GenSchema);
export default Gen_Series;
