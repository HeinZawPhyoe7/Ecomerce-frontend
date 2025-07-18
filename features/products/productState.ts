import { ProductsState } from "@/lib/types/productsType";

const initialProductDetails = {
  id: 0,
  name: "",
  category: "",
  brand: "",
  images: "",
  description: "",
  price: 0,
  quantity: 0,
  currency: "",
  exportFrom: "",
};

export const initialProductState: ProductsState = {
  allProducts: [],
  selectedProducts: [],
  selectedProductDetail: initialProductDetails,
  totalPrice: 0,
  totalQuantity: 0,
};
