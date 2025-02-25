import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/axios";
import IProduct from "../../interface/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-50 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow"
            />
            <div className="flex space-x-4 mt-4">
              <img
                key={product.id}
                src={product.image}
                alt=''
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">{product.category}</h3>
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.shortDesc}</p>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">${product.price*0.5} </h2><span className="font-bold ml-2 p-1 rounded bg-[#FFEDE0] text-gray-500">50%</span>
            </div>
            <div>
            <h3 className="font-bold mb-6 line-through">${product.price}</h3>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 border border-gray-300 rounded px-2 py-1"
              />
              <button className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Discription</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;