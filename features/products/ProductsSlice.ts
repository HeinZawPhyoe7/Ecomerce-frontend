import { createProduct, fetchProducts } from "@/lib/apiCall";
import { ProductT } from "@/lib/types/productsType";
import { calculateTotalPrice, calculateTotalQuantity } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProductState } from "./productState";

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    addProducts(state, action: PayloadAction<ProductT>) {
      const existing = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.selectedProducts);
      state.totalQuantity = calculateTotalQuantity(state.selectedProducts);
    },
    setProductDetails(state, action: PayloadAction<ProductT>) {
      state.selectedProductDetail = action.payload;
    },
    setProducts(state, action: PayloadAction<ProductT[]>) {
      state.allProducts = action.payload;
    },
    removeProduct(state, action: PayloadAction<number>) {
      const index = state.selectedProducts.findIndex(
        (product) => product.id === action.payload
      );

      if (index !== -1) {
        const product = state.selectedProducts[index];

        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.selectedProducts.splice(index, 1);
        }

        state.totalPrice = calculateTotalPrice(state.selectedProducts);
      }
    },

    removeAll(state) {
      state.selectedProducts = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
      });
  },
});

export default productsSlice.reducer;
export const {
  addProducts,
  removeProduct,
  removeAll,
  setProductDetails,
  setProducts,
} = productsSlice.actions;
export const selectedProductsList = (state: RootState) =>
  state.products.selectedProducts;
export const getTotalPrice = (state: RootState) => state.products.totalPrice;
export const getTotalQuantity = (state: RootState) =>
  state.products.totalQuantity;
export const selectedProductDetail = (state: RootState) =>
  state.products.selectedProductDetail;
