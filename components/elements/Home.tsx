"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProducts } from "@/lib/apiCall";
import { useRouter } from "next/navigation";

const Home = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const router = useRouter();
  return (
    <div>
      <div className="relative">
        <button onClick={() => router.push("/admin")}>Create</button>
      </div>
      <div className="grid grid-cols-10 gap-4">
        {allProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={`data:image/jpeg;base64,${product.images}`}
              alt={product.name}
              className="w-20 h-20 rounded cursor-pointer hover:opacity-80 transition"
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
