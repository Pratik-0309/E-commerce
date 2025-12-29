import express from 'express'
import { loginUser, registerUser, adminLogin, adminLogout, logoutUser, refreshAccessToken} from '../controllers/userController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/refresh-token',refreshAccessToken);
router.post('/admin-login',adminLogin);
router.post("/admin-logout",adminLogout);

export default router