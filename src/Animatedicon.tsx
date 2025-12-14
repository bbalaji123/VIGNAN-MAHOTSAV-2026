import React, { useRef, useEffect, useState } from 'react';

const AnimatedIcon: React.FC = () => {
  const [transform, setTransform] = useState('translate(-50%, 50%)');
  const [size, setSize] = useState(720);
  const [opacity, setOpacity] = useState(1);
  const iconRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      // Get scroll position using multiple methods for compatibility
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      console.log('Scroll Y:', scrollY); // Debug log
      
      // Detect device type based on screen size
      const isSmallMobile = vw < 480;  // Small phones
      const isMobile = vw < 768;        // Regular phones
      const isTablet = vw >= 768 && vw < 1024;  // Tablets & Z Fold unfolded
      const isDesktop = vw >= 1024;
      
      // Set responsive size
      if (isSmallMobile) {
        setSize(320);
      } else if (isMobile) {
        setSize(400);
      } else if (isTablet) {
        setSize(550);
      } else {
        setSize(720);
      }
      
      // Adjust scroll range based on device - move quickly
      let scrollRange = 150;
      if (isSmallMobile) scrollRange = 80;
      else if (isMobile) scrollRange = 100;
      else if (isTablet) scrollRange = 120;
      
      let progress = scrollY / scrollRange;
      progress = Math.min(1, Math.max(0, progress));

      // Opacity fade effect - fade out in middle, fade in from right
      let newOpacity = 1;
      if (progress < 0.4) {
        // First 40% - fade out
        newOpacity = 1 - (progress / 0.4);
      } else if (progress >= 0.4 && progress < 0.6) {
        // Middle 20% - completely invisible
        newOpacity = 0;
      } else {
        // Last 40% - fade in from right
        newOpacity = (progress - 0.6) / 0.4;
      }
      setOpacity(newOpacity);

      // Animation in two phases:
      // Phase 1 (0-0.5): Flower moves DOWN and fades out
      // Phase 2 (0.5-1): Flower appears from RIGHT side and moves to final position
      
      let newX = 0;
      let newY = 0;
      
      if (progress < 0.5) {
        // Phase 1: Move down only (no horizontal movement)
        newX = 0;
        newY = (progress / 0.5) * vh * 0.3; // Move down by 30% of viewport height
      } else {
        // Phase 2: Come from right side
        const phase2Progress = (progress - 0.5) / 0.5;
        
        // Start from right side and move to final position
        let finalX;
        if (isSmallMobile) {
          finalX = vw * 0.5;  // Final position at right edge
        } else if (isMobile) {
          finalX = vw * 0.5;
        } else if (isTablet) {
          finalX = vw * 0.5;
        } else {
          finalX = vw * 0.5;
        }
        
        // Start from further right (off-screen) and move to final position
        const startX = vw * 0.8; // Start 80% off to the right
        newX = startX - (startX - finalX) * phase2Progress;
        
        // Final Y position
        let finalY;
        if (isSmallMobile) {
          finalY = -vh * 0.5;
        } else if (isMobile) {
          finalY = -vh * 0.5;
        } else if (isTablet) {
          finalY = -vh * 0.5;
        } else {
          finalY = -vh * 0.5;
        }
        
        newY = finalY * phase2Progress;
      } 

      // Scale down
      const initialScale = 1;
      let finalScale;
      if (isSmallMobile) {
        finalScale = 0.4;
      } else if (isMobile) {
        finalScale = 0.45;
      } else if (isTablet) {
        finalScale = 0.5;
      } else {
        finalScale = 0.55;
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
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePosition);
    
    // Initial position
    updatePosition();
    
    // Also run on interval to catch any missed scrolls
    const interval = setInterval(updatePosition, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
      clearInterval(interval);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className="z-[8] drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-none"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: `${size}px`,
        height: `${size}px`,
        transform,
        opacity,
        transition: 'opacity 0.3s ease-out'
      }}
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
