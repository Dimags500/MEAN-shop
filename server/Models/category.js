import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
