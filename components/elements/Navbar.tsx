"use client";

import { Home, Search, ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, searchProducts } from "@/lib/apiCall";
import {
  selectedProductsList,
  setProducts,
} from "@/features/products/ProductsSlice";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") || "");
  }, []);
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectedProductsList);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();
  console.log("aa", selectedProducts);

  const handleCart = () => {
    router.push("/cart");
  };

  const handleShipping = () => {
    router.push("/shipping");
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
    await logout();
    localStorage.removeItem("accessToken");
    router.push("/login");
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
          <div
            className="flex justify-center items-center cursor-pointer text-violet-600"
            onClick={handleHome}
          >
            <Home />
            <h2 className="text-2xl font-bold font-serif">Hein Store.</h2>
          </div>
          <button
            className="text-violet-600 text-xl font-serif font-black cursor-pointer"
            onClick={handleHome}
          >
            Home
          </button>
          <div>
            <button
              className="text-violet-600 text-xl font-serif font-black cursor-pointer"
              onClick={handleCart}
            >
              Cart
            </button>
          </div>
          <div>
            <button
              className="text-violet-600 text-xl font-serif font-black cursor-pointer"
              onClick={handleShipping}
            >
              Shipping
            </button>
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
            className=" rounded-md cursor-pointer shadow-md text-white bg-violet-500 text-sm p-1.5"
          >
            <Search className="p-1 text-sm " color="white" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button>
            <div className="relative">
              <ShoppingCartIcon
                onClick={handleCart}
                className="text-violet-400 cursor-pointer hover:opacity-70"
              />
              <div className="absolute -top-3 -right-3 bg-violet-400 rounded-full px-1 text-sm text-white">
                {selectedProducts.length}
              </div>
            </div>
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
