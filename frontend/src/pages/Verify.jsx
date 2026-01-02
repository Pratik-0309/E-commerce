import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, isLoggedIn, backendURL, setCartItem } =
    useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!isLoggedIn) {
        return null;
      }
      const response = await axiosInstance.post(
        backendURL + "/api/order/verifyStripe",
        { success, orderId }
      );
      if (response.data.success) {
        setCartItem({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      navigate("/cart");
      toast.error("Payment verification failed. Please try again.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [isLoggedIn]);

  return <div></div>;
};

export default Verify;
