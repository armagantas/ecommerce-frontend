import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import Account from "./pages/account/account";
import BeSeller from "./pages/beSeller/beSeller";
import Cart from "./pages/cart/cart";
import Categories from "./pages/categories/categories";
import Favorites from "./pages/favorites/favorites";
import Navbar from "./components/navbar";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { Toaster } from "./components/ui/sonner";
import { FullPageLoading } from "./components/ui/loading";
import Products from "./pages/products/products";
import ProductDetail from "./pages/products/productDetail";
import MyOffers from "./pages/my-offers/my-offers";
import CreateRequestPage from "./pages/create-request";

const AppContent = () => {
  const { isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/be-seller" element={<BeSeller />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/my-offers" element={<MyOffers />} />
          <Route path="/create-request" element={<CreateRequestPage />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" />
      {isLoading && <FullPageLoading />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
