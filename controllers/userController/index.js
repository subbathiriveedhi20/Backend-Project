import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import User from "../../model/user.js";
import { uploadAsyncToS3 } from "../../helper/s3Utils.js";

const createUser = async (req, res) => {
  try {
    const { name, email, state, city, profileImage, password } = req.body;

    const filePath = path.resolve(profileImage);

    const fileBuffer = fs.readFileSync(filePath);

    const file = {
      mimetype: "image/png",
      originalname: path.basename(filePath),
    };

    const key = `profile/${Date.now()}-${file.originalname}`;
    const uploadResult = await uploadAsyncToS3(key, fileBuffer, file);

    const uploadedImageUrl = uploadResult.Location;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      state,
      city,
      profileImage: uploadedImageUrl,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "server error" });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found for the given credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password or email" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "User signIn successfully", token });
  } catch (error) {
    console.error("Error in userSignIn:", error);
    res.status(500).json({ message: "server error" });
  }
};

export default {
  createUser,
  userSignIn,
};
