import React from "react";
import { assets } from "../assets/assets";
import axios from 'axios'
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Navbar = ({setIsLoggedIn}) => {

  const logoutHandler = async () => {
    try {
      const response = await axios.post(backendURL+ "/api/user/admin-logout");
      if(response.data.success){
        setIsLoggedIn(false);
      }
      localStorage.removeItem('isLoggedIn')
      toast.success("Logged out Successfully.")
    } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn')
    }
  }

  return (
    <div className="flex items-center justify-between px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button 
        onClick={logoutHandler}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs
        sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
