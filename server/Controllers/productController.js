import { Category } from "../Models/category.js";
import { Product } from "../Models/product.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {
    const doc = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    const product = await doc.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant create new product ",
      error,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get products ",
    });
  }
};

const getProductsNames = async (req, res) => {
  try {
    const products = await Product.find().select("name image -_id");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get products list  ",
    });
  }
};

const updateProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    let product = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    res.status(200).send(product);
  } catch (error) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product Id");
    } else {
      res.status(500).json({
        message: "cant update product ",
      });
    }
  }
};

const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findById(productId).populate("category");
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get product ",
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id: productId } = req.params;

  Product.findByIdAndRemove(productId)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product deleted " });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the product not found " });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};
export {
  createProduct,
  getProducts,
  getProductById,
  getProductsNames,
  updateProductById,
  deleteProductById,
};
