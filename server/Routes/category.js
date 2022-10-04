import express from "express";
const router = express.Router();

import * as categoryController from "../Controllers/categoryController.js";

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.delete("/:id", categoryController.deleteCategoryById);
router.put("/:id", categoryController.updateCategoryById);

export { router };
