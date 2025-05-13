import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SubNavbarProps {
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  selectedCategory?: string;
}

const SubNavbar = ({ categories, selectedCategory }: SubNavbarProps) => {
  return (
    <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex justify-center">
        <div className="px-4 overflow-x-auto py-3 flex justify-center">
          <div className="flex gap-2 no-scrollbar">
            <Button
              variant={!selectedCategory ? "default" : "ghost"}
              asChild
              className="h-8"
            >
              <Link to="/products">All Products</Link>
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.slug ? "default" : "ghost"
                }
                asChild
                className="h-8"
              >
                <Link to={`/products?category=${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
