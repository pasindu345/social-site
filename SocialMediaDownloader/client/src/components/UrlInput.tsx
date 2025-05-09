import React, { useState } from 'react';

interface UrlInputProps {
  onFetch: (url: string) => void;
  errorMessage: string;
}

export default function UrlInput({ onFetch, errorMessage }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetch(url);
  };

  return (
    <section className="mb-10">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="font-heading font-semibold text-xl mb-4">Enter Video URL</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input 
                type="text" 
                id="videoUrl" 
                placeholder="Paste YouTube, Facebook or TikTok URL" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i> Fetch Video
            </button>
          </div>
        </form>
        
        {errorMessage && (
          <div className="mt-3 text-red-500 bg-red-50 p-3 rounded-lg">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
}
