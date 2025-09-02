const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  overview: { type: String,required: true},
  poster_path: { type: String, required: true },
  img2: { type: String},
  trailer:{type:String,required:true},
  music:{type:String,required:true},
  vote_average:{type:Number,required: true},
  genres: [{ type: [String] }],
  watchOrder:{type:Number,required:true},
  director:{ type: String,required: true},
  cast:[{type:[String]}],
  runtime:{type:Number,required: true},
  budget:{type:Number,required: true},
  revenue:{type:Number,required: true},
});

module.exports = mongoose.model("Movie", movieSchema);
