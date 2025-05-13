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
                Ana Sayfa
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/my-offers">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tekliflerim
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/products">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Ürünler
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/create-request">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Talep Oluştur
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/favorites">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Favoriler
              </NavigationMenuLink>
            </Link>
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
                      Hesabım
                    </Link>
                    {user.isSeller ? (
                      <Link
                        to="/seller/dashboard"
                        className="p-2 hover:bg-slate-100 rounded-md"
                      >
                        Satıcı Paneli
                      </Link>
                    ) : (
                      <Link
                        to="/be-seller"
                        className="p-2 hover:bg-slate-100 rounded-md"
                      >
                        Satıcı Ol
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="justify-start p-2 h-auto font-normal hover:bg-slate-100 hover:text-inherit rounded-md"
                      onClick={logout}
                    >
                      Çıkış Yap
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link to="/auth" className="hover:underline">
            Kayıt/Giriş
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
