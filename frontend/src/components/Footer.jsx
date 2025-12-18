import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div className="">
        <img src={assets.logo} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3 text-gray-600 ">
          Our brand is built on a foundation of quality and timeless design. We
          are dedicated to providing our customers with the finest products and
          an unparalleled shopping experience, ensuring every piece you take
          home is one you'll cherish for years to come.
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privay Policy</li>
        </ul>
      </div>

        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+1-673-222-9088</li>
                <li>forever.fashion@gmail.in</li>
            </ul>
        </div>
    </div>
    <div className="">
        <hr className="text-gray-300" />
        <p className="py-5 text-sm text-center">Copyright © 2024 Forever.com - All rights reserved.</p>
    </div>
    </>
    
  );
}

export default Footer;
