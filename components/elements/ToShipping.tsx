"use client";

import { fetchaddresses } from "@/lib/apiCall";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { AddressType } from "@/lib/types/addressesType";

const ToShipping = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.allAddresses);
  console.log("address", addresses);

  useEffect(() => {
    dispatch(fetchaddresses());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div>
        <h2>Shipping Address</h2>
        <div>
          {addresses.length === 0 ? (
            <p>No addresses found.</p>
          ) : (
            addresses.map((item: AddressType, index: number) => (
              <div key={item.id ?? index}>
                <div>
                  {item.status === "shipping" ? (
                    <div>Your Product{item.product_ids} is shipping</div>
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
