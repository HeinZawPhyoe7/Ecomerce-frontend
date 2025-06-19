import { fetchProducts } from "@/lib/apiCall";
import { ProductsState, ProductT } from "@/lib/types/productsType";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductsState = {
  allProducts: [],
  selectedProducts: [],
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<ProductT>) {
      state.selectedProducts.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      const index = state.selectedProducts.findIndex(
        (product) => product.id === idToRemove
      );

      if (index !== -1) {
        state.totalPrice -= state.selectedProducts[index].price;
        state.selectedProducts.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
  },
});

export default productsSlice.reducer;
export const { addProducts, removeProduct } = productsSlice.actions;
export const selectedProductsList = (state: RootState) =>
  state.products.selectedProducts;
