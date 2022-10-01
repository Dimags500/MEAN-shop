import { Product } from "../Models/product.js";

const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const doc = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock,
    });

    const product = await doc.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant create new product ",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get products ",
    });
  }
};

const updatePostById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    let product = await Product.updateOne(
      { _id: productId },
      {
        name: req.body.image,
        image: req.body.image,
        countInStock: req.body.countInStock,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant update post ",
    });
  }
};

const getProductById = async (req, res) => {
  const { id: postId } = req.params;
  try {
    Product.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "cant return post ",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "post not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get posts ",
    });
  }
};

export { createProduct, getAllProducts, getProductById };
