import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectURL = process.env.CONNECTION_STRING;

mongoose
  .connect(connectURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mean-shop",
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
