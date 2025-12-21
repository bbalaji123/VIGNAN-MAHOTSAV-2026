import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoadingAnimationProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  message = 'Please wait...', 
  size = 180,
  fullScreen = false 
}) => {
  return (
    <div className={`flex items-center justify-center flex-col
      ${fullScreen ? 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]' : ''}`}
    >
      <div className={`flex flex-col items-center justify-center p-5 rounded-2xl backdrop-blur-lg
        ${fullScreen ? 'bg-white/15 shadow-2xl' : 'bg-transparent'}`}
      >
        <DotLottieReact
          src="/loading.lottie"
          loop
          autoplay
          style={{ width: `${size}px`, height: `${size}px` }}
        />
        {message && (
          <p className={`mt-4 text-lg text-center font-medium animate-pulse
            ${fullScreen ? 'text-white' : 'text-orange-500'}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingAnimation;
