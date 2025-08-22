"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProducts } from "@/lib/apiCall";
import { useRouter } from "next/navigation";
import { setProductDetails } from "@/features/products/ProductsSlice";
import { ProductT } from "@/lib/types/productsType";
import Image from "next/image";

const Home = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.products);
  const { accessToken } = useAppSelector((state) => state.users);
  console.log("aa", accessToken);
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
        {/* <button onClick={() => router.push("/admin")}>Create</button> */}
      </div>
      <div className="grid grid-cols-8 gap-4">
        {allProducts.map((product: any, index: number) => (
          <div
            onClick={() => handleProductClick(product)}
            key={index}
            className="border p-4 rounded shadow"
          >
            <Image
              src={`data:image/jpeg;base64,${product.images}`}
              alt={product?.name || "Product Image"}
              width={120}
              height={120}
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
