import Product from "../models/product.js";

export const createProduct = async (req, res, next) => {
  const { discountPercent, price } = req.body;
  try {
    const discountedPrice = price - (price * discountPercent) / 100;

    const newProduct = new Product({ ...req.body, discountedPrice });

    // save the new product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
};

// get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category reviews");
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// get single product
export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "category reviews"
    );
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
