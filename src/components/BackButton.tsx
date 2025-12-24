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
      className={`fixed top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 z-50 w-20 h-12 sm:w-24 sm:h-14 md:w-32 md:h-16 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation ${className}`}
      style={style}
      aria-label="Go back"
    >
      <img
        src={`${import.meta.env.BASE_URL}BackButton.svg`}
        alt="Back"
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default BackButton;
