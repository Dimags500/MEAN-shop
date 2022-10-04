import { Category } from "../Models/category.js";

const createCategory = async (req, res) => {
  try {
    const doc = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      image: req.body.image,
    });

    const category = await doc.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "can't create new category ",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get products ",
    });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id: categoryId } = req.params;

  console.log(categoryId);
  Category.findByIdAndRemove(categoryId)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category deleted " });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the category not found " });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const updateCategoryById = async (req, res) => {
  const { id: categorytId } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      categorytId,
      {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
        image: req.body.image,
      },
      {
        new: true,
      }
    );

    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant update category ",
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id: categorytId } = req.params;
  try {
    const category = await Category.findById(categorytId);
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get category ",
    });
  }
};

export {
  createCategory,
  getAllCategories,
  deleteCategoryById,
  getCategoryById,
  updateCategoryById,
};
