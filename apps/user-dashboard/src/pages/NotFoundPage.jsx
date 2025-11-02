import React from 'react';
import { AlertCircle, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Text from '../components/common/Text';
export default function NotFoundPage({ isAuthenticated }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <Card className="p-12 max-w-lg w-full text-center space-y-8 bg-gray-100">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-teal-300 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-teal-500" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <Text
            as="h1"
            content="Oops!"
            MyClass="text-4xl font-bold text-teal-500"
          />
          <Text
            as="h2"
            content="Page Not Found"
            MyClass="text-xl font-semibold text-gray-400"
          />
          <Text
            as="p"
            content="The page you're looking for doesn't exist or has been moved."
            MyClass="text-gray-500"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">

            <Link
              to="/dashboard"
              className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow"
            >
            <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>

            <Link
              to="/login"
              className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Go to Login
            </Link>

        </div>
      </Card>
    </div>
  );
}
