import { useState } from "react";
import { Calendar, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Text from "../components/common/Text";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { COLORS } from "../components/common/colors";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div
              className="text-white w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-md"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Calendar className="h-10 w-10 text-primary-foreground" />
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
        <Card className="p-8 shadow-sm border bg-white border-gray-200
 space-y-6">
          <div className="space-y-2 text-center">
            <Text as="h2" content="Sign In" MyClass="text-xl font-normal text-gray-500" />
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
              type="email"
              placeholder="your.email@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              myClass="h-11"
            />

            {/* Password Input */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showToggle={true}
              myClass="h-11"
            />

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#0F7B8A] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Link */}
            <Link
              to="/Dashboard" // الرابط الذي تريد الانتقال إليه بعد تسجيل الدخول
              className="w-full h-11 mt-6 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78]"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </form>
        </Card>

        {/* Help Text */}
        <div className="text-center">
          <Text
            as="p"
            content="Need help accessing your account? "
            MyClass="text-sm text-gray-500 inline"
          />
          <Text
            as="span"
            content="Contact IT Support"
            MyClass=" text-[#0F7B8A] hover:underline cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
