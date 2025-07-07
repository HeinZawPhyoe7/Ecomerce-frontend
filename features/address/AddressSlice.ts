import { fetchaddresses } from "@/lib/apiCall";
import { AddressFormType, AddressState } from "@/lib/types/addressesType";
import { AddressType } from "@/lib/types/addressesType";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AddressState = {
  allAddresses: [],
  selectedAddress: null,
  data: {
    address: "",
    house_address: "",
    unit_floor: "",
    recipient_name: "",
    phone: 0,
    type: "",
    status: "",
    payment: "",
    total_quantity: 0,
    total_price: 0,
    productList: [],
    product_ids: [],
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressField: (
      state,
      action: PayloadAction<{ field: keyof AddressFormType; value: string }>
    ) => {
      const { field, value } = action.payload;

      if (field === "phone") {
        state.data[field] = parseFloat(value) || 0;
      } else {
        state.data[field] = value as never;
      }
    },

    resetAddressForm: (state) => {
      state.data = initialState.data;
      state.selectedAddress = initialState.selectedAddress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchaddresses.fulfilled,
        (state, action: PayloadAction<AddressType[]>) => {
          state.allAddresses = action.payload;
          state.selectedAddress =
            action.payload.length > 0 ? action.payload[0] : null;
        }
      )
      .addCase(fetchaddresses.rejected, (state) => {
        state.allAddresses = [];
      });
  },
});

export const { setAddressField, resetAddressForm } = addressSlice.actions;

export const selectedAddressForm = (state: RootState) => state.address.data;
export default addressSlice.reducer;
