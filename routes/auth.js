import express from "express";

import {
  changeePassword,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/change-password").put(isLoggedIn, changeePassword);

export default router;
