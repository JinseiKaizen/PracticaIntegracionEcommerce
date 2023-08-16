const { Schema, model } = require("mongoose");
const paginate = require('mongoose-paginate-v2');
const collectionName = "student";

const collectionSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String,
  calificacion: {
    type: Number,
    min: 1,
    max: 10,
    default: 6
  },
  grupo: {
    type: String,
    enum: ['1A', '1B'],
    default: '1A'
  },
  genero: {
    type: String,
    enum: ['H', 'M']
  }
});

collectionSchema.plugin(paginate);
const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;