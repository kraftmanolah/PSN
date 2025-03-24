// app/search/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Product } from "@/types/product"; // Import Product type

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // const response = await axios.get(`http://localhost:8000/api/search/?q=${encodeURIComponent(query)}`);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search/?q=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="p-4">
          <Breadcrumbs />
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {loading ? (
              <div className="p-4">Loading...</div>
            ) : error ? (
              <div className="p-4 text-red-500">{error}</div>
            ) : results.length === 0 ? (
              <p>No results found for "{query}".</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {product.main_image ? (
                      <img
                        src={product.main_image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600">
                      {product.currency}
                      {parseFloat(product.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;