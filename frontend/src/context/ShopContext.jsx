import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItem);
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
    setCartItem(cartData);
    if (isLoggedIn) {
      try {
        await axiosInstance.post("/api/cart/add", { itemId, size });
      } catch (error) {
        console.log("Error while adding to cart:", error);
        toast.error("Failed to add product in cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (isLoggedIn) {
      try {
        await axiosInstance.put("/api/cart/update", { itemId, size, quantity });
      } catch (error) {
        console.log("Error while updating cart:", error);
        toast.error("Failed to update product in cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.status == 200) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (isLoggedIn) => {
    try {
      const response = await axiosInstance.get("/api/cart/get");
      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserCart(isLoggedIn);
    } else {
      setCartItem({});
    }
  }, [isLoggedIn]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    updatedQuantity,
    getCartAmount,
    navigate,
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
