import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-slate-100">
    <div className="flex flex-col items-center gap-4">
      <svg
        className="animate-spin h-12 w-12 text-emerald-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      <div className="text-sm text-gray-400">Fetching the latest news for you</div>
    </div>
  </div>
);
