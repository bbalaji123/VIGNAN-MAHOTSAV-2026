import React, { useRef, useEffect, useState } from 'react';

const AnimatedIcon: React.FC = () => {
  const [transform, setTransform] = useState('translate(-50%, 50%)');
  const iconRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      // Get scroll position using multiple methods for compatibility
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Detect device type based on screen size
      const isSmallMobile = vw < 480;  // Small phones
      const isMobile = vw < 768;        // Regular phones
      const isTablet = vw >= 768 && vw < 1024;  // Tablets & Z Fold unfolded
      const isDesktop = vw >= 1024;
      
      // Adjust scroll range based on device
      let scrollRange = 500;
      if (isSmallMobile) scrollRange = 250;
      else if (isMobile) scrollRange = 300;
      else if (isTablet) scrollRange = 400;
      
      let progress = scrollY / scrollRange;
      progress = Math.min(1, Math.max(0, progress));

      // Move flower to right side - half off screen
      // Calculate final X position based on screen size
      let finalX;
      if (isSmallMobile) {
        finalX = vw * 0.9;  // Move more on small screens
      } else if (isMobile) {
        finalX = vw * 0.85;
      } else if (isTablet) {
        finalX = vw * 0.6;  // Tablets like Z Fold
      } else {
        finalX = vw * 0.5;  // Desktop
      }
      const newX = progress * finalX;

      // Move up to vertical center
      let finalY;
      if (isSmallMobile) {
        finalY = -vh * 0.2;
      } else if (isMobile) {
        finalY = -vh * 0.25;
      } else if (isTablet) {
        finalY = -vh * 0.4;
      } else {
        finalY = -vh * 0.5;
      }
      const newY = progress * finalY; 

      // Scale down
      const initialScale = 1;
      let finalScale;
      if (isSmallMobile) {
        finalScale = 0.3;
      } else if (isMobile) {
        finalScale = 0.35;
      } else if (isTablet) {
        finalScale = 0.38;
      } else {
        finalScale = 0.4;
      }
      const newScale = initialScale - (progress * (initialScale - finalScale));
      
      setTransform(
        `translate(-50%, 50%) translateX(${newX}px) translateY(${newY}px) scale(${newScale})`
      );
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    // Listen on both window and document for maximum compatibility
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePosition);
    
    // Initial position
    updatePosition();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className="fixed bottom-0 left-1/2 z-[8] 
                 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[550px] md:h-[550px] lg:w-[720px] lg:h-[720px]
                 drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-none"
      style={{ transform }}
    >
      {/* Petals layer - rotates anticlockwise */}
      <img 
        src={`${import.meta.env.BASE_URL}petals.png`}
        alt="Flower Petals"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ 
          animation: 'spin 20s linear infinite reverse'
        }}
      />
      {/* Sun layer in center - rotates clockwise */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={`${import.meta.env.BASE_URL}sun.png`}
          alt="Sun"
          className="w-1/3 h-1/3 object-contain"
          style={{ 
            animation: 'spin 10s linear infinite'
          }}
        />
      </div>
      {/* Moon layer - stays static in center */}
      <img 
        src={`${import.meta.env.BASE_URL}moon.png`}
        alt="Moon"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-1/3 h-1/3 object-contain"
      />
    </div>
  );
};

export default AnimatedIcon;
