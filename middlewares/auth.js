import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.auth;

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error("Invalid token provided");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
