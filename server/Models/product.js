import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export { Product };
