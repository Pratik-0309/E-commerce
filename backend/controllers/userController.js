import User from "../models/user.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found for token generation");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error("Token generation failed");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Token Generation Error:", error.message);
    throw new Error("Something went wrong while generating tokens");
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(404).json({
        message: "Refresh Token is Missing or unauthorized.",
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user ID found in refresh token." });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        message: "Refresh Token is Expired or Used (Logout required).",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    console.error("Token refresh failed:", error);
    return res
      .status(401)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Could not refresh token. Please log in again." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ message: "Please Provide required field." });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({ message: "user already exist." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("User Register Successfully : ", user.name);

    return res.status(200).json({
      user,
      message: "User Register Successfully",
    });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please enter required fields.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true
    }

    console.log("User Logged In :",loggedInUser.email)

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
      user: loggedInUser,
    });
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
