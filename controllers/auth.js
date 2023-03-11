import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// create user
export const createUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    // check user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // check password
    const isMatchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isMatchPassword) {
      throw new Error("Invalid Credentials");
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const { password, ...rest } = user._doc;

    // set cookie
    res.cookie("auth", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

// change password
export const changeePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // find user
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("You can change your password");
    }

    // check password
    const isMatchPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatchPassword) {
      throw new Error("Invalid Credentials");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// logout user
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
