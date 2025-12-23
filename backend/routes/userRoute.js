import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/admin-login',adminLogin);

export default router