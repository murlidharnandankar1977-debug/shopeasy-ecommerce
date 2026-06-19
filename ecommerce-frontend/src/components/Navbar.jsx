import { Link } from "react-router-dom";

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  darkMode = false,
  setDarkMode = () => {},
}) {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">
        ShopEasy
      </h1>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="hover:text-yellow-300"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="hover:text-yellow-300"
        >
          Cart ({cartCount})
        </Link>

        <Link
          to="/wishlist"
          className="hover:text-yellow-300"
        >
          Wishlist ({wishlistCount})
        </Link>

        <Link
          to="/admin"
          className="hover:text-yellow-300"
        >
          Admin
        </Link>

        <Link
          to="/login"
          className="hover:text-yellow-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-yellow-300"
        >
          Register
        </Link>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-black px-4 py-2 rounded hover:bg-gray-800"
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;