"use client";

import {
  addProducts,
  selectedProductDetail,
  selectedProductsList,
} from "@/features/products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import React from "react";

const ProductDetail = () => {
  const currentSelectedProduct = useAppSelector(selectedProductDetail);
  const addToCartProducts = useAppSelector(selectedProductsList);
  const dispatch = useAppDispatch();

  console.log("current details", addToCartProducts);
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-5 font-serif space-y-4">
        <div>
          <Image
            src={`data:image/jpeg;base64,${currentSelectedProduct.images}`}
            alt={currentSelectedProduct.name}
            width={120}
            height={120}
            className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
          />
        </div>
        <div className="text-2xl font-bold">{currentSelectedProduct.name}</div>
        <div className="text-start w-[300px] text-sm opacity-70">
          {currentSelectedProduct.description}
        </div>
        <div className="text-sm opacity-70">
          Brand: {currentSelectedProduct.brand}
        </div>
        <div className="text-sm opacity-70">
          Price: {currentSelectedProduct.price}
          {currentSelectedProduct.currency}
        </div>
        <div>
          <button
            className="bg-green-600 hover:bg-green-500 active:bg-green-700 cursor-pointer rounded-md shadow-sm text-white p-2"
            onClick={() => dispatch(addProducts(currentSelectedProduct))}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
