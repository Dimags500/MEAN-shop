import { Category } from "../Models/category.js";
import { Product } from "../Models/product.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("no image !!");
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  try {
    const doc = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
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
    let filter = {};

    if (req.query.categories) {
      console.log(req.query.categories);

      filter = { category: req.query.categories.split(",") };
    }
    const products = await Product.find(filter).populate("category");
    res.status(200).send(products);
  } catch (error) {
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

  const product = await Product.findById(productId);
  if (!product) return res.status(400).send("invalid product");

  const file = req.file;
  if (!file) return res.status(400).send("no image !!");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let imagePath = file ? `${basePath}${fileName}` : product.image;

  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: imagePath,
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

    res.status(200).send(updatedProduct);
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

const getProductsCount = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments({});
    res.status(200).json({ count: productsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get products count",
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const count =
      req.params.count && req.params.count > 0 ? req.params.count : 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      parseInt(count)
    );
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get featuredProducts",
    });
  }
};

const gallery = async (req, res) => {
  const files = req.files;
  const { id: productId } = req.params;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  if (!files) return res.status(400).send("no images !!");
  let imagesPaths = [];

  if (files)
    files.forEach((file) => imagesPaths.push(`${basePath}${file.filename}`));

  try {
    let product = await Product.findByIdAndUpdate(
      productId,
      {
        images: imagesPaths,
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

export {
  createProduct,
  getProducts,
  getProductById,
  getProductsNames,
  updateProductById,
  deleteProductById,
  getProductsCount,
  getFeaturedProducts,
  gallery,
};
