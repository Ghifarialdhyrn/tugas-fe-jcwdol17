"use client";

import { useState } from "react";
import { useCart } from "@/app/utils/cart.context";
import { useSearch } from "@/app/utils/search.context";
import axios from "axios";

export default function NavbarComponent() {
  const { searchQuery, setSearchQuery } = useSearch();
  const {
    items,
    totalQuantity,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleModalCart = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      product_name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      img: productImg,
    };

    try {
      const response = await axios.post(
        "http://localhost:2000/products",
        newProduct
      );
      console.log(response.data.message); // Success message

      // Close the modal after submission
      toggleProductModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="navbar bg-black flex justify-center sticky top-0 z-10">
      <div className="w-full max-w-screen-xl flex gap-3">
        <div className="flex-none">
          <a href="/" className="btn btn-ghost text-xl">
            Toko Ghifarialdhy
          </a>
        </div>
        <div className="w-full">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="search"
            placeholder="Search Product...."
            className="w-full p-2 rounded-lg"
          />
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={toggleModalCart}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {totalQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={toggleProductModal}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                  className="w-8 h-8"
                >
                  <g
                    fill="#fffdfd"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-12.683 -10.317,-23 -23,-23zM37,26h-11v11h-2v-11h-11v-2h11v-11h2v11h11z"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cart */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Cart</h3>
            {items.length > 0 ? (
              <div>
                <ul className="mt-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <img
                        src={item.img}
                        alt={item.product_name}
                        className="w-16 h-16 rounded mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.product_name}</p>
                        <p>${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="btn btn-sm btn-circle"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="btn btn-sm btn-circle"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-error"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="font-bold">Subtotal: ${totalPrice}</p>
                  <button className="btn btn-primary btn-block mt-2">
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4">Cart is empty</p>
            )}
            <div className="modal-action">
              <button className="btn" onClick={toggleModalCart}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Product */}
      {isProductModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="form-control">
                <label className="label">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Product Description</label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Product Price</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Product Image URL</label>
                <input
                  type="text"
                  value={productImg}
                  onChange={(e) => setProductImg(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={toggleProductModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
