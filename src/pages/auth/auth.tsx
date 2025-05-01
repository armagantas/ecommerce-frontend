import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    if (!isLogin) {
      // For registration, navigate to OTP verification
      navigate("/verify-otp");
    } else {
      // For login, navigate to home
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-300 to-gray-800">
      <div className="w-full max-w-md p-8">
        <Card className="w-full backdrop-blur-sm bg-white/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Login" : "Register"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        type="text"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        type="text"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>
                    <Input
                      id="city"
                      placeholder="New York"
                      type="text"
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="county" className="text-sm font-medium">
                        County
                      </label>
                      <Input
                        id="county"
                        placeholder="Manhattan"
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="district" className="text-sm font-medium">
                        District
                      </label>
                      <Input
                        id="district"
                        placeholder="Midtown"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <Input
                      id="address"
                      placeholder="123 Main St, Apt 4B"
                      type="text"
                      autoComplete="street-address"
                      required
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                />
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
            {isLogin && (
              <Link
                to="/auth/forgot-password"
                className="text-sm text-center text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
