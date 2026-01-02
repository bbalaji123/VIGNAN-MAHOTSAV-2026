import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '', style = {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed top-3 left-1 sm:top-4 sm:left-4 md:top-5 md:left-5 z-[9999] w-28 h-14 sm:w-32 sm:h-16 md:w-36 md:h-18 lg:w-40 lg:h-20 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation ${className}`}
      style={style}
      aria-label="Go back"
    >
      <img
        src="/menu-dashboard/BACK.avif"
        alt="Back"
        className="w-full h-full object-contain pointer-events-none"
      />
    </button>
  );
};

export default BackButton;
