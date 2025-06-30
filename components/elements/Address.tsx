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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactRound } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectedAddressForm,
  setAddressField,
} from "@/features/address/AddressSlice";
import { createAddress } from "@/lib/apiCall";
import { selectedProductDetail } from "@/features/products/ProductsSlice";
const Address = () => {
  const dispatch = useAppDispatch();
  const addressData = useAppSelector(selectedAddressForm);
  const productId = useAppSelector(selectedProductDetail);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAddressField({ field: name as any, value }));
  };

  const handleTypeChange = (value: string) => {
    dispatch(setAddressField({ field: "type", value }));
  };

  const handleOrder = () => {
    dispatch(
      createAddress({
        address: addressData.address,
        house_address: addressData.house_address,
        unit_floor: addressData.unit_floor,
        recipient_name: addressData.recipient_name,
        phone: addressData.phone,
        type: addressData.type,
        product_id: productId.id,
      })
    );
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-md shadow-md text-white p-2 bg-sky-400 cursor-pointer hover:opacity-70">
            Order
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Shipping Address</DialogTitle>
            <div className="space-y-2">
              <div>
                <label
                  className="flex flex-col justify-start items-start"
                  htmlFor=""
                >
                  City/District/Postcode/Subdistrict
                </label>
                <input
                  name="address"
                  value={addressData.address}
                  className="border w-full px-3 py-1.5 border-gray-950 rounded-md"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="flex flex-col justify-start items-start"
                  htmlFor=""
                >
                  House No.,Soi,Moo,Street Name
                </label>
                <input
                  name="house_address"
                  value={addressData.house_address}
                  className="border w-full px-3 py-1.5 border-gray-950 rounded-md"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="flex flex-col justify-start items-start"
                  htmlFor=""
                >
                  Unit/Floor
                </label>
                <input
                  name="unit_floor"
                  value={addressData.unit_floor}
                  className="border w-full px-3 py-1.5 border-gray-950 rounded-md"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label
                  className="flex w-full flex-col justify-start items-start"
                  htmlFor=""
                >
                  Recipient's Name
                </label>
                <input
                  name="recipient_name"
                  value={addressData.recipient_name}
                  className="border w-full px-3 py-1.5 border-gray-950 rounded-md"
                  type="text"
                  onChange={handleChange}
                />
                <button className="absolute top-7.5 right-2 cursor-pointer">
                  <ContactRound />
                </button>
              </div>
              <div>
                <label
                  className="flex flex-col justify-start items-start"
                  htmlFor=""
                >
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={addressData.phone}
                  className="border w-full px-3 py-1.5 border-gray-950 rounded-md"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between items-start">
                <label htmlFor="type">Address Type</label>
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={handleOrder}
                  className="bg-sky-400 text-white rounded-md shadow-md p-2 cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Address;
