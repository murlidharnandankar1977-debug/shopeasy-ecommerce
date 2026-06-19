import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Admin() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [products, setProducts] = useState([]);

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
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        product
      );

      alert("Product Added Successfully ✅");

      setProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Product ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted Successfully 🗑️");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>

        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Product List
          </h2>

          {products.length === 0 ? (
            <p>No Products Found</p>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 mb-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p>{item.description}</p>

                  <p className="text-blue-600 font-semibold">
                    ₹{item.price}
                  </p>

                  <p>{item.category}</p>
                </div>

                <button
                  onClick={() =>
                    deleteProduct(item._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;