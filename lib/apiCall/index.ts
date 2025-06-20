import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { CreateProductT, ProductT } from "../types/productsType";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosInstance.get("/auth/getall/products");
    return response.data.products as ProductT[];
  }
);

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
