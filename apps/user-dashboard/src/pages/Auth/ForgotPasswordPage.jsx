import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Text from "../../components/common/Text";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import { forgotPassword } from "../../services/API-Services/AuthService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/[ء-ي]/.test(value)) return;
    setEmail(value);
    setTouched(true);
    setErrors(
      value.length === 0
        ? ""
        : !emailRegex.test(value)
        ? "Email is not valid"
        : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || errors) return;

    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data?.message || "Something went wrong!");
    }
  };

  const getBorderColor = () => {
    if (!touched) return "border-gray-300";
    if (errors) return "border-red-500";
    if (email.length > 0 && !errors) return "border-green-500";
    return "border-gray-300";
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

        <Card className="p-6 shadow-sm border bg-white border-gray-200 space-y-4">
          {sent ? (
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
                <button
                  onClick={() => navigate("/Login")}
                  className="px-4 py-2 bg-[#0F7B8A] text-white rounded-md shadow-sm"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmailChange}
                myClass={`h-11 border-2 placeholder-gray-400 focus:outline-none focus:ring-0 ${getBorderColor()}`}
              />

              {errors && (
                <p className="text-sm text-red-500 mt-2">{errors}</p>
              )}

              <button
                type="submit"
                disabled={!email || !!errors}
                className={`w-full h-11 mt-2 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] ${
                  !email || !!errors ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Send Reset Link
              </button>

              <div className="text-center text-sm text-gray-500">
                <span>Remember your password? </span>
                <Link
                  to="/Login"
                  className="text-[#0F7B8A] hover:text-[#0D6C78]"
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
