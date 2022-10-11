import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import "./DB/mongoose.js";

import { router as productRouter } from "./Routes/product.js";
import { router as categoryRouter } from "./Routes/category.js";

dotenv.config();
const app = express();
const api = process.env.API_URL;

// middlewares
//app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("tiny"));

// routes
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);

app.get("/", (req, res) => {
  res.send("home page ");
});

const PORT = 3030;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`server ${api} run on ${PORT}`);
});
