import { createProduct, fetchProducts } from "@/lib/apiCall";
import { ProductsState, ProductT } from "@/lib/types/productsType";
import { calculateTotalPrice } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialProjectDetails = {
  id: 0,
  name: "",
  category: "",
  brand: "",
  images: "",
  description: "",
  price: 0,
  currency: "",
  exportFrom: "",
};

const initialState: ProductsState = {
  allProducts: [],
  selectedProducts: [],
  selectedProductDetail: initialProjectDetails,
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<ProductT>) {
      state.selectedProducts.push(action.payload);
      state.totalPrice = calculateTotalPrice(state.selectedProducts);
    },
    setProductDetails(state, action: PayloadAction<ProductT>) {
      state.selectedProductDetail = action.payload;
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
    removeAll(state) {
      (state.selectedProducts = []), (state.totalPrice = 0);
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
export const { addProducts, removeProduct, removeAll, setProductDetails } =
  productsSlice.actions;
export const selectedProductsList = (state: RootState) =>
  state.products.selectedProducts;
export const getTotalPrice = (state: RootState) => state.products.totalPrice;
export const selectedProductDetail = (state: RootState) =>
  state.products.selectedProductDetail;
