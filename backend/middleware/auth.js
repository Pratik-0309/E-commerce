import jwt from 'jsonwebtoken';
import User from '../models/user';

const verifyJWT = async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findById(decodedToken._id);

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default verifyJWT;