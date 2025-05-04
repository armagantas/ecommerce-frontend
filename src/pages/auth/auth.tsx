import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { RegisterRequest, LoginRequest } from "@/types/user";
import { authApi } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { ApiError } from "@/types/user";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    cityName: "",
    countyName: "",
    districtName: "",
    addressText: "",
  });
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const loginData: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };

        const response = await authApi.login(loginData);

        if (response.success) {
          // User is logged in
          if (response.data?.token) {
            setUser(response.data);
            toast.success("Login successful!");
            navigate("/");
          }
        }
      } else {
        // Handle registration
        // Validate password matching
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }

        const registerData: RegisterRequest = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            cityName: formData.cityName,
            countyName: formData.countyName,
            districtName: formData.districtName,
            addressText: formData.addressText,
          },
        };

        const response = await authApi.register(registerData);

        if (response.success) {
          // Registration is successful and user is auto-logged in
          setUser(response.data);
          toast.success("Registration successful!");
          navigate("/");
        }
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "An error occurred");
    } finally {
      setIsLoading(false);
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
                        value={formData.firstName}
                        onChange={handleChange}
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
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cityName" className="text-sm font-medium">
                      City
                    </label>
                    <Input
                      id="cityName"
                      placeholder="New York"
                      type="text"
                      autoComplete="address-level2"
                      required
                      value={formData.cityName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="countyName"
                        className="text-sm font-medium"
                      >
                        County
                      </label>
                      <Input
                        id="countyName"
                        placeholder="Manhattan"
                        type="text"
                        required
                        value={formData.countyName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="districtName"
                        className="text-sm font-medium"
                      >
                        District
                      </label>
                      <Input
                        id="districtName"
                        placeholder="Midtown"
                        type="text"
                        required
                        value={formData.districtName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="addressText"
                      className="text-sm font-medium"
                    >
                      Address
                    </label>
                    <Input
                      id="addressText"
                      placeholder="123 Main St, Apt 4B"
                      type="text"
                      autoComplete="street-address"
                      required
                      value={formData.addressText}
                      onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                type="button"
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
