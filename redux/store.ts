import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/features/products/ProductsSlice";
import CreateProductSlice from "@/features/products/CreateProductSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    createProduct: CreateProductSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
