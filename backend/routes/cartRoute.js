import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import verifyJWT from '../middleware/auth.js';

const router = express.Router();

router.post('/add',verifyJWT,addToCart);
router.put('/update',verifyJWT,updateCart);
router.get('/get',verifyJWT,getUserCart);

export default router;