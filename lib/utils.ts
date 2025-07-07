import { clsx, type ClassValue } from "clsx";
import { Bounce, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { ProductT } from "./types/productsType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTotalPrice = (products: ProductT[]) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

export const calculateTotalQuantity = (products: ProductT[]) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

export const successToast = () =>
  toast.success("Successfully Created", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
