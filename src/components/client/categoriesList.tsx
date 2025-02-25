import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../../config/axios';
import IProduct, { ICategory } from '../../interface/product';

const CategoryPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("products");
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map((p: IProduct) => p.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category") || "All";
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-2xl text-lime-800 font-semibold mb-6 bg-[#B5DCB0] h-30 pt-9 pl-48 text-left">Category</h2>
      <section className="py-6">
        <div className="container mx-auto px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-60 h-40 object-cover rounded-t mb-4"
                />
              </Link>
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </Link>
              <p className="text-gray-500">{product.price}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage