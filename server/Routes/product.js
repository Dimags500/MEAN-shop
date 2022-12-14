import express from "express";
import imageUploader from "../DB/multer.js";
import * as productController from "../Controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  imageUploader.single("image"),
  productController.createProduct
);
router.put(
  "/:id",
  imageUploader.single("image"),
  productController.updateProductById
);
router.put(
  "/gallery-images/:id",
  imageUploader.array("images", 10),
  productController.gallery
);
router.delete("/:id", productController.deleteProductById);

router.get("/names", productController.getProductsNames);
router.get("/get/count", productController.getProductsCount);
router.get("/get/featured/:count", productController.getFeaturedProducts);

export { router };
