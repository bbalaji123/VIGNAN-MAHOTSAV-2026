import React from 'react';
import './RotatingFlower.css';

interface RotatingFlowerProps {
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
}

const RotatingFlower: React.FC<RotatingFlowerProps> = ({ position = 'top-right', size = 'medium' }) => {
  const sizeMap = {
    small: '400px',
    medium: '600px',
    large: '800px'
  };

  const positionStyles = {
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'top-left': { top: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 }
  };

  const containerSize = sizeMap[size];
  const posStyle = positionStyles[position];

  return (
    <div 
      className="rotating-flower-container" 
      style={{ 
        width: containerSize, 
        height: containerSize,
        ...posStyle
      }}
    >
      <div className="flower-rotation-wrapper">
        {/* Petals layer - rotates anticlockwise */}
        <img 
          src={`${import.meta.env.BASE_URL}petals.png`}
          alt="Flower Petals"
          className="flower-petals"
        />
        
        {/* Sun layer in center - rotates clockwise */}
        <div className="flower-center">
          <img 
            src={`${import.meta.env.BASE_URL}sun.png`}
            alt="Sun"
            className="flower-sun"
          />
        </div>
      </div>
      
      {/* Moon layer - stays static */}
      <img 
        src={`${import.meta.env.BASE_URL}moon.png`}
        alt="Moon"
        className="flower-moon"
      />
    </div>
  );
};

export default RotatingFlower;
