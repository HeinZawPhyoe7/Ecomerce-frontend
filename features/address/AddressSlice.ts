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
    product_id: 0,
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<AddressType[]>) => {
      state.allAddresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<AddressType>) => {
      state.allAddresses.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.allAddresses = state.allAddresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    setSelectedAddress: (state, action: PayloadAction<AddressType>) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
    setAddressField: (
      state,
      action: PayloadAction<{ field: keyof AddressFormType; value: string }>
    ) => {
      const { field, value } = action.payload;

      if (field === "phone" || field === "product_id") {
        state.data[field] = parseFloat(value) || 0;
      } else {
        state.data[field] = value as never;
      }
    },

    resetAddressForm: () => initialState,
  },
});

export const {
  setAddresses,
  addAddress,
  removeAddress,
  setSelectedAddress,
  clearSelectedAddress,
  setAddressField,
  resetAddressForm,
} = addressSlice.actions;

export const selectedAddressForm = (state: RootState) => state.address.data;
export default addressSlice.reducer;
