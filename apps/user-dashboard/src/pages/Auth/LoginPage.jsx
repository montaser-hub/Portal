import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Eye, EyeOff, Calendar } from "lucide-react";
import { login } from "../../services/API-Services/AuthService";
import { showLoader, hideLoader } from "../../app/Redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Text from "../../components/common/Text";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmailChange = (e) => {
  const value = e.target.value;
  if (/[ء-ي]/.test(value)) return;
  setEmail(value);
  setTouched((prev) => ({ ...prev, email: true }));
  setErrors((prev) => ({
    ...prev,
    email:
      value.length === 0
        ? "Email is required"
        : !emailRegex.test(value)
        ? "Email is not valid"
        : "",
  }));
};

const handlePasswordChange = (e) => {
  const value = e.target.value;
  if (/[ء-ي]/.test(value)) return;
  setPassword(value);
  setTouched((prev) => ({ ...prev, password: true }));
  setErrors((prev) => ({
    ...prev,
    password:
      value.length === 0
        ? "Password is required"
        : !passwordRegex.test(value)
        ? "Password must be at least 8 chars, include uppercase, lowercase, number, special char"
        : "",
  }));
};

const togglePasswordVisibility = () => setShowPassword(!showPassword);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!errors.email && !errors.password && email && password) {
    dispatch(showLoader());
    login({ email, password })
      .then(() => {
        // sessionStorage.setItem("isLoggedIn", "true");
        // toast.success("Welcome! To dashboard", {
        //   duration: 3000,
        //   position: "top-right",
        // });
        navigate("/Dashboard");
      })
      .catch((err) => {
        let msg = "Login failed. Please try again.";
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 400) {
            msg = "Incorrect email or password.";
          } else if (err.response.data?.message) {
            msg = err.response.data.message;
          }
        }
        toast.error(msg, {
          duration: 3000,
          position: "top-right",
        });
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }
};



  const getBorderColor = (field) => {
    if (errors[field]) return "border-red-500";
    if (touched[field]) return "border-green-500";
    return "border-gray-300";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-white w-16 h-16 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
              <Calendar className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Text
              as="h1"
              content="SmartShift"
              MyClass="text-2xl font-semibold text-[#0F7B8A] text-center"
            />
            <Text
              as="p"
              content="Healthcare Scheduling"
              MyClass="text-gray-500 text-center"
            />
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-sm border bg-white border-gray-200 space-y-6">
          <div className="space-y-2 text-center">
            <Text
              as="h2"
              content="Sign In"
              MyClass="text-xl font-normal text-gray-500"
            />
            <Text
              as="p"
              content="Access your SmartShift account"
              MyClass="text-sm text-gray-500"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
              myClass={`h-11 border-2 placeholder-gray-400 focus:outline-none focus:ring-0 ${getBorderColor(
                "email"
              )}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            {/* Password Input */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                placeholder="Enter your password"
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
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-9 focus:outline-none" // ✅ أزلنا فوكَس الإطار
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-[#0F7B8A]" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                  )}
                </button>
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgotPassword"
                className="text-sm text-[#0F7B8A] hover:text-[#0D6C78] cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!email || !password || !!errors.email || !!errors.password}
              className={`w-full h-11 mt-6 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] ${
                !email || !password || !!errors.email || !!errors.password ? "opacity-60 cursor-not-allowed" : ""}`} >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </button>
          </form>
        </Card>

        {/* Help Text */}
        <div className="text-center">
          <Text
            as="p"
            content="Need help accessing your account? "
            MyClass="text-sm text-gray-500 inline"
          />
          <Link
            to="/"
            className="text-[#0F7B8A] hover:text-[#0D6C78] cursor-pointer"
          >
            Contact IT Support
          </Link>
        </div>
      </div>
    </div>
  );
}
