import User from "../models/user.js";
import { db } from "../config/firebaseConfig.js";
import firebase from "../config/firebaseConfig.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "animegh-it-care",
  api_key: "228782868235441",
  api_secret: "LjuQFmRcDkFnuDwNAK9T2wbyJDM",
  upload_preset: "userAvatar",
});

export const updateUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    // check user
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// export const updateAvatar = async (req, res, next) => {
//   const { id } = req.user;

//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const file = req.file;
//   const filename = file.originalname;

//   const bucket = firebase.storage().bucket();
//   const fileRef = bucket.file(filename);

//   const stream = fileRef.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//   });

//   stream.on("error", (error) => {
//     console.error(error);
//     next(error);
//   });

//   stream.on("finish", async () => {
//     const downloadURL = `https://storage.googleapis.com/gs://e-commerce-bd7d3.appspot.com/${fileRef.name}`;
//     // console.log(downloadURL);
//     // const [url] = await fileRef.getSignedUrl({
//     //   action: "read",
//     //   expires: "03-09-2023", // Set the expiration date for the signed URL
//     // });

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { photoUrl: downloadURL },
//       { new: true }
//     );

//     res.json(updatedUser);
//   });

//   stream.end(file.buffer);
// };

// export const updateAvatar = async (req, res, next) => {
//   const { id } = req.user;

//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const file = req.file;
//   const filename = file.originalname;

//   const bucket = firebase.storage().bucket();
//   const fileRef = bucket.file(filename);

//   const stream = fileRef.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//   });

//   stream.on("error", (error) => {
//     console.error(error);
//     next(error);
//   });

//   stream.on("finish", async () => {
//     const downloadURL = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { photoUrl: downloadURL },
//       { new: true }
//     );

//     res.json(updatedUser);
//   });

//   stream.end(file.buffer);
// };

export const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      upload_preset: "userAvatar",
    }); // upload file to cloudinary using preset options
    const { secure_url } = result;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { photoUrl: secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
