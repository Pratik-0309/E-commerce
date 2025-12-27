import express from 'express'
import { loginUser, registerUser, adminLogin, adminLogout } from '../controllers/userController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/admin-login',adminLogin);
router.post("/admin-logout",adminLogout);

export default router