import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/features/products/ProductsSlice";
import CreateProductSlice from "@/features/products/CreateProductSlice";
import userSlice from "@/features/users/UserSlice";
import addressSlice from "@/features/address/AddressSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    createProduct: CreateProductSlice,
    users: userSlice,
    address: addressSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
