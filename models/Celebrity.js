const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const celebritySchema = new Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true, enum: ['actor', 'singer', 'comedian', 'unknown'] },
    catchPhrase: { type: String, required: true },
}, { timestamps: true });

const Celebrity = model('celebrity', celebritySchema);

module.exports = Celebrity;
