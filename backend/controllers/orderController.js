import Order from "../models/order.js";
import User from "../models/user.js";

// COD
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Stripe
const placeOrderStripe = async (req, res) => {};

// Razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders data for admin
const allOrders = async (req, res) => {};

// User order details
const userOrders = async (req, res) => {};

// update order Status
const updateOrderStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
};
