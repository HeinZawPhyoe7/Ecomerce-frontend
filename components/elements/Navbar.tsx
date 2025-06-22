"use client";

import { Home } from "lucide-react";
import React from "react";
import ShoppingCart from "./ShoppingCart";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleCart = () => {
    router.push("/cart");
  };

  const handleHome = () => {
    router.push("/");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-4">
          <div className="flex justify-center items-center">
            <Home />
            <h2 className="">Hein Store.</h2>
          </div>
          <button onClick={handleHome}>Home</button>
          <div>
            <button onClick={handleCart}>MyCart</button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
