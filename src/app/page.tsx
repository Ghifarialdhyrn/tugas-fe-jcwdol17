/** @format */
"use client";

import { useEffect, useState } from "react";
import CardComponent from "../components/card.component";
import CarouselComponent from "../components/carousel.component";
import { IProduct } from "@/interfaces/product.interface";
import { api } from "./utils/axios";
import { useSearch } from "./utils/search.context";

export default function Home() {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-7">
      <CarouselComponent />
      <div className="grid grid-cols-5 max-w-screen-xl gap-2">
        {filteredProducts.map((product) => (
          <CardComponent product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
