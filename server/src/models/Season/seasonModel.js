// models/Item.js
import mongoose from 'mongoose';

const SeasonSchema = new mongoose.Schema({
    series_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Series',required: true},
    name: {type: String,required: true },
    description: {type: String,required: true}
},
{timestamps:true});

const Season = mongoose.model('Season', SeasonSchema);

export default Season;
