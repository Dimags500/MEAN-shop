import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import "./DB/mongoose.js";

import * as productController from "./Controllers/productController.js";

dotenv.config();
const api = process.env.API_URL;
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("home page ");
});

app.get("/products", productController.getAllProducts);
app.get("/products:id", productController.getProductById);
app.post("/products", productController.createProduct);

const PORT = 3030;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`server ${api} run on ${PORT}`);
});
