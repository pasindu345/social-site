import { YouTubeResponse, FacebookResponse, TikTokResponse } from '@/types';

// Server-side API endpoints
const API_ENDPOINTS = {
  youtube: '/api/youtube',
  facebook: '/api/facebook',
  tiktok: '/api/tiktok'
};

export async function fetchVideoInfo(
  url: string, 
  platform: 'youtube' | 'facebook' | 'tiktok'
): Promise<YouTubeResponse | FacebookResponse | TikTokResponse> {
  const apiUrl = `${API_ENDPOINTS[platform]}?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${platform} video:`, error);
    throw error;
  }
}
