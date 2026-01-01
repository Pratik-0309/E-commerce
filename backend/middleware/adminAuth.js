import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        message: "not authorized as am admin.",
      });
    }
    req.admin = decodedToken;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    if(error.name === "TokenExpiredError"){
      return res.status(401).json({
        success: false,
        message: "Token Expired",
        code: "TOKEN_EXPIRED"
      })
    }
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export default adminAuth;
