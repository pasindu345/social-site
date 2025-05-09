import React from 'react';

export default function LoadingState() {
  return (
    <div className="mb-10">
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Fetching video information...</p>
      </div>
    </div>
  );
}
