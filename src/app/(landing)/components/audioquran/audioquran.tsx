'use client';
import { useState } from 'react';

interface AudioQuranProps {
  progress: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  audioName: string;
  surah: string;
}
const AudioQuran = ( {progress, audioRef, audioName, surah}: AudioQuranProps ) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 menit contoh

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const names = audioName.split('/');
  const qariName = names[names.length - 2].replace(/-/g, ' ');

  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{surah}</h3>
            <p className="text-gray-500 text-sm">Syech {qariName}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
            <div 
              className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(audioRef.current?.duration || 0)}</span>
          </div>
        </div>

    
      </div>

      
    </div>
  );
};

export default AudioQuran;