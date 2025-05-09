import React from 'react';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import VideoPreview from '@/components/VideoPreview';
import PlatformCards from '@/components/PlatformCards';
import HowToSection from '@/components/HowToSection';
import Footer from '@/components/Footer';
import LoadingState from '@/components/LoadingState';
import { useState } from 'react';
import { fetchVideoInfo } from '@/lib/api';
import { YouTubeResponse, FacebookResponse, TikTokResponse, VideoData } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'youtube' | 'facebook' | 'tiktok'>('youtube');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'video_with_audio' | 'video_only' | 'audio'>('video_with_audio');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleFetch = async (url: string) => {
    if (!url) {
      setErrorMessage('Please enter a URL');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const platform = detectPlatform(url);
      
      if (!platform) {
        setErrorMessage('Invalid URL. Please enter a valid YouTube, Facebook or TikTok URL.');
        setIsLoading(false);
        return;
      }

      const data = await fetchVideoInfo(url, platform);
      
      if ((platform === 'youtube' && (data as YouTubeResponse).error) ||
          (platform === 'facebook' && !(data as FacebookResponse).status) ||
          (platform === 'tiktok' && !(data as TikTokResponse).status)) {
        setErrorMessage('Failed to fetch video information. Please check the URL and try again.');
        setIsLoading(false);
        return;
      }

      setVideoData({ platform, data });
      setActiveTab(platform);
    } catch (error) {
      console.error('Error fetching video:', error);
      setErrorMessage('An error occurred while fetching the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const detectPlatform = (url: string): 'youtube' | 'facebook' | 'tiktok' | null => {
    if (!url) return null;
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      return 'facebook';
    } else if (url.includes('tiktok.com')) {
      return 'tiktok';
    }
    
    return null;
  };

  const handleSelectFormat = (format: 'video_with_audio' | 'video_only' | 'audio') => {
    setSelectedFormat(format);
  };

  const handleDownload = (url: string) => {
    if (!url) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Start the download by creating an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download'; // The browser will figure out the file extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Simulate progress for UX
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
      }
      
      setDownloadProgress(progress);
    }, 300);
  };

  return (
    <div className="bg-gray-100 font-sans text-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <UrlInput 
          onFetch={handleFetch} 
          errorMessage={errorMessage} 
        />
        
        {isLoading && <LoadingState />}
        
        {videoData && (
          <VideoPreview 
            videoData={videoData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedFormat={selectedFormat}
            onFormatChange={handleSelectFormat}
            onDownload={handleDownload}
            isDownloading={isDownloading}
            downloadProgress={downloadProgress}
          />
        )}
        
        <PlatformCards onPlatformSelect={(platform) => document.getElementById('videoUrl')?.focus()} />
        
        <HowToSection />
      </main>
      
      <Footer />
    </div>
  );
}
