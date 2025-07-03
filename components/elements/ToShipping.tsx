"use client";

import { fetchaddresses } from "@/lib/apiCall";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { AddressType } from "@/lib/types/addressesType";
import { ProductT } from "@/lib/types/productsType";

const ToShipping = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.allAddresses);
  const products = useAppSelector((state) => state.products.selectedProducts);
  console.log("bb", addresses);
  console.log("aa", products);

  useEffect(() => {
    dispatch(fetchaddresses());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div>
        <h2>Order Details</h2>
        <div className="">
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
                        <img
                          src={`data:image/jpeg;base64,${product.images}`}
                          alt={product.name}
                          className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
                        />
                      </div>

                      <div>
                        <div>{product.name}</div>
                        <div className="flex justify-center items-center gap-2">
                          <p className="text-sky-400 text-[10px] p-0.5">
                            30 Days Free Returns
                          </p>
                          <p className="text-sky-400 text-[10px] p-0.5">
                            Warranty By Seller
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p>
                            {product.price}
                            {product.currency}
                          </p>
                          <p>Qty:1</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>Delivering to{item.address}</div>
                <div>Paid By{item.payment}</div>
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
