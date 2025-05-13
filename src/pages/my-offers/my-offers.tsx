import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Offer {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  amount: number;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

const MyOffers = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchMyOffers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setOffers([
          {
            id: "101",
            productId: "1",
            productTitle: "iPhone 14 Pro Max",
            productImage:
              "https://images.unsplash.com/photo-1523206489230-c012c64b2b48",
            amount: 5000,
            status: "pending",
            created_at: "2023-05-10 14:23:45",
          },
          {
            id: "102",
            productId: "2",
            productTitle: "MacBook Pro M1",
            productImage:
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            amount: 7500,
            status: "accepted",
            created_at: "2023-05-09 11:13:45",
          },
          {
            id: "103",
            productId: "3",
            productTitle: "Mechanical Keyboard",
            productImage:
              "https://images.unsplash.com/photo-1595225476474-87563907a212",
            amount: 1200,
            status: "rejected",
            created_at: "2023-05-10 09:13:22",
          },
          {
            id: "104",
            productId: "4",
            productTitle: "Ergonomic Office Chair",
            productImage:
              "https://images.unsplash.com/photo-1592078615290-033ee584e267",
            amount: 3500,
            status: "pending",
            created_at: "2023-05-08 17:45:33",
          },
        ]);
      } catch (error) {
        console.error("Teklifler yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOffers();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Beklemede";
      case "accepted":
        return "Kabul Edildi";
      case "rejected":
        return "Reddedildi";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" />
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

      <h1 className="text-2xl font-bold mb-8">Tekliflerim</h1>

      {offers.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Henüz teklif yok</h2>
          <p className="text-muted-foreground mb-6">
            Ürünlere göz atın ve ilk teklifinizi verin
          </p>
          <Button asChild>
            <Link to="/products">Ürünlere Göz At</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="border rounded-md bg-white shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={offer.productImage}
                  alt={offer.productTitle}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      offer.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : offer.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {getStatusText(offer.status)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-center mb-2">
                  {offer.productTitle}
                </h3>
                <div className="text-sm text-center text-gray-500 mt-1 mb-6">
                  Oluşturulma: {offer.created_at}
                </div>

                <div className="bg-gray-50 rounded-md p-4 mb-6">
                  <h2 className="text-base font-medium mb-4">Teklif Detayı</h2>

                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <h3 className="text-sm text-gray-500">Teklif Tutarı</h3>
                      <p className="font-bold">{offer.amount} TL</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-500">Durumu</h3>
                      <p
                        className={
                          offer.status === "pending"
                            ? "text-yellow-600"
                            : offer.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {getStatusText(offer.status)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button asChild variant="outline">
                    <Link to={`/products/${offer.productId}`}>
                      Ürünü Görüntüle
                    </Link>
                  </Button>
                  <Button>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Teklifi Güncelle
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOffers;
