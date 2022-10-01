import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  color: String,
  icon: String,
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
