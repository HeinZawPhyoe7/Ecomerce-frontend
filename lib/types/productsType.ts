export type ProductT = {
  id: number;
  name: string;
  images: string;
  description: string;
  price: number;
  currency: string;
  exportFrom: string;
};

export interface ProductsState {
  allProducts: ProductT[];
  selectedProducts: ProductT[];
  totalPrice: number;
}
