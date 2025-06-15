import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 px-4">
      {/* Spinner Circle */}
      <div className="relative flex items-center justify-center mb-6">
        <svg
          className="w-16 h-16 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="absolute w-3 h-3 bg-primary rounded-full animate-ping-slow"></span>
      </div>

      {/* Animated Loading Dots */}
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></span>
      </div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm font-medium tracking-wide">
        Please wait, loading content...
      </p>
    </div>
  );
};

export default Loading;
