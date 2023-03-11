import Product from "../models/product.js";
import Review from "../models/review.js";

// export const createReview = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rating, comment } = req.body;

//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const review = new Review({
//       user: req.user.name,
//       rating,
//       comment,
//       product: product._id,
//     });

//     await review.save();

//     product.reviews.push(review._id);
//     product.numRatings++;
//     product.avgRating =
//       (product.avgRating * (product.numRatings - 1) + rating) /
//       product.numRatings;

//     await product.save();

//     res.status(201).json(review);
//   } catch (error) {
//     next(error);
//   }
// };
export const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    // Check if the user has already reviewed the product
    const product = await Product.findById(req.params.id).populate("reviews");
    const userReview = product.reviews.find(
      (review) => review.user === req.user._id
    );
    if (userReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    // Create a new review
    const review = new Review({
      user: req.user._id,
      name: req.user.name,
      comment,
      rating,
    });

    // Update product with the new review
    product.reviews.push(review);
    product.numRatings += 1;
    product.avgRating =
      (product.avgRating * (product.numRatings - 1) + rating) /
      product.numRatings;
    await product.save();

    // Save the review
    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
