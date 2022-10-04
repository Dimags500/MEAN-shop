import express from "express";
const router = express.Router();

import * as productController from "../Controllers/productController.js";

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);

router.get("/names", productController.getProductsNames);
router.get("/get/count", productController.getProductsCount);
router.get("/get/featured/:count", productController.getFeaturedProducts);

export { router };
