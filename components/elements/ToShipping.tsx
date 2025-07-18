"use client";

import { deleteProductId, fetchaddresses } from "@/lib/apiCall";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { AddressType } from "@/lib/types/addressesType";
import Image from "next/image";

const ToShipping = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.allAddresses);

  useEffect(() => {
    dispatch(fetchaddresses());
  }, [dispatch]);

  const handleCancelClick = async (hein: number, zaw: number) => {
    const response = await deleteProductId(hein, zaw);
    if ((response.code = 200)) {
      dispatch(fetchaddresses());
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="">
        <h2>Order Details</h2>
        <div className="grid grid-cols-3">
          {addresses.length === 0 ? (
            <p>No addresses found.</p>
          ) : (
            addresses.map((item: AddressType, index: number) => (
              <div key={item.id ?? index} className="space-y-2">
                <div>
                  {item.productList?.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-start items-start"
                    >
                      <div>
                        <Image
                          src={`data:image/jpeg;base64,${product.images}`}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <div>{product.name}</div>
                        <div className="flex justify-center items-center gap-1">
                          <p className="text-sky-600 bg-sky-100 text-[10px] px-1 py-0.5 rounded-xs">
                            30 Days Free Returns
                          </p>
                          <p className="text-sky-600 bg-sky-100 text-[10px] px-1 py-0.5 rounded-xs">
                            Warranty By Seller
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="">
                            {product.price} {product.currency}
                          </p>
                          <p>Qty:{item.total_quantity}</p>
                        </div>
                        <div className="flex justify-end items-center">
                          <button
                            onClick={() =>
                              handleCancelClick(item.id || 0, product.id)
                            }
                            className="border border-gray-900 rounded-md shadow-md text-sky-400 py-1 px-3 cursor-pointer"
                          >
                            Cancle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>Delivering to{item.address}</div>
                <div>Paid by {item.payment}</div>
                <div>
                  {item.status === "shipping" ? (
                    <div>Your Product is shipping</div>
                  ) : (
                    <div>Your Product is Arrive</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToShipping;
