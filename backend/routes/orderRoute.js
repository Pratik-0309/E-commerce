import express from 'express';
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import verifyJWT from "../middleware/auth.js"

const router = express.Router();

// Admin routes
router.get('/orders',adminAuth,allOrders)
router.post('/status',adminAuth,updateOrderStatus)

// payment routes
router.post('/placeorder',verifyJWT,placeOrder)
router.post('/stripe',verifyJWT,placeOrderStripe)
router.post('/razorpay',verifyJWT,placeOrderRazorpay)

// user routes
router.get('/userorders',verifyJWT,userOrders)


export default router;