import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/features/products/ProductsSlice";
import CreateProductSlice from "@/features/products/CreateProductSlice";
import userSlice from "@/features/users/UserSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    createProduct: CreateProductSlice,
    users: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
