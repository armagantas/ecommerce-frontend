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
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex flex-col">
          <div className="space-y-1.5 flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                İsteyen: {product.user.username}
              </div>
              <div className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                {product.category.name}
              </div>
            </div>
            <h3 className="font-semibold leading-none tracking-tight text-sm">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
              {product.description}
            </p>
            <div className="text-xs font-medium">
              İstenen Adet: {product.count}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0 mt-auto">
        <div className="flex w-full gap-2">
          <Button asChild className="flex-1 h-8 text-sm">
            <Link to={`/products/${product.id}`}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Teklifleri Gör
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
