import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
};

export default connectDB;
