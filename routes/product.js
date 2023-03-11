import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.js";

const router = express.Router();

router.route("/create").post(createProduct);
router.route("/all").get(getAllProducts);
router.route("/:id").get(getProductById);

export default router;
