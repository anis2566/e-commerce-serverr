import { Schema, model } from "mongoose";

import Review from "./review.js";
import Category from "./category.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    color: {
      type: String,
    },
    discountParcent: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    avgRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numRatings: {
      type: Number,
      min: 0,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
