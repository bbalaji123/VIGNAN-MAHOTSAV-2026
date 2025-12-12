import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LoadingAnimation.css';

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
    <div className={`loading-animation-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-animation-content">
        <DotLottieReact
          src="/loading.lottie"
          loop
          autoplay
          style={{ width: size, height: size }}
        />
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingAnimation;
