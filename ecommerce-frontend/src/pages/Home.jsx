import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    toast.success(
      `${product.title} added to cart 🛒`
    );
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      toast.error("Already in Wishlist ❤️");
      return;
    }

    const updatedWishlist = [
      ...wishlist,
      product,
    ];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    toast.success(
      `${product.title} added to Wishlist ❤️`
    );
  };

  if (loading) {
    return (
      <>
        <Navbar
          cartCount={cart.length}
          wishlistCount={wishlist.length}
        />

        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
  cartCount={cart.length}
  wishlistCount={wishlist.length}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

      <div
        className={`min-h-screen p-8 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
               {/* Hero Section */}
        <div className="bg-blue-600 text-white p-12 rounded-xl text-center mb-10">
          <h1 className="text-5xl font-bold">
            Welcome to ShopEasy
          </h1>

          <p className="mt-4 text-xl">
            Best Deals on Mobiles, Laptops & Electronics
          </p>

          <button
            onClick={() => {
              document
                .getElementById("products")
                .scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded mt-6 font-semibold"
          >
            Shop Now
          </button>
        </div>

        {/* Products Title */}
        <div id="products">
          <h1 className="text-4xl font-bold text-center mb-8">
            Featured Products
          </h1>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-3 border rounded-lg shadow-md text-black"
          />
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg shadow text-black"
          >
            <option value="All">All</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
            ))
          ) : (
            <p className="text-center text-red-500 col-span-3 text-xl">
              No Product Found
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-6 mt-10 rounded-lg">
          <h2 className="text-2xl font-bold">
            ShopEasy
          </h2>

          <p className="mt-2">
            © 2026 All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
}

export default Home;