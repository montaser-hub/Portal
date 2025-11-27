// LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, LogIn } from 'lucide-react';
import { login } from '../../services/API-Services/AuthService';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Text from '../../components/common/Text';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { setUser } from '../../features/user/userSlice';
import useValidate from '../../hooks/useValidate';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation hook
  const { errors, touched, validateField, handleBlur } = useValidate();

  // Handle email input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  // Handle password input
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validateField('password', value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (!emailError && !passwordError && email && password) {
      setIsSubmitting(true);

      try {
        const { message, data: user } = await login({ email, password });
        dispatch(setUser(user));
        toast.success(message || 'Welcome! Redirecting...');
        navigate('/Dashboard', { replace: true });
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          err?.response?.data?.error ||
          'Request failed';
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
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
              className="text-2xl font-semibold text-[#0F7B8A] text-center"
            />
            <Text
              as="p"
              content="Healthcare Scheduling"
              className="text-gray-500 text-center"
            />
          </div>
        </div>

        {/* Login Form Card */}
        <Card className="p-8 shadow-sm border bg-white border-gray-200 space-y-6">
          <div className="space-y-2 text-center">
            <Text
              as="h2"
              content="Sign In"
              className="text-xl font-normal text-gray-500"
            />
            <Text
              as="p"
              content="Access your SmartShift account"
              className="text-sm text-gray-500"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
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
            />

            {/* Password Input */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />

            {/* Forgot Password Link */}
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
              disabled={!email || !password || !!errors.email || !!errors.password || isSubmitting}
              className={`w-full h-11 mt-6 flex items-center justify-center bg-[#0F7B8A] text-white rounded-lg shadow-md hover:bg-[#0D6C78] ${
                !email || !password || !!errors.email || !!errors.password || isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }`}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </Card>

        {/* Help Section */}
        <div className="text-center">
          <Text
            as="p"
            content="Need help accessing your account? "
            className="text-sm text-gray-500 inline"
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
