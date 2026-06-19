import { useState } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeFromCart = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <>
      <Navbar cartCount={cart.length} />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-500">
              Cart is Empty 😢
            </h2>

            <p className="text-gray-400 mt-2">
              Add some products to continue shopping
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div>
                      <h2 className="font-bold text-xl">
                        {item.title}
                      </h2>

                      <p className="text-gray-500">
                        {item.category}
                      </p>

                      <p className="text-blue-600 font-bold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(index)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-3xl font-bold">
                Total: ₹{totalPrice}
              </h2>

              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;