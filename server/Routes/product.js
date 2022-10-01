import express from "express";
const router = express.Router();

import * as productController from "../Controllers/productController.js";

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);

export { router };
