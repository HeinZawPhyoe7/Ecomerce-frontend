"use client";

import { selectedProductsList } from "@/features/products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectedProductsList);
  console.log("select", selectedProducts);

  return (
    <div>
      <div>
        {selectedProducts.map((product, index: number) => (
          <div key={index}>
            <div>
              <img
                src={`data:image/jpeg;base64,${product.images}`}
                alt={product.name}
                className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
              />
            </div>
            <div>{product.name}</div>
            <div>{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
