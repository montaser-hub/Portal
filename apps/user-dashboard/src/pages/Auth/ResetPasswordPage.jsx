import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from 'react-hot-toast';
import Text from "../../components/common/Text";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import useValidate from "../../hooks/useValidate";
import Button from "../../components/common/Button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // Validation hook
  const { errors, touched, validateField, handleBlur} = useValidate();

  // Handle password input
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);
    validateField('password', value);

    if (confirmPassword) {
      validateField('confirmPassword', confirmPassword, { password: value });
    }
  };

  // Handle confirm password input
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateField('confirmPassword', value, { password });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validateField('password', password);
    const confirmError = validateField('confirmPassword', confirmPassword, { password });

    if (!passwordError && !confirmError && password && confirmPassword) {
      setIsSubmitting(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Password reset successfully!");
        navigate("/Login", { replace: true });
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error("Failed to reset password. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Page Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="text-white w-14 h-14 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Lock className="h-7 w-7 text-white" />
            </div>
          </div>
          <Text
            as="h1"
            content="Reset Password"
            className="text-2xl font-semibold text-[#0F7B8A] mt-4"
          />
          <Text
            as="p"
            content={`Enter a new password for ${email || "your account"}`}
            className="text-sm text-gray-500 mt-2"
          />
        </div>

        {/* Reset Form Card */}
        <Card className="p-6 shadow-sm border bg-white border-gray-200 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Input */}
            <Input
              label="New Password"
              name="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              className="h-11 placeholder-gray-400"
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              className="h-11 placeholder-gray-400"
            />

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              disabled={
                !password ||
                !confirmPassword ||
                !!errors.password ||
                !!errors.confirmPassword ||
                isSubmitting
              }
              className={`w-full h-11 mt-4 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] transition-colors ${
                !password ||
                !confirmPassword ||
                !!errors.password ||
                !!errors.confirmPassword ||
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>
            <button
              type="submit"
              disabled={
                !password ||
                !confirmPassword ||
                !!errors.password ||
                !!errors.confirmPassword ||
                isSubmitting
              }
              className={`w-full h-11 mt-4 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] transition-colors ${
                !password ||
                !confirmPassword ||
                !!errors.password ||
                !!errors.confirmPassword ||
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>

            {/* Back to Login Link */}
            <div className="text-center text-sm text-gray-500">
              <Link
                to="/Login"
                className="text-[#0F7B8A] hover:text-[#0D6C78] transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
