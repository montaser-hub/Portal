import React from 'react';
import { AlertCircle, Home } from 'lucide-react';
import Card from '../components/common/Card';
import Text from '../components/common/Text';
import { useNavigate } from "react-router-dom";

export default function NotFoundPage({ isAuthenticated }) {

  const navigate = useNavigate();
  const handleGoBack = () => {
      navigate("/Login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Card className="p-12 max-w-lg w-full text-center space-y-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center shadow-md">
            <AlertCircle className="h-12 w-12 text-teal-500" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <Text as="h1" content="Oops!" MyClass="text-4xl font-bold text-teal-500"  />
          <Text as="h2" content="Page Not Found" MyClass="text-2xl font-semibold text-gray-400"  />
          <Text as="p" content="The page you're looking for doesn't exist or has been moved." MyClass="text-gray-500 text-sm"  />
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center text-teal-600 hover:text-teal-500"
          >
                <Home className="mr-2 h-4 w-4" /> Back To Home
          </button>
        </div>
      </Card>
    </div>
  );
}
