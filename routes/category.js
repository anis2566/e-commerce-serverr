import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.route("/create").post(createCategory);
router.route("/all").get(getAllCategories);
router.route("/:id").get(getCategoryById);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);

export default router;
