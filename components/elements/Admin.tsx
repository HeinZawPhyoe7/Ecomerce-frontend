"use client";

import {
  createProductStatus,
  resetProductForm,
  selectedProductForm,
  setProductField,
} from "@/features/products/CreateProductSlice";
import { createProduct } from "@/lib/apiCall";
import { successToast } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

import React from "react";

const Admin = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectedProductForm);
  const createApiStatus = useAppSelector(createProductStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setProductField({ field: name as any, value }));
  };

  const handleCreate = () => {
    dispatch(
      createProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        currency: formData.currency,
        exportFrom: formData.exportFrom,
        brand: formData.brand,
        category: formData.category,
        images: formData.images,
      })
    );
    console.log("createApiStatus", createApiStatus);
    if (createApiStatus === "succeeded") {
      successToast();
    }
  };
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col justify-start items-start space-y-2">
        <h2>Create Product Page</h2>

        <button onClick={() => router.push("/")}>Home</button>

        {[
          "name",
          "category",
          "brand",
          "images",
          "description",
          "price",
          "currency",
          "exportFrom",
        ].map((field, index) => (
          <div key={index} className="flex flex-col items-start justify-start">
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={field === "price" ? "number" : "text"}
              className="border rounded-md border-gray-500 p-2"
              value={(formData as any)[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div>
          <button
            onClick={handleCreate}
            className="bg-sky-400 border rounded-xl p-2 text-white cursor-pointer"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
