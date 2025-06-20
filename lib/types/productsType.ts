export type ProductT = {
  id: number;
  name: string;
  category: string;
  brand: string;
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

export type CreateProductT = Omit<ProductT, "id">;

export type CreateProductType = {
  status: string;
  data: CreateProductT;
};
