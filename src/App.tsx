import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import Account from "./pages/account/account";
import BeSeller from "./pages/beSeller/beSeller";
import Cart from "./pages/cart/cart";
import Categories from "./pages/categories/categories";
import Favorites from "./pages/favorites/favorites";
import Navbar from "./components/navbar";
import VerifyOTP from "./pages/auth/verify-otp";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/account" element={<Account />} />
            <Route path="/be-seller" element={<BeSeller />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
