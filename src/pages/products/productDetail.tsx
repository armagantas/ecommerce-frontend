import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, Check, Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

import { mockProducts } from "./products";

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
  created_at: string;
  updated_at: string;
}

interface Offer {
  id: string;
  user: {
    _id: string;
    username: string;
  };
  amount: number;
  created_at: string;
}

const obscureUsername = (username: string) => {
  if (username.length <= 5) return username;
  return `${username.substring(0, 3)}...${username.substring(
    username.length - 2
  )}`;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const { user } = useAuth();

  const isProductRequester = user?._id === product?.user._id;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundProduct = mockProducts.find((p: any) => p.id === id);

        if (foundProduct) {
          setProduct({
            ...foundProduct,
            created_at: "2023-05-09 01:39:14",
            updated_at: "2023-05-09 01:39:14",
          });

          const mockOffersByProduct: Record<string, Offer[]> = {
            "1": [
              {
                id: "101",
                user: { _id: "2", username: "armagantas" },
                amount: 5000,
                created_at: "2023-05-10 14:23:45",
              },
              {
                id: "102",
                user: { _id: "3", username: "mehmetcan" },
                amount: 4800,
                created_at: "2023-05-10 15:45:12",
              },
              {
                id: "103",
                user: { _id: "4", username: "ayşeyilmaz" },
                amount: 5200,
                created_at: "2023-05-11 09:18:32",
              },
            ],
            "2": [
              {
                id: "201",
                user: { _id: "5", username: "canerbey" },
                amount: 7500,
                created_at: "2023-05-09 11:13:45",
              },
              {
                id: "202",
                user: { _id: "6", username: "denizalp" },
                amount: 7200,
                created_at: "2023-05-09 13:25:19",
              },
            ],
            "3": [
              {
                id: "301",
                user: { _id: "7", username: "serhatgunes" },
                amount: 1200,
                created_at: "2023-05-10 09:13:22",
              },
            ],
            "4": [
              {
                id: "401",
                user: { _id: "2", username: "armagantas" },
                amount: 3500,
                created_at: "2023-05-08 17:45:33",
              },
              {
                id: "402",
                user: { _id: "8", username: "cemileaydin" },
                amount: 3800,
                created_at: "2023-05-08 18:12:55",
              },
              {
                id: "403",
                user: { _id: "3", username: "mehmetcan" },
                amount: 3600,
                created_at: "2023-05-08 20:05:11",
              },
              {
                id: "404",
                user: { _id: "9", username: "elifkaya" },
                amount: 4000,
                created_at: "2023-05-09 08:33:21",
              },
            ],
          };

          setOffers(mockOffersByProduct[foundProduct.id] || []);
        } else {
          console.error(`Ürün ID'si ${id} ile bulunamadı`);
          setProduct(null);
        }
      } catch (error) {
        console.error("Ürün detayları yüklenirken hata oluştu:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p>İstediğiniz ürün detayları bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Ürünlere Dön</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border rounded-md bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center">
                {product.title}
              </h1>
              <div className="text-sm text-center text-gray-500 mt-1 mb-6">
                İsteyen: {product.user.username}
              </div>

              <div className="mb-6 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto object-cover rounded-md"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                  {product.category.name}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm text-gray-500 mb-1">Açıklama</h2>
                <p>{product.description}</p>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-base font-medium mb-4">Ürün Bilgileri</h2>

                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">İstenen Adet</h3>
                    <p>{product.count}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Kategori</h3>
                    <p>{product.category.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Ürün ID</h3>
                    <p>{product.id}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">
                      Oluşturulma Tarihi
                    </h3>
                    <p>{product.created_at}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Güncelleme Tarihi</h3>
                    <p>{product.updated_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-md bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Teklifler</h2>

              {offers.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  Henüz teklif bulunmamaktadır.
                </p>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {obscureUsername(offer.user.username)}
                        </span>
                        {isProductRequester ? (
                          <span className="font-bold text-lg">
                            {offer.amount} TL
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Fiyat gizli
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {offer.created_at}
                        </span>
                        {isProductRequester && (
                          <Button size="sm" variant="outline" className="h-7">
                            <Check className="h-3 w-3 mr-1" />
                            Kabul Et
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Teklif Ver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
