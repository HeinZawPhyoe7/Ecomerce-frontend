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
import Image from "next/image";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectedProductsList);
  const currentTotalPrice = useAppSelector(getTotalPrice);
  const currentTotalQuantity = useAppSelector(getTotalQuantity);
  console.log("select", selectedProducts);

  return (
    <div>
      <div className="px-[300px] font-serif ">
        {selectedProducts.map((product, index: number) => (
          <div className="grid grid-cols-10 mx-auto gap-4 mb-4" key={index}>
            <div className="col-span-2">
              <Image
                src={`data:image/jpeg;base64,${product.images}`}
                alt={product.name}
                width={100}
                height={100}
                className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
              />
            </div>
            <div className="col-span-8">
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="text-sm opacity-70">{product.description}</div>
              <div className="text-sm">
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
        <div className="text-xl opacity-80">
          Total Price: {currentTotalPrice} MMK
        </div>
        <div className="text-xl opacity-80">
          Total Quantity: {currentTotalQuantity}
        </div>
        <div className="flex justify-start items-center gap-6">
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
    </div>
  );
};

export default CartPage;
