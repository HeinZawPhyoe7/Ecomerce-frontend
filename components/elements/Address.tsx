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
import { Atom, ContactRound } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectedAddressForm,
  setAddressField,
} from "@/features/address/AddressSlice";
import { createAddress } from "@/lib/apiCall";
import {
  selectedProductDetail,
  selectedProductsList,
} from "@/features/products/ProductsSlice";
import { useRouter } from "next/navigation";
const Address = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addressData = useAppSelector(selectedAddressForm);
  const productList = useAppSelector(selectedProductsList);
  const productIds = productList.map((product) => product.id);
  console.log("productIds", productIds);

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
        status: addressData.status,
        payment: addressData.payment,
        product_ids: productIds,
      })
    );
    router.push("/shipping");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-md shadow-md text-white p-2 bg-sky-400 cursor-pointer hover:opacity-70 text-xl font-serif font-bold">
            Order
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-serif font-bold">
              Shipping Address
            </DialogTitle>
            <div className="space-y-2">
              <div>
                <label
                  className="flex flex-col justify-start items-start text-sm font-serif font-bold"
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
                  className="flex flex-col justify-start items-start text-sm font-serif font-bold"
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
                  className="flex flex-col justify-start items-start text-sm font-serif font-bold"
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
                  className="flex w-full flex-col justify-start items-start text-sm font-serif font-bold"
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
                <button className="absolute top-6.5 right-2 cursor-pointer">
                  <ContactRound />
                </button>
              </div>
              <div>
                <label
                  className="flex flex-col justify-start items-start text-sm font-serif font-bold"
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
              <div className="flex justify-between items-start text-xl font-serif font-bold">
                <label htmlFor="type">Address Type</label>
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Home"
                      className="text-sm font-serif font-bold"
                    >
                      Home
                    </SelectItem>
                    <SelectItem
                      value="Office"
                      className="text-sm font-serif font-bold"
                    >
                      Office
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={handleOrder}
                  className="bg-sky-400 text-white rounded-md shadow-md p-2 cursor-pointer text-xl font-serif font-bold"
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
