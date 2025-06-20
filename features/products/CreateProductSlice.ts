import { createProduct } from "@/lib/apiCall";
import { CreateProductT, CreateProductType } from "@/lib/types/productsType";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CreateProductType = {
  status: "",
  data: {
    name: "",
    category: "",
    brand: "",
    images: "",
    description: "",
    price: 0,
    currency: "",
    exportFrom: "",
  },
};

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    setProductField: (
      state,
      action: PayloadAction<{ field: keyof CreateProductT; value: string }>
    ) => {
      const { field, value } = action.payload;

      // Convert "price" to number if field is "price"
      if (field === "price") {
        state.data[field] = parseFloat(value) || 0;
      } else {
        state.data[field] = value as any;
      }
    },

    resetProductForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});

export default createProductSlice.reducer;

export const { setProductField, resetProductForm } = createProductSlice.actions;

export const selectedProductForm = (state: RootState) =>
  state.createProduct.data;
export const createProductStatus = (state: RootState) =>
  state.createProduct.status;
