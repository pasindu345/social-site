import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white font-heading font-semibold text-lg flex items-center">
              <i className="fas fa-cloud-download-alt mr-2"></i>
              Social Media Downloader
            </h3>
            <p className="text-sm mt-2">Download videos from popular social media platforms</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#youtube" className="hover:text-white transition-colors">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="#facebook" className="hover:text-white transition-colors">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#tiktok" className="hover:text-white transition-colors">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Social Media Downloader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
