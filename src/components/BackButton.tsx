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
      className={`fixed top-5 left-5 z-50 w-40 h-20 flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-300 hover:scale-110 ${className}`}
      style={style}
      aria-label="Go back"
    >
      <img
        src={`${import.meta.env.BASE_URL}BACK.avif`}
        alt="Back"
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default BackButton;
