import { ProductT } from "@/features/products/ProductsSlice";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTotalPrice = (items: ProductT[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
