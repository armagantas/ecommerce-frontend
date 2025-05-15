import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: {
    ID: number;
    Title: string;
    Description: string;
    CategoryID: number;
    category?: {
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
  };
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

const ProductCard = ({ product }: ProductCardProps) => {
  // Ürün resmi geçerli bir URL mi kontrol et
  const isValidImageUrl =
    product.Image &&
    (product.Image.startsWith("http://") ||
      product.Image.startsWith("https://") ||
      product.Image.startsWith("/"));

  // Geçerli değilse kategori bazlı fallback kullan
  const imageUrl = isValidImageUrl
    ? product.Image
    : getFallbackImage(product.CategoryID);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] h-full flex flex-col border-2">
      <Link to={`/products/${product.ID}`} className="flex-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={product.Title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = getFallbackImage(product.CategoryID);
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm px-2 py-1 bg-slate-100 rounded-full">
                {product.category?.name || `Kategori ${product.CategoryID}`}
              </div>
              <div className="text-sm text-gray-400">ID: {product.ID}</div>
            </div>
            <h3 className="font-semibold text-base leading-tight tracking-tight line-clamp-2">
              {product.Title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mt-1">
              {product.Description}
            </p>
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm font-medium">{product.Quantity} Adet</div>
              <div className="text-lg font-bold text-green-700">
                {product.Price.toLocaleString("tr-TR")} ₺
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          asChild
          className="w-full h-10 text-base bg-black hover:bg-gray-800"
        >
          <Link to={`/products/${product.ID}`}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Detayları Gör
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
