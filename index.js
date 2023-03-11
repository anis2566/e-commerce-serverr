import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// external imports
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.js";

// routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import reviewRoute from "./routes/review.js";

// initialize
const app = express();
dotenv.config({
  path: "./config/.env",
});

// connect database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/review", reviewRoute);

// error handlers
app.use(notFound);
app.use(errorHandler);

// run server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
