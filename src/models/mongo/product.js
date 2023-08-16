const { Schema, model } = require("mongoose");

const collectionName = "product";

const collectionSchema = new Schema({
  nombre: {
    type: String,
    index: true
  },
  descripcion: String,
  precio: Number,
  stock: Number,
  status: {
    type: Boolean,
    default: true
  },
  imagen: String,
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;