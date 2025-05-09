import React from 'react';

interface PlatformCardsProps {
  onPlatformSelect: (platform: 'youtube' | 'facebook' | 'tiktok') => void;
}

export default function PlatformCards({ onPlatformSelect }: PlatformCardsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* YouTube Card */}
      <div id="youtube" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-red-600">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <i className="fab fa-youtube text-red-600 text-3xl mr-3"></i>
            <h2 className="font-heading font-semibold text-xl">YouTube</h2>
          </div>
          <p className="text-gray-600 mb-4">Download videos, select quality, and extract audio from YouTube.</p>
          <ul className="space-y-2 mb-4 text-gray-700">
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Multiple video qualities</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Audio extraction</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Video-only download</span>
            </li>
          </ul>
          <div className="pt-2">
            <a 
              href="#" 
              className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onPlatformSelect('youtube');
              }}
            >
              Try YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Facebook Card */}
      <div id="facebook" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-blue-600">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <i className="fab fa-facebook-f text-blue-600 text-3xl mr-3"></i>
            <h2 className="font-heading font-semibold text-xl">Facebook</h2>
          </div>
          <p className="text-gray-600 mb-4">Save videos from Facebook posts, reels, and stories.</p>
          <ul className="space-y-2 mb-4 text-gray-700">
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>HD quality downloads</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Public and private videos</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Simple one-click process</span>
            </li>
          </ul>
          <div className="pt-2">
            <a 
              href="#" 
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onPlatformSelect('facebook');
              }}
            >
              Try Facebook
            </a>
          </div>
        </div>
      </div>

      {/* TikTok Card */}
      <div id="tiktok" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-black">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <i className="fab fa-tiktok text-black text-3xl mr-3"></i>
            <h2 className="font-heading font-semibold text-xl">TikTok</h2>
          </div>
          <p className="text-gray-600 mb-4">Download TikTok videos and audio without watermarks.</p>
          <ul className="space-y-2 mb-4 text-gray-700">
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>No watermarks</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>Audio extraction</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-secondary mr-2"></i>
              <span>High-quality downloads</span>
            </li>
          </ul>
          <div className="pt-2">
            <a 
              href="#" 
              className="inline-block px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onPlatformSelect('tiktok');
              }}
            >
              Try TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
