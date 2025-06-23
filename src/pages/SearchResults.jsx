import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Chicken Biryani", price: "₹250", image: "/Categories/Biryani.png" },
  { id: 2, name: "Veg Burger", price: "₹150", image: "/Categories/Burger.png" },
  { id: 3, name: "Paneer Tikka", price: "₹200", image: "/Categories/Paneer.png" },
  { id: 4, name: "Tandoori Chicken", price: "₹300", image: "/Categories/Tandoori.png" },
  { id: 5, name: "Eggs", price: "₹120", image: "/Categories/Eggs.png" }, // ✅ updated
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="mt-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "<span className="text-red-600">{query}</span>"
      </h2>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(product => (
            <div key={product.id} className="border rounded-lg shadow-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No matching products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
