import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders.jsx";
import Login from "./components/Login.jsx";
import axios from "axios";
import { ToastContainer } from 'react-toastify';

export const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const currency = '$'

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!isLoggedIn ?(
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <hr className="text-gray-300 mt-3" />
          <div className="flex w-full ">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add isLoggedIn={isLoggedIn}/>}></Route>
                <Route path="/list" element={<List isLoggedIn={isLoggedIn}/>}></Route>
                <Route path="/orders" element={<Orders isLoggedIn={isLoggedIn}/>}></Route>
                <Route></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
