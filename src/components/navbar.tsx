import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <header className="w-full py-4 px-6 border-b flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        snapBuy
      </Link>

      {/* Main Navigation */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/categories">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Categories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/favorites">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Favorites
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/categories/electronics"
                    className="p-2 hover:bg-slate-100 rounded-md"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/categories/fashion"
                    className="p-2 hover:bg-slate-100 rounded-md"
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/categories/home"
                    className="p-2 hover:bg-slate-100 rounded-md"
                  >
                    Home & Garden
                  </Link>
                  <Link
                    to="/categories/beauty"
                    className="p-2 hover:bg-slate-100 rounded-md"
                  >
                    Beauty & Health
                  </Link>
                </div>
                <Link
                  to="/categories"
                  className="p-2 mt-2 border-t pt-2 text-sm text-blue-600"
                >
                  View all categories
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side navigation */}
      <div className="flex items-center gap-4">
        <Link to="/auth" className="hover:underline">
          Register/Login
        </Link>
        <Link to="/cart" className="flex items-center gap-1 hover:underline">
          <span>Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
