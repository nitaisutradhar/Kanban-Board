import React from 'react';

const TaskLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center px-4">
      <div className="animate-bounce mb-6">
        <svg
          className="w-16 h-16 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-primary animate-pulse">
        Loading Tasks<span className="inline-block w-2 h-2 bg-primary rounded-full mx-1 animate-ping"></span>
      </h2>

      <p className="text-sm text-gray-500 mt-2 animate-pulse">
        Please wait just a moment..
      </p>

      <progress className="progress progress-primary w-56 mt-6"></progress>
    </div>
  );
};

export default TaskLoader;
