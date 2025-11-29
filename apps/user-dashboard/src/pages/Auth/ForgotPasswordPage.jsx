import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Text from "../../components/common/Text";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import { forgotPassword } from "../../services/API-Services/AuthService";
import useValidate from "../../hooks/useValidate";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const { errors, touched, validateField, handleBlur, resetValidation } = useValidate();

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if email is valid
    const emailError = validateField('email', email);

    if (!emailError && email) {
      try {
        await forgotPassword(email);
        setSent(true);
        resetValidation();
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Something went wrong!";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <div className="text-white w-14 h-14 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Mail className="h-7 w-7 text-white" />
            </div>
          </div>

          <Text
            as="h1"
            content="Forgot Password"
            MyClass="text-2xl font-semibold text-[#0F7B8A] mt-4"
          />

          <Text
            as="p"
            content="Enter your email and we'll send you a link to reset your password."
            MyClass="text-sm text-gray-500 mt-2"
          />
        </div>
        {/* Main Card */}
        <Card className="p-6 shadow-sm border bg-white border-gray-200 space-y-4">
          {sent ? (
            // Success State
            <div className="text-center space-y-3">
              <Text
                as="h2"
                content="Check your email"
                MyClass="text-lg font-medium text-gray-700"
              />
              <Text
                as="p"
                content={`A password reset link has been sent to ${email}.`}
                MyClass="text-sm text-gray-500"
              />

              <div className="mt-4">
                <Button
                  onClick={() => navigate("/Login")}
                  variant="primary"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : (
            // Email Form
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                myClass="h-11 placeholder-gray-400"
              />
              <Button
                type="submit"
                disabled={!email || !!errors.email}
                variant="primary"
                className={`w-full h-11 mt-2 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] transition-colors ${
                  !email || !!errors.email ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Send Reset Link
              </Button>
              <div className="text-center text-sm text-gray-500">
                <Text as="span" content="Remember your password? " />
                <Link
                  to="/Login"
                  className="text-[#0F7B8A] hover:text-[#0D6C78] transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
