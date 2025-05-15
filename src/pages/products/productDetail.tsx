import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, Check, Lock } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
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

interface Offer {
  id: string;
  user: {
    _id: string;
    username: string;
  };
  amount: number;
  created_at: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR");
};

// Kategori bazlı ürün resimleri için örnek görseller
const getFallbackImage = (categoryID: number) => {
  const fallbackImages = {
    1: "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg", // Elektronik
    2: "https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_1280.jpg", // Spor
    3: "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg", // Ev & Bahçe
    default:
      "https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg", // Varsayılan
  };

  return (
    fallbackImages[categoryID as keyof typeof fallbackImages] ||
    fallbackImages.default
  );
};

const obscureUsername = (username: string) => {
  if (!username || username.length <= 5) return username || "Anonim";
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
  const [imageError, setImageError] = useState(false);

  const isProductRequester = user?._id === product?.UserID;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);

        if (!id) return;

        const response = await productService.getProductById(id);

        if (response.success && response.data) {
          setProduct(response.data);

          // Burada normalde API'den teklifler de gelebilir
          // Eğer API'den gelmiyorsa mock data kullanabilirsiniz
          // Şimdilik boş bir dizi olarak ayarlıyoruz
          setOffers([]);
        } else {
          toast.error("Ürün detayları yüklenirken hata oluştu");
        }
      } catch (error) {
        console.error("Ürün detayları yüklenirken hata oluştu:", error);
        toast.error("Ürün detayları yüklenirken hata oluştu");
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

  // Ürün resmi geçerli bir URL mi kontrol et
  const isValidImageUrl =
    product.Image &&
    (product.Image.startsWith("http://") ||
      product.Image.startsWith("https://") ||
      product.Image.startsWith("/"));

  // Geçerli değilse veya hata olduysa kategori bazlı fallback kullan
  const imageUrl =
    isValidImageUrl && !imageError
      ? product.Image
      : getFallbackImage(product.CategoryID);

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
                {product.Title}
              </h1>
              <div className="text-sm text-center text-gray-500 mt-1 mb-6">
                {product.Username
                  ? `İsteyen: ${product.Username}`
                  : `Ürün ID: ${product.ID}`}
              </div>

              <div className="mb-6 relative">
                <img
                  src={imageUrl}
                  alt={product.Title}
                  className="w-full h-auto object-cover rounded-md"
                  onError={(e) => {
                    setImageError(true);
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = getFallbackImage(product.CategoryID);
                  }}
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                  {product.category?.name || `Kategori ${product.CategoryID}`}
                </div>
                <div className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                  {product.Price.toLocaleString("tr-TR")} ₺
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm text-gray-500 mb-1">Açıklama</h2>
                <p>{product.Description}</p>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-base font-medium mb-4">Ürün Bilgileri</h2>

                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Fiyat</h3>
                    <p className="font-semibold">
                      {product.Price.toLocaleString("tr-TR")} ₺
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">İstenen Adet</h3>
                    <p>{product.Quantity}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Kategori</h3>
                    <p>
                      {product.category?.name ||
                        `Kategori ${product.CategoryID}`}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Ürün ID</h3>
                    <p>{product.ID}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">
                      Oluşturulma Tarihi
                    </h3>
                    <p>{formatDate(product.CreatedAt)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500">Güncelleme Tarihi</h3>
                    <p>{formatDate(product.UpdatedAt)}</p>
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
