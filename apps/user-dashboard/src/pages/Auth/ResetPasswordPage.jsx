import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import Text from "../../components/common/Text";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({ password: "", confirm: "" });
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setTouched((p) => ({ ...p, password: true }));
    setErrors((p) => ({
      ...p,
      password:
        value.length === 0
          ? "Password is required"
          : !passwordRegex.test(value)
          ? "Must include uppercase, lowercase, number, special char, and 8+ chars"
          : "",
    }));
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirm(value);
    setTouched((p) => ({ ...p, confirm: true }));
    setErrors((p) => ({
      ...p,
      confirm:
        value.length === 0
          ? "Confirm your password"
          : value !== password
          ? "Passwords do not match"
          : "",
    }));
  };

  const getBorderColor = (field) => {
    const error = errors[field];
    const isTouched = touched[field];
    const value = field === "password" ? password : confirm;
    if (!isTouched) return "border-gray-300";
    if (error) return "border-red-500";
    if (value && !error) return "border-green-500";
    return "border-gray-300";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.password && !errors.confirm && password && confirm) {
      navigate("/Login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="text-white w-14 h-14 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Lock className="h-7 w-7 text-white" />
            </div>
          </div>
          <Text
            as="h1"
            content="Reset Password"
            MyClass="text-2xl font-semibold text-[#0F7B8A] mt-4"
          />
          <Text
            as="p"
            content={`Enter a new password for ${email || "your account"}`}
            MyClass="text-sm text-gray-500 mt-2"
          />
        </div>

        <Card className="p-6 shadow-sm border bg-white border-gray-200 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <Input
                label="New Password"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                myClass={`h-11 border-2 placeholder-gray-400 focus:outline-none focus:ring-0 ${getBorderColor(
                  "password"
                )}`}
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute  right-2 top-12 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#0F7B8A]" />
                  )}
                </button>
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Confirm Password"
                placeholder="Re-enter password"
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={handleConfirmChange}
                myClass={`h-11 border-2 placeholder-gray-400 focus:outline-none focus:ring-0 ${getBorderColor(
                  "confirm"
                )}`}
              />
              {confirm && (
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute  right-2 top-12 transform -translate-y-1/2"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#0F7B8A]" />
                  )}
                </button>
              )}
            </div>
            {errors.confirm && (
              <p className="text-sm text-red-500">{errors.confirm}</p>
            )}

            <button
              type="submit"
              disabled={
                !password || !confirm || !!errors.password || !!errors.confirm
              }
              className={`w-full h-11 mt-4 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] ${
                !password || !confirm || !!errors.password || !!errors.confirm
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              Reset Password
            </button>

            <div className="text-center text-sm text-gray-500">
              <Link
                to="/Login"
                className="text-[#0F7B8A] hover:text-[#0D6C78]"
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
