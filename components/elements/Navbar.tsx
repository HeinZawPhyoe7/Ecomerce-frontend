import { Home } from "lucide-react";
import React from "react";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <Home />
            <h2 className="">Hein Store.</h2>
          </div>
          <div>Home</div>
          <div>fg</div>
          <div>fdg</div>
          <div>dfg</div>
        </div>
        <div className="flex justify-center items-center">
          <div>ssfg</div>
          <div>cfgf</div>
          <div>hfgs</div>
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
