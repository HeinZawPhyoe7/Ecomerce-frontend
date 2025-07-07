import { ProductsState } from "@/lib/types/productsType";

const initialProjectDetails = {
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
  selectedProductDetail: initialProjectDetails,
  totalPrice: 0,
  totalQuantity: 0,
};
