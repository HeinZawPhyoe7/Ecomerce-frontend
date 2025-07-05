import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { CreateProductT, ProductT } from "../types/productsType";
import { AddressType } from "../types/addressesType";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosInstance.get("/auth/getall/products");
    return response.data.products as ProductT[];
  }
);

export const searchProducts = async (searchProducts: string) => {
  const response = await axiosInstance.post("/auth/search/product", {
    name: searchProducts,
  });
  return response.data.products as ProductT[];
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: CreateProductT, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/create/products",
        product
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Create failed"
      );
    }
  }
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (address: AddressType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/create/address",
        address
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Create failed"
      );
    }
  }
);

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout", {});

  return response.data;
};

export const fetchaddresses = createAsyncThunk(
  "address/fetchaddresses",
  async () => {
    const response = await axiosInstance.get("/auth/get/addresses", {});
    return response.data.addresses as AddressType[];
  }
);

export const deleteProductId = async (addressId: number, productId: number) => {
  const response = await axiosInstance.post("/auth/delete/product", {
    addressId,
    productId: [productId],
  });
  return response.data;
};
