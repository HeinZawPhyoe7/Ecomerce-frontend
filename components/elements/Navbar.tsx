"use client";

import { Home, Search, ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/redux/hook";
import { logout, searchProducts } from "@/lib/apiCall";
import { setProducts } from "@/features/products/ProductsSlice";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") || "");
  });
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const handleCart = () => {
    router.push("/cart");
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    const response = await logout(accessToken || "");
    if (response.code === 200) {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchName(e.target.value);
  };

  const handleSearch = async () => {
    const response = await searchProducts(searchName);
    dispatch(setProducts(response));
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
        <div className="flex justify-center items-center gap-1">
          <input
            type="text"
            onChange={handleSearchChange}
            className="border px-3 py-1.5 border-gray-950 rounded-md"
          />
          <button
            onClick={handleSearch}
            className=" rounded-md cursor-pointer shadow-md text-white bg-blue-500 text-sm p-1.5"
          >
            <Search className="p-1 text-sm " color="white" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button>
            <ShoppingCart />
          </button>
        </div>
        <div>
          {accessToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-400 p-2 text-white border cursor-pointer rounded-md shadow-md"
            >
              Logout
            </button>
          ) : (
            <div>
              <button
                onClick={handleRegister}
                className="bg-sky-400 p-2 text-white border cursor-pointer rounded-md shadow-md"
              >
                Register
              </button>
              <button
                onClick={handleLogin}
                className="bg-sky-400 p-2 text-white border cursor-pointer rounded-md shadow-md"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
