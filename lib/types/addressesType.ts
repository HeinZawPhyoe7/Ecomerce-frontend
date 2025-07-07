import { ProductT } from "./productsType";

export type AddressType = {
  id?: number;
  address: string;
  house_address: string;
  unit_floor: string;
  recipient_name: string;
  phone: number;
  type?: "Home" | "Office" | string;
  status: string;
  payment: string;
  total_quantity: number;
  total_price: number;
  productList: ProductT[];
  product_ids: number[];
  created_at?: string;
  updated_at?: string;
};

export interface AddressState {
  allAddresses: AddressType[];
  selectedAddress?: AddressType | any;
  data: AddressFormType;
}

export type AddressFormType = Omit<
  AddressType,
  "id" | "user_id" | "created_at" | "updated_at"
>;
