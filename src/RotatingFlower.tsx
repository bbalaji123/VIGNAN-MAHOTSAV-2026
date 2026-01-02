import React, { useEffect, useState } from 'react';

interface RotatingFlowerProps {
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
}

const RotatingFlower: React.FC<RotatingFlowerProps> = ({ position = 'top-right', size = 'medium' }) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Move flower based on scroll position (adjust multiplier for speed)
      setScrollOffset(scrollY * 0.1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Calculate horizontal offset based on position
  const getTransformStyle = () => {
    const isRight = position === 'top-right' || position === 'bottom-right';
    // Move right for right-positioned flowers, move left for left-positioned flowers
    const xOffset = isRight ? scrollOffset : -scrollOffset;
    return {
      transform: `translateX(${xOffset}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div 
      className={`fixed z-10 pointer-events-none overflow-hidden ${sizeClasses[size]} ${positionClasses[position]}`}
      style={getTransformStyle()}
    >
      <div className="absolute w-full h-full origin-center animate-petalsRotate">
        {/* Petals layer - rotates anticlockwise */}
        <img 
          src="/images/petals.png"
          alt="Flower Petals"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        
        {/* Sun layer in center - rotates clockwise */}
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 animate-sunRotate">
          <img 
            src="/images/sun.png"
            alt="Sun"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Moon layer - stays static */}
      <img 
        src="/images/moon.png"
        alt="Moon"
        className="absolute top-1/2 left-1/2 w-1/5 h-1/5 -translate-x-1/2 -translate-y-1/2 object-contain z-[2]"
      />
    </div>
  );
};

export default RotatingFlower;
