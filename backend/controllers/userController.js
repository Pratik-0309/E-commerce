import User from "../models/user.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  path: "/",
};

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
      return res.status(401).json({
        message: "Refresh Token is Missing or unauthorized.",
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (decodedToken.email === process.env.ADMIN_EMAIL) {
      const accessToken = jwt.sign(
        { email: decodedToken.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { email: decodedToken.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "Admin token refreshed" });
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user ID found in refresh token." });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({ success: true, message: "Token refreshed" });
  } catch (error) {
    return res
      .status(401)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Expired session" });
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

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    console.log("User Register Successfully : ", user.name);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
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

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    console.log("User Logged In :", loggedInUser.email);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
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

const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      if (!accessToken || !refreshToken) {
        return res.status(500).json({
          message: "Token is Not generated",
        });
      }

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ success: true, message: "Admin authenticated" });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};

const adminLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Admin logged out successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  adminLogout,
  logoutUser,
  refreshAccessToken,
};
