import { useCart } from "@/app/utils/cart.context";
import { IProduct } from "@/interfaces/product.interface";

export default function CardComponent({ product }: { product: IProduct }) {
  const { addToCart } = useCart();

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
    <div className="card bg-base-100 w-full shadow-xl">
      <figure>
        <img src={product.img} alt={product.product_name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.product_name}</h2>
        <p>{product.description}</p>
        <b>$ {product.price}</b>
        <div className="card-actions flex items-center justify-between">
          <a
            href={"/detail-product/" + product.id}
            className="text-center text-blue-500"
          >
            Detail
          </a>
          <button
            className="btn btn-primary text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
