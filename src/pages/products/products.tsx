import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product-card";
import { Loading } from "@/components/ui/loading";
import { productService } from "@/services/api";
import { toast } from "sonner";

interface Product {
  ID: number;
  Title: string;
  Description: string;
  CategoryID: number;
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  UserID: string;
  Username: string;
  Quantity: number;
  Price: number;
  Image: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getAllProducts(
          selectedCategory || undefined
        );

        if (response.success) {
          setProducts(response.data || []);
        } else {
          toast.error("Ürünler yüklenirken hata oluştu");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Ürünler yüklenirken hata oluştu");
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tüm Ürünler</h1>
        <div className="space-x-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-md text-base ${
              selectedCategory === null ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedCategory("electronics")}
            className={`px-4 py-2 rounded-md text-base ${
              selectedCategory === "electronics"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Elektronik
          </button>
          <button
            onClick={() => setSelectedCategory("sports-outdoor")}
            className={`px-4 py-2 rounded-md text-base ${
              selectedCategory === "sports-outdoor"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Spor
          </button>
          <button
            onClick={() => setSelectedCategory("home-garden")}
            className={`px-4 py-2 rounded-md text-base ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <ProductCard key={product.ID} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
