import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-sky-50 flex flex-col justify-center items-center px-4 text-center">
      {/* SVG Illustration */}
      <div className="max-w-md mb-8">
        <svg
          viewBox="0 0 700 500"
          className="w-full h-auto animate-[bounce_3s_ease-in-out_infinite] transform translate-y-1/10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="350" cy="250" r="200" fill="#BFDBFE" />
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            className="fill-sky-700"
            fontSize="100"
            fontWeight="bold"
          >
            404
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            className="fill-gray-700"
            fontSize="22"
          >
            Page Not Found
          </text>
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Looks like you're lost</h2>
      <p className="text-gray-600 mb-6">The page you are looking for isn't available.</p>

      <Link to="/" className="btn btn-primary btn-wide">
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
