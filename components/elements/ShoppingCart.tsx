"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  removeProduct,
  selectedProductsList,
} from "@/features/products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ProductT } from "@/lib/types/productsType";
import { Minus, ShoppingCartIcon } from "lucide-react";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const selectedProducts = useAppSelector(selectedProductsList);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ShoppingCartIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>

            <div className="flex flex-col justify-center items-center gap-4">
              {selectedProducts.map((product: ProductT, index: number) => (
                <div key={index} className="border p-4 rounded shadow">
                  <img
                    src={`data:image/jpeg;base64,${product.images}`}
                    alt={product.name}
                    className="w-20 h-20 rounded cursor-pointer hover:opacity-80 transition"
                  />
                  <div>{product.name}</div>
                  <div>
                    {product.price} {product.currency}
                  </div>
                  <button
                    onClick={() => dispatch(removeProduct(product.id))}
                    className="bg-red-600 hover:bg-red-500 active:bg-red-700 cursor-pointer rounded-md shadow-sm text-white p-0.5"
                  >
                    <Minus />
                  </button>
                </div>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingCart;
