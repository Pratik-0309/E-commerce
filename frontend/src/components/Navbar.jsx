import { assets } from "../assets/assets.js";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    backendURL,
    navigate,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(ShopContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(backendURL + "/api/user/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
            <img
              onClick={()=> isLoggedIn ? null :  navigate('/login')}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          {isLoggedIn && <div className="group-hover:block hidden absolute dropdrop-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p
                onClick={handleLogout}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p
            className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black
            text-white aspect-square rounded-full text-[8px]"
          >
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* Mobile menu */}
      <div
        className={`absolute top-0 right-0 overflow-hidden bg-white transition-all
            ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
