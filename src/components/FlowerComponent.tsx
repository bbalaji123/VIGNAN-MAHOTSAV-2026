import React from 'react';

interface FlowerComponentProps {
  size?: string;
  sunSize?: string;
  moonSize?: string;
  className?: string;
  showPetalRotation?: boolean;
  opacity?: number;
  clipPath?: string;
  sunTop?: string;
  sunLeft?: string;
  moonTop?: string;
  moonLeft?: string;
  style?: React.CSSProperties;
  petalAnimation?: string;
  clipPathTransition?: string;
}

const FlowerComponent: React.FC<FlowerComponentProps> = ({
  size = '100%',
  sunSize = '45%',
  moonSize = '39.5%',
  className = '',
  showPetalRotation = true,
  opacity = 1,
  clipPath = 'none',
  sunTop = '28%',
  sunLeft = '28%',
  moonTop = '30.8%',
  moonLeft = '30.8%',
  style = {},
  petalAnimation = '',
  clipPathTransition = 'none'
}) => {
  const defaultPetalAnimation = showPetalRotation ? 'petalsRotateAnticlockwise 40s linear infinite' : 'none';
  
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        opacity: opacity,
        ...style
      }}
    >
      {/* Petals Layer */}
      <img 
        src={`${import.meta.env.BASE_URL}petals.png`}
        alt="Flower Petals"
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          animation: petalAnimation || defaultPetalAnimation,
          clipPath: clipPath,
          transition: clipPathTransition
        }}
      />
      
      {/* Sun Layer */}
      <img 
        src={`${import.meta.env.BASE_URL}sun.png`}
        alt="Sun"
        style={{ 
          width: sunSize, 
          height: sunSize, 
          display: 'block',
          position: 'absolute',
          top: sunTop,
          left: sunLeft,
          animation: 'sunRotateClockwise 20s linear infinite',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Moon Layer */}
      <img 
        src={`${import.meta.env.BASE_URL}moon.png`}
        alt="Moon"
        style={{ 
          width: moonSize, 
          height: moonSize, 
          display: 'block',
          position: 'absolute',
          top: moonTop,
          left: moonLeft,
          pointerEvents: 'none',
          zIndex: 10,
          animation: 'counterRotate 120s linear infinite',
          transformOrigin: 'center center'
        }}
      />
    </div>
  );
};

export default FlowerComponent;
