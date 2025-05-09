import React, { useEffect, useState, useRef } from 'react';
import { VideoData, YouTubeResponse, FacebookResponse, TikTokResponse } from '@/types';
import { formatTime } from '@/utils/formatters';

interface VideoPreviewProps {
  videoData: VideoData;
  activeTab: 'youtube' | 'facebook' | 'tiktok';
  onTabChange: (tab: 'youtube' | 'facebook' | 'tiktok') => void;
  selectedFormat: 'video_with_audio' | 'video_only' | 'audio';
  onFormatChange: (format: 'video_with_audio' | 'video_only' | 'audio') => void;
  onDownload: (url: string) => void;
  isDownloading: boolean;
  downloadProgress: number;
}

export default function VideoPreview({ 
  videoData, 
  activeTab, 
  onTabChange,
  selectedFormat,
  onFormatChange,
  onDownload,
  isDownloading,
  downloadProgress
}: VideoPreviewProps) {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset video player when video data changes
    setShowVideoPlayer(false);
    
    // Set initial quality selection based on format
    updateInitialQualitySelection();
  }, [videoData, selectedFormat]);

  useEffect(() => {
    // Update download URL when quality or format changes
    updateDownloadUrl();
  }, [selectedQuality, selectedFormat, videoData]);

  const updateInitialQualitySelection = () => {
    if (!videoData) return;
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      const ytData = data as YouTubeResponse;
      
      switch (selectedFormat) {
        case 'video_with_audio':
          if (ytData.video_with_audio?.length > 0) {
            setSelectedQuality(ytData.video_with_audio[0].label);
          }
          break;
        case 'video_only':
          if (ytData.video_only?.length > 0) {
            setSelectedQuality(ytData.video_only[0].label);
          }
          break;
        case 'audio':
          if (ytData.audio?.length > 0) {
            setSelectedQuality(ytData.audio[0].label);
          }
          break;
      }
    } else if (platform === 'facebook') {
      const fbData = data as FacebookResponse;
      setSelectedQuality(fbData.data.quality);
    } else if (platform === 'tiktok') {
      setSelectedQuality('HD');
    }
  };

  const updateDownloadUrl = () => {
    if (!videoData || !selectedQuality) return;
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      const ytData = data as YouTubeResponse;
      
      if (selectedFormat === 'video_with_audio') {
        const videoItem = ytData.video_with_audio?.find(item => item.label === selectedQuality);
        if (videoItem) setDownloadUrl(videoItem.url);
      } else if (selectedFormat === 'video_only') {
        const videoItem = ytData.video_only?.find(item => item.label === selectedQuality);
        if (videoItem) setDownloadUrl(videoItem.url);
      } else if (selectedFormat === 'audio') {
        const audioItem = ytData.audio?.find(item => item.label === selectedQuality);
        if (audioItem) setDownloadUrl(audioItem.url);
      }
    } else if (platform === 'facebook') {
      const fbData = data as FacebookResponse;
      setDownloadUrl(fbData.data.url);
    } else if (platform === 'tiktok') {
      const tkData = data as TikTokResponse;
      if (selectedFormat === 'audio') {
        // Check if the new API structure is being used or old one
        if (tkData.author_url) {
          setDownloadUrl(tkData.author_url);
        } else if (tkData.data?.audio) {
          setDownloadUrl(tkData.data.audio);
        }
      } else {
        // Check if the new API structure is being used
        if (tkData.non_watermarked_url) {
          setDownloadUrl(tkData.non_watermarked_url);
        } else if (tkData.watermarked_url) {
          setDownloadUrl(tkData.watermarked_url);
        } else if (tkData.data?.video) {
          setDownloadUrl(tkData.data.video);
        }
      }
    }
  };

  const handleShowVideoPreview = () => {
    setShowVideoPlayer(true);
    
    setTimeout(() => {
      if (videoRef.current) {
        // Set the source based on platform and format
        if (videoData.platform === 'youtube') {
          const ytData = videoData.data as YouTubeResponse;
          if (ytData.video_with_audio?.length > 0) {
            videoRef.current.src = ytData.video_with_audio[0].url;
          }
        } else if (videoData.platform === 'facebook') {
          const fbData = videoData.data as FacebookResponse;
          videoRef.current.src = fbData.data.url;
        } else if (videoData.platform === 'tiktok') {
          const tkData = videoData.data as TikTokResponse;
          // Handle different TikTok API formats
          if (tkData.non_watermarked_url) {
            videoRef.current.src = tkData.non_watermarked_url;
          } else if (tkData.watermarked_url) {
            videoRef.current.src = tkData.watermarked_url;
          } else if (tkData.data?.video) {
            videoRef.current.src = tkData.data.video;
          }
        }
        
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }, 0);
  };

  // Get thumbnail based on the platform
  const getThumbnail = () => {
    if (!videoData) return '';
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      return (data as YouTubeResponse).thumbnail;
    } else if (platform === 'facebook') {
      return (data as FacebookResponse).data.thumbnail;
    } else if (platform === 'tiktok') {
      const tkData = data as TikTokResponse;
      
      if (tkData.author_avatar) {
        return tkData.author_avatar;
      } else if (tkData.creator?.profile_photo) {
        // If profile photo is available but it's URL encoded, decode it
        let profilePhoto = tkData.creator.profile_photo;
        if (profilePhoto.startsWith('https%3A')) {
          try {
            profilePhoto = decodeURIComponent(profilePhoto);
          } catch (e) {
            // If decoding fails, fall back to the original
          }
        }
        return profilePhoto;
      }
      // Fallback to a placeholder
      return 'https://cdn-icons-png.flaticon.com/512/5968/5968812.png';
    }
    
    return '';
  };

  // Get video title based on the platform
  const getVideoTitle = () => {
    if (!videoData) return '';
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      return (data as YouTubeResponse).title;
    } else if (platform === 'facebook') {
      return 'Facebook Video';
    } else if (platform === 'tiktok') {
      const tkData = data as TikTokResponse;
      if (tkData.video_title) {
        return tkData.video_title;
      } else if (tkData.creator?.username) {
        return `TikTok Video by @${tkData.creator.username}`;
      } else if (tkData.author_nickname) {
        return `TikTok Video by ${tkData.author_nickname}`;
      }
      return 'TikTok Video';
    }
    
    return '';
  };

  // Get video duration based on the platform
  const getVideoDuration = () => {
    if (!videoData) return '00:00';
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      return formatTime((data as YouTubeResponse).duration);
    } else if (platform === 'tiktok') {
      const tkData = data as TikTokResponse;
      if (tkData.duration) {
        return formatTime(tkData.duration);
      } else if (tkData.details?.video_duration) {
        return formatTime(tkData.details.video_duration);
      }
    }
    
    return '00:00';
  };

  // Render quality options based on the platform and selected format
  const renderQualityOptions = () => {
    if (!videoData) return null;
    
    const { platform, data } = videoData;
    
    if (platform === 'youtube') {
      const ytData = data as YouTubeResponse;
      
      if (selectedFormat === 'video_with_audio' && ytData.video_with_audio) {
        return ytData.video_with_audio.map(item => (
          <option key={item.label} value={item.label}>
            {item.label} ({item.width}x{item.height}, {item.fps}fps)
          </option>
        ));
      } else if (selectedFormat === 'video_only' && ytData.video_only) {
        return ytData.video_only.map(item => (
          <option key={item.label} value={item.label}>
            {item.label} ({item.width}x{item.height}, {item.fps}fps)
          </option>
        ));
      } else if (selectedFormat === 'audio' && ytData.audio) {
        return ytData.audio.map(item => (
          <option key={item.label} value={item.label}>
            {item.label} ({(item.bitrate / 1000).toFixed(0)}kbps)
          </option>
        ));
      }
    } else if (platform === 'facebook') {
      const fbData = data as FacebookResponse;
      return <option value={fbData.data.quality}>{fbData.data.quality}</option>;
    } else if (platform === 'tiktok') {
      if (selectedFormat === 'audio') {
        return <option value="audio">Audio</option>;
      }
      return <option value="HD">HD</option>;
    }
    
    return null;
  };

  return (
    <section className="mb-10">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Platform tabs */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 px-4 font-medium text-center border-b-2 ${activeTab === 'youtube' ? 'border-primary bg-gray-50 text-primary' : 'border-transparent hover:bg-gray-50 hover:text-gray-700'}`}
            onClick={() => onTabChange('youtube')}
          >
            <i className="fab fa-youtube mr-2"></i> YouTube
          </button>
          <button 
            className={`flex-1 py-3 px-4 font-medium text-center border-b-2 ${activeTab === 'facebook' ? 'border-primary bg-gray-50 text-primary' : 'border-transparent hover:bg-gray-50 hover:text-gray-700'}`}
            onClick={() => onTabChange('facebook')}
          >
            <i className="fab fa-facebook-f mr-2"></i> Facebook
          </button>
          <button 
            className={`flex-1 py-3 px-4 font-medium text-center border-b-2 ${activeTab === 'tiktok' ? 'border-primary bg-gray-50 text-primary' : 'border-transparent hover:bg-gray-50 hover:text-gray-700'}`}
            onClick={() => onTabChange('tiktok')}
          >
            <i className="fab fa-tiktok mr-2"></i> TikTok
          </button>
        </div>

        {/* Preview content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Thumbnail and video preview */}
            <div className="md:w-1/2">
              {/* Thumbnail with play button overlay */}
              {!showVideoPlayer ? (
                <div className="relative rounded-lg overflow-hidden shadow-md group">
                  <img 
                    src={getThumbnail()} 
                    alt="Video thumbnail" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="bg-primary hover:bg-blue-700 text-white rounded-full p-4 transition-all transform hover:scale-110"
                      onClick={handleShowVideoPreview}
                    >
                      <i className="fas fa-play text-xl"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-lg overflow-hidden shadow-md">
                  <video 
                    ref={videoRef}
                    controls 
                    className="w-full"
                  >
                    <source src="" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            {/* Right column - Video information and download options */}
            <div className="md:w-1/2">
              <h2 className="text-xl font-heading font-semibold mb-2">{getVideoTitle()}</h2>
              
              <div className="flex items-center text-gray-600 mb-4">
                <span className="flex items-center mr-4">
                  <i className="far fa-clock mr-1"></i>
                  <span>{getVideoDuration()}</span>
                </span>
                {videoData.platform === 'facebook' && (
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {(videoData.data as FacebookResponse).data.quality}
                  </span>
                )}
                {videoData.platform === 'tiktok' && (videoData.data as TikTokResponse).details && (
                  <div className="flex space-x-3">
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">
                      <i className="fas fa-eye mr-1"></i> {(videoData.data as TikTokResponse).details?.total_views.toLocaleString()}
                    </span>
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">
                      <i className="fas fa-heart mr-1"></i> {(videoData.data as TikTokResponse).details?.total_likes.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Format selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Format</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-3 py-2 ${selectedFormat === 'video_with_audio' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} rounded-md text-sm`}
                    onClick={() => onFormatChange('video_with_audio')}
                  >
                    <i className="fas fa-file-video mr-1"></i> Video with Audio
                  </button>
                  {videoData.platform === 'youtube' && (
                    <button 
                      className={`px-3 py-2 ${selectedFormat === 'video_only' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} rounded-md text-sm`}
                      onClick={() => onFormatChange('video_only')}
                    >
                      <i className="fas fa-video mr-1"></i> Video Only
                    </button>
                  )}
                  {(videoData.platform === 'youtube' || videoData.platform === 'tiktok') && (
                    <button 
                      className={`px-3 py-2 ${selectedFormat === 'audio' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} rounded-md text-sm`}
                      onClick={() => onFormatChange('audio')}
                    >
                      <i className="fas fa-music mr-1"></i> Audio Only
                    </button>
                  )}
                </div>
              </div>

              {/* Quality selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Quality</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                >
                  {renderQualityOptions()}
                </select>
              </div>

              {/* Download button with progress */}
              <div>
                <button 
                  className="w-full py-3 bg-secondary hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  onClick={() => onDownload(downloadUrl)}
                  disabled={isDownloading || !downloadUrl}
                >
                  <i className="fas fa-download mr-2"></i> Download Now
                </button>
                
                {/* Download progress */}
                {isDownloading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Downloading...</span>
                      <span>{Math.round(downloadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-secondary h-2.5 rounded-full" 
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
