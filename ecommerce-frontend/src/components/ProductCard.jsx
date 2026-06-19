import { Link } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  addToWishlist,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {product.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <h3 className="text-blue-600 font-bold text-lg mt-3">
          ₹{product.price}
        </h3>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={() => addToWishlist(product)}
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600"
        >
          ❤️ Add to Wishlist
        </button>

        <Link to={`/product/${product._id}`}>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 hover:bg-green-600">
            👀 View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;