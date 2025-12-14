import React from 'react';

interface RotatingFlowerProps {
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
}

const RotatingFlower: React.FC<RotatingFlowerProps> = ({ position = 'top-right', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]',
    medium: 'w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[600px] md:h-[600px]',
    large: 'w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[800px] md:h-[800px]'
  };

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  return (
    <div 
      className={`fixed z-10 pointer-events-none overflow-hidden ${sizeClasses[size]} ${positionClasses[position]}`}
    >
      <div className="absolute w-full h-full origin-center animate-petalsRotate">
        {/* Petals layer - rotates anticlockwise */}
        <img 
          src={`${import.meta.env.BASE_URL}petals.png`}
          alt="Flower Petals"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        
        {/* Sun layer in center - rotates clockwise */}
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 animate-sunRotate">
          <img 
            src={`${import.meta.env.BASE_URL}sun.png`}
            alt="Sun"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Moon layer - stays static */}
      <img 
        src={`${import.meta.env.BASE_URL}moon.png`}
        alt="Moon"
        className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 object-contain z-[2]"
      />
    </div>
  );
};

export default RotatingFlower;
