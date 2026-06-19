import { useState } from "react";
import Navbar from "../components/Navbar";

function Wishlist() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const moveToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...cart, product];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    removeFromWishlist(product._id);

    alert(`${product.title} moved to cart 🛒`);
  };

  return (
    <>
      <Navbar
        wishlistCount={wishlist.length}
      />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-500">
              Wishlist is Empty 😢
            </h2>

            <p className="text-gray-400 mt-2">
              Add products to your wishlist
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      moveToCart(item)
                    }
                    className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
                  >
                    🛒 Move to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeFromWishlist(
                        item._id
                      )
                    }
                    className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;