import express from "express";

import { updateUser, updateAvatar } from "../controllers/user.js";
import { isLoggedIn } from "../middlewares/auth.js";
import { uploader } from "../middlewares/uploader.js";

const router = express.Router();

router.route("/update").put(isLoggedIn, updateUser);
router
  .route("/update/avatar")
  .put(uploader.single("file"), isLoggedIn, updateAvatar);

export default router;
