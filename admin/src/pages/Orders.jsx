import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ isLoggedIn }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    if (!isLoggedIn) {
      return null;
    }
    try {
      const response = await axios.get(backendURL + "/api/order/orders", {
        withCredentials: true,
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isLoggedIn]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div className="">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2.5fr_1.5fr_1fr_1fr] gap-4 items-start border border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-white"
          >
            <img className="w-12 border p-2" src={assets.parcel_icon} alt="" />
            <div>
              <div className="mb-4">
                {order.items.map((item, idx) => (
                  <p className="font-semibold text-gray-800" key={idx}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500 font-normal">
                      {item.size}
                    </span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="font-bold text-gray-900 mt-3 mb-1">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-gray-600 leading-tight">
                <p>{order.address.street}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                <p className="mt-2 font-medium">{order.address.phone}</p>
              </div>
            </div>
            <div className="text-gray-700">
              <p className="text-sm font-medium">
                Items : {order.items.length}
              </p>
              <p className="mt-3 font-medium">
                Method :{" "}
                <span className="font-normal">{order.paymentMethod}</span>
              </p>
              <p className="font-medium">
                Payment :{" "}
                <span className="font-normal">
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p className="font-medium">
                Date :{" "}
                <span className="font-normal">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {currency}
              {order.amount}
            </p>
            <select
              value={order.status}
              className="p-2 border border-gray-300 rounded font-semibold bg-gray-50 cursor-pointer outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
