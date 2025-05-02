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
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();

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
        {user ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {user.firstName} {user.lastName}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[200px] p-4">
                    <Link
                      to="/account"
                      className="p-2 hover:bg-slate-100 rounded-md"
                    >
                      My Account
                    </Link>
                    {user.isSeller ? (
                      <Link
                        to="/seller/dashboard"
                        className="p-2 hover:bg-slate-100 rounded-md"
                      >
                        Seller Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/be-seller"
                        className="p-2 hover:bg-slate-100 rounded-md"
                      >
                        Become a Seller
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="justify-start p-2 h-auto font-normal hover:bg-slate-100 hover:text-inherit rounded-md"
                      onClick={logout}
                    >
                      Sign Out
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link to="/auth" className="hover:underline">
            Register/Login
          </Link>
        )}
        <Link to="/cart" className="flex items-center gap-1 hover:underline">
          <span>Cart</span>
          <span>🛒</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
