const { Schema, model } = require("mongoose");

const collectionName = "order";

const collectionSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product' 
        }
      }
    ]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    Default: Date.now()
  },
  address: {
    street: String,
    city: String,
    country: String
  }
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;