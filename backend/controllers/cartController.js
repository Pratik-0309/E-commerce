import User from "../models/user.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size } = req.body;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData: cartData });

    return res
      .status(200)
      .json({
        message: "Product added to cart successfully",
        cartData,
        success: true,
      });
  } catch (error) {
    console.log("Error while adding to cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "failed to add product in cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);
    let cartData = await User.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData: cartData });

    return res
      .status(200)
      .json({ message: "Cart updated successfully", cartData, success: true });
  } catch (error) {
    console.log("Error while updating  cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "failed to update product in cart" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

        return res.status(200).json({ message: "Cart data fetched Successfully", cartData, success: true });

  } catch (error) {
    console.log("Error while fetching cart Data:", error);
    return res.status(500).json({success: false, message: "failed to fetch product in cart" });
  }
};

export { addToCart, updateCart, getUserCart };
