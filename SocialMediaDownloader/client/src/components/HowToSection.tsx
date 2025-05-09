import React from 'react';

export default function HowToSection() {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="font-heading font-semibold text-xl mb-6">How to Download Videos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary bg-opacity-10 text-primary">
              <i className="fas fa-link text-2xl"></i>
            </div>
            <h3 className="font-medium text-lg mb-2">1. Copy & Paste URL</h3>
            <p className="text-gray-600">Copy the video URL from YouTube, Facebook, or TikTok and paste it into the input field.</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary bg-opacity-10 text-primary">
              <i className="fas fa-cog text-2xl"></i>
            </div>
            <h3 className="font-medium text-lg mb-2">2. Select Format & Quality</h3>
            <p className="text-gray-600">Choose your preferred format and quality from the available options.</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary bg-opacity-10 text-primary">
              <i className="fas fa-download text-2xl"></i>
            </div>
            <h3 className="font-medium text-lg mb-2">3. Download</h3>
            <p className="text-gray-600">Click the download button and wait for the process to complete. The file will be saved to your device.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
