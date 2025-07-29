import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // object prop & their type
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  bestSellers: {
    type: Array
  },
  date: {
    type: Number,
    required: true
  }
});

/*
mongoose.models => is an object that stores all the models Mongoose has already registered.
## checks if a model named "product" already exists.
If it exists, it returns the existing model.
If the "product" model does not exist yet, 
creates and registers a new Mongoose model with the name "product" and the provided productSchema
*/
const productModel = mongoose.models.product ||  mongoose.model("product",productSchema)
export default productModel;