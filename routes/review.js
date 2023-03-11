import express from "express";
import { createReview } from "../controllers/review.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.route("/create/:id").post(isLoggedIn, createReview);
// router.route("/all").get(getAllCategories);
// router.route("/:id").get(getCategoryById);
// router.route("/:id").put(updateCategory);
// router.route("/:id").delete(deleteCategory);

export default router;
