"use client";

import {
  addProducts,
  getTotalPrice,
  getTotalQuantity,
  removeAll,
  removeProduct,
  selectedProductsList,
} from "@/features/products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import Address from "./Address";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectedProductsList);
  const currentTotalPrice = useAppSelector(getTotalPrice);
  const currentTotalQuantity = useAppSelector(getTotalQuantity);
  console.log("select", selectedProducts);

  return (
    <div>
      <div className="px-[300px]">
        {selectedProducts.map((product, index: number) => (
          <div className="flex justify-start items-start" key={index}>
            <div>
              <img
                src={`data:image/jpeg;base64,${product.images}`}
                alt={product.name}
                className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
              />
            </div>
            <div>
              <div>{product.name}</div>
              <div>{product.description}</div>
              <div>
                {product.price}
                {product.currency}
              </div>
              <div className="flex justify-start items-center gap-3">
                <button
                  onClick={() => dispatch(removeProduct(product.id))}
                  className="bg-red-600 hover:bg-red-500 active:bg-red-700 cursor-pointer rounded-md shadow-sm text-white p-0.5"
                >
                  <Minus />
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => dispatch(addProducts(product))}
                  className="bg-green-600 hover:bg-green-500 active:bg-green-700 cursor-pointer rounded-md shadow-sm text-white p-0.5"
                >
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div>Total Price: {currentTotalPrice} MMK</div>
        <div>Total Quantity: {currentTotalQuantity}</div>
        <div>
          <Address />
        </div>
        <div>
          <button
            onClick={() => dispatch(removeAll())}
            className="bg-red-600 hover:bg-red-500 active:bg-red-700 cursor-pointer rounded-md shadow-sm text-white p-2"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
