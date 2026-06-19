import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log("Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-red-500">
            Product Not Found
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">

          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 text-lg mb-4">
              {product.description}
            </p>

            <p className="text-lg mb-2">
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              ₹{product.price}
            </h2>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              🛒 Add To Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;