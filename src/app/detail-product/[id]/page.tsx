"use client";

import { IProduct } from "@/interfaces/product.interface";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct use of useParams
import { api } from "../../utils/axios";
import { useCart } from "@/app/utils/cart.context";

export default function DetailProduct() {
  const params = useParams(); // Extract product id from URL
  const [product, setProduct] = useState<IProduct | null>(null);
  const { addToCart } = useCart();
  const { items } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        try {
          const res = await api.get(`/products/${params.id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      quantity: 1, // Default quantity set to 1
      img: product.img, // Pass the image property
      description: product.description, // Pass the description property
    });
  };

  return (
    <div className="w-full h-[840px] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-10">Detail Product</h1>

      <div className="bg-white w-[80%] h-[500px] flex rounded-xl shadow-2xl shadow-white">
        <div className="w-[50%] flex justify-center items-center border-2 border-black shadow-2xl m-10 rounded-lg">
          <img
            src={product.img}
            alt={product.product_name}
            className="w-[400px] rounded-lg"
          />
        </div>

        <div className="w-[50%] text-left p-6 text-black flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold mb-4">{product.product_name}</h1>
          <p className="text-lg mb-6">{product.description}</p>
          <div className="flex flex-row mb-6 text-lg">
            <p className="text-gray-700">$ {product.price}</p>
          </div>
          <button
            className="btn btn-black text-white w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
