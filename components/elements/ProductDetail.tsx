"use client";

import {
  addProducts,
  selectedProductDetail,
  selectedProductsList,
} from "@/features/products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";

const ProductDetail = () => {
  const currentSelectedProduct = useAppSelector(selectedProductDetail);
  const addToCartProducts = useAppSelector(selectedProductsList);
  const dispatch = useAppDispatch();

  console.log("current details", addToCartProducts);
  return (
    <div>
      <div>
        <div>
          <img
            src={`data:image/jpeg;base64,${currentSelectedProduct.images}`}
            alt={currentSelectedProduct.name}
            className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
          />
        </div>
        <div>{currentSelectedProduct.name}</div>
        <div>Brand:{currentSelectedProduct.brand}</div>
        <div>{currentSelectedProduct.price}</div>
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
