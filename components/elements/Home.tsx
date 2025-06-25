"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProducts } from "@/lib/apiCall";
import { useRouter } from "next/navigation";
import { setProductDetails } from "@/features/products/ProductsSlice";
import { ProductT } from "@/lib/types/productsType";

const Home = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const router = useRouter();

  const handleProductClick = (product: ProductT) => {
    dispatch(setProductDetails(product));
    router.push("/product-detail");
  };
  return (
    <div>
      <div className="relative">
        <button onClick={() => router.push("/admin")}>Create</button>
      </div>
      <div className="grid grid-cols-8 gap-4">
        {allProducts.map((product, index) => (
          <div
            onClick={() => handleProductClick(product)}
            key={index}
            className="border p-4 rounded shadow"
          >
            <img
              src={`data:image/jpeg;base64,${product.images}`}
              alt={product.name}
              className="w-30 h-30 rounded cursor-pointer hover:opacity-80 transition"
            />
            <div>{product.name}</div>
            <div>
              {product.price} {product.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
