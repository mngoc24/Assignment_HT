import React, { useEffect, useState } from 'react';
import IProduct, { ICategory } from '../../interface/product';
import { api } from '../../config/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const gardeningTools = [
    { id: 1, name: 'Garten Spaten', image: 'https://picsum.photos/200/300?random=5' },
    { id: 2, name: 'Sand', image: 'https://picsum.photos/200/300?random=6' },
    { id: 3, name: 'Pflanzer', image: 'https://picsum.photos/200/300?random=7' },
    { id: 4, name: 'Schlammkuchen', image: 'https://picsum.photos/200/300?random=8' },
    { id: 5, name: 'Klemmen', image: 'https://picsum.photos/200/300?random=9' },
  ];

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await api.get('products');
        setBestSellers(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await api.get('categories');
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestSellers();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="relative w-full h-[400px] bg-gradient-to-r from-green-200 to-green-100 flex items-center px-12">
        <div className="w-1/2 pl-20 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Wir kümmern uns um Ihre <br /> schöner Garten und Haus
          </h1>
          <p className="text-gray-600 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s.
          </p>
          <button className="border border-gray-800 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white transition">
            See more
          </button>
        </div>
        <div className="w-1/2 flex justify-center relative">
          <div className="w-[400px] h-[350px] bg-white rounded-full overflow-hidden flex items-center justify-center">
            <img src="https://storage-vnportal.vnpt.vn/btn-ubnd/sitefolders/root/6451/thang8/h4.png" alt="Plant" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <section className="py-8">
          <div className="container mx-auto px-20">
            <h2 className="text-2xl font-semibold mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map((item) => (
                <div key={item.id} className="text-center">
                  <Link to={`/products/${item.id}`}><img src={item.image} alt={item.name} className="mx-auto mb-4 rounded" /></Link>
                  <Link to={`/products/${item.id}`}><h3 className="text-lg font-semibold">{item.name}</h3></Link>
                  <p className="text-red-500 font-semibold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="container justify-between mx-auto px-50">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {gardeningTools.map((tool) => (
                <div key={tool.id} className="relative">
                  <img src={tool.image} alt={tool.name} className="rounded-lg" />
                  <p className="absolute bottom-2 left-2 text-white font-semibold bg-green-600 px-2 py-1 rounded">
                    {tool.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-20">
            <h2 className="text-2xl font-semibold mb-6">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category.catId} className="relative">
                  <Link to={`/products?category=${category.name}`}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </Link>
                  <p className="absolute top-2 right-2 text-white font-semibold px-3 py-1 rounded">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
