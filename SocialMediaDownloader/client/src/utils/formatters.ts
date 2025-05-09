export function formatTime(seconds: string | number): string {
  if (!seconds) return '00:00';
  
  const totalSeconds = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
