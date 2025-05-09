export interface VideoData {
  platform: 'youtube' | 'facebook' | 'tiktok';
  data: YouTubeResponse | FacebookResponse | TikTokResponse;
}

export interface YouTubeResponse {
  error: boolean;
  title: string;
  duration: string;
  thumbnail: string;
  video_with_audio: VideoWithAudio[];
  video_only: VideoOnly[];
  audio: Audio[];
  join?: string;
  support?: string;
}

export interface VideoWithAudio {
  label: string;
  type: 'video_with_audio';
  width: number;
  height: number;
  extension: string;
  fps: number;
  url: string;
}

export interface VideoOnly {
  label: string;
  type: 'video_only';
  width: number;
  height: number;
  extension: string;
  fps: number;
  url: string;
}

export interface Audio {
  label: string;
  type: 'audio';
  extension: string;
  bitrate: number;
  url: string;
}

export interface FacebookResponse {
  status: boolean;
  data: {
    thumbnail: string;
    quality: string;
    url: string;
    join?: string;
    Dev?: string;
  };
}

export interface TikTokResponse {
  message?: string;
  status: string | boolean;
  id?: string;
  video_title?: string;
  duration?: number;
  non_watermarked_url?: string;
  watermarked_url?: string;
  author_url?: string;
  author_nickname?: string;
  author_avatar?: string;
  file_size?: number;
  api_info?: {
    developer: string;
    contact: string;
    github: string;
  };
  // Old API structure support
  platform?: string;
  data?: {
    video: string;
    audio: string;
  };
  creator?: {
    username: string;
    name: string;
    profile_photo: string;
  };
  details?: {
    total_views: number;
    total_likes: number;
    total_comment: number;
    total_share: number;
    total_download: number;
    video_duration: number;
  };
}
