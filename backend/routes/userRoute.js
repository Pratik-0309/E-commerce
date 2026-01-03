import express from 'express'
import { loginUser, registerUser, adminLogin, adminLogout, logoutUser,updateProfile, userProfile,refreshAccessToken} from '../controllers/userController.js';
import verifyJWT from "../middleware/auth.js"

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',verifyJWT,userProfile);
router.post('/update',verifyJWT,updateProfile);
router.post('/refresh-token',refreshAccessToken);
router.post('/admin-login',adminLogin);
router.post("/admin-logout",adminLogout);

export default router