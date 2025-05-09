import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fas fa-cloud-download-alt text-white text-3xl mr-2"></i>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">Social Media Downloader</h1>
          </div>
          <div className="flex space-x-3">
            <a href="#youtube" className="text-white hover:text-accent transition-colors rounded-full p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="#facebook" className="text-white hover:text-accent transition-colors rounded-full p-2 bg-blue-600 bg-opacity-20 hover:bg-opacity-30">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#tiktok" className="text-white hover:text-accent transition-colors rounded-full p-2 bg-black bg-opacity-20 hover:bg-opacity-30">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
