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
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authApi } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { ApiError } from "@/types/user";

const VerifyOTP = () => {
  const [value, setValue] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { pendingUserId, setUser, setPendingUserId, setIsLoading } = useAuth();

  // If no pendingUserId, redirect to auth
  if (!pendingUserId) {
    navigate("/auth");
    return null;
  }

  const handleResend = async () => {
    if (!pendingUserId) return;

    setIsResending(true);
    try {
      const response = await authApi.resendVerification({
        userId: pendingUserId,
      });
      if (response.success) {
        toast.success(response.message || "Verification code resent");
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6 || !pendingUserId) return;

    setIsLoading(true);
    try {
      const response = await authApi.verifyEmail({
        userId: pendingUserId,
        verificationCode: value,
      });

      if (response.success) {
        toast.success("Email verified successfully!");
        // Store user data and token
        setUser(response.data);
        // Clear pending user id
        setPendingUserId(null);
        // Navigate to home
        navigate("/");
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Failed to verify email");
      setValue("");
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
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(val) => setValue(val)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto"
                    onClick={handleResend}
                    disabled={isResending}
                  >
                    {isResending ? "Sending..." : "Resend"}
                  </Button>
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={value.length !== 6}
              >
                Verify Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center text-muted-foreground">
              By verifying your account, you agree to our{" "}
              <Button type="button" variant="link" className="p-0 h-auto">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button type="button" variant="link" className="p-0 h-auto">
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;
