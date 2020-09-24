const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  plot: { type: String, required: true }
}, { timestamps: true });

const Movie = model('movie', movieSchema);

module.exports = Movie;