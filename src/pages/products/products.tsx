import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product-card";
import { Loading } from "@/components/ui/loading";

interface Product {
  id: string;
  title: string;
  description: string;
  count: number;
  image: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  user: {
    _id: string;
    username: string;
  };
}

export const mockProducts = [
  {
    id: "1",
    title: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    count: 1,
    price: 1500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: {
      id: 1,
      name: "Elektronik",
      slug: "electronics",
    },
    user: {
      _id: "1",
      username: "johndoe",
    },
  },
  {
    id: "2",
    title: "Smartwatch",
    description:
      "Modern smartwatch with health tracking, notifications and various apps.",
    count: 1,
    price: 2500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: {
      id: 1,
      name: "Elektronik",
      slug: "electronics",
    },
    user: {
      _id: "1",
      username: "johndoe",
    },
  },
  {
    id: "3",
    title: "Running Shoes",
    description:
      "Comfortable running shoes with cushioned sole and breathable material.",
    count: 1,
    price: 850,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: {
      id: 2,
      name: "Spor & Outdoor",
      slug: "sports-outdoor",
    },
    user: {
      _id: "2",
      username: "alicesmith",
    },
  },
  {
    id: "4",
    title: "Modern Sofa",
    description: "Elegant and comfortable sofa for your living room.",
    count: 1,
    price: 5000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: {
      id: 3,
      name: "Ev & Bahçe",
      slug: "home-garden",
    },
    user: {
      _id: "3",
      username: "bobwilson",
    },
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (selectedCategory) {
          const filtered = mockProducts.filter(
            (product) => product.category.slug === selectedCategory
          );
          setProducts(filtered);
        } else {
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tüm Ürünler</h1>
        <div className="space-x-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-md ${
              selectedCategory === null ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedCategory("electronics")}
            className={`px-3 py-1 rounded-md ${
              selectedCategory === "electronics"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Elektronik
          </button>
          <button
            onClick={() => setSelectedCategory("sports-outdoor")}
            className={`px-3 py-1 rounded-md ${
              selectedCategory === "sports-outdoor"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Spor
          </button>
          <button
            onClick={() => setSelectedCategory("home-garden")}
            className={`px-3 py-1 rounded-md ${
              selectedCategory === "home-garden"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Ev & Bahçe
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">Ürün bulunamadı</h2>
          <p className="text-gray-500">
            Seçili kategoride henüz ürün bulunmamaktadır.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
