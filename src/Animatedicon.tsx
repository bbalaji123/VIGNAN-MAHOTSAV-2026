import React, { useRef, useEffect, useState } from 'react';

interface AnimatedIconProps {
  iconSrc: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ iconSrc }) => {
  const [translateAmount, setTranslateAmount] = useState('translate(-50%, 50%)');
  const [rotation, setRotation] = useState(0);
  const iconRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Continuous rotation animation with dynamic speed based on movement
  const animateRotation = () => {
    const scrollY = window.scrollY;
    const scrollRange = 500; // Animation completes after 500px of scroll
    
    // Calculate scroll progress (0 to 1)
    let progress = scrollY / scrollRange;
    progress = Math.min(1, Math.max(0, progress)); // Clamp between 0 and 1
    
    // Dynamic rotation speed based on movement state
    const slowSpeed = 0.2; // Initial slow rotation speed (when not moving)
    const fastSpeed = 1.5; // Increased rotation speed while moving
    
    // Increase speed only while moving (progress > 0 and < 1)
    // Slow when stationary (progress = 0 or progress = 1)
    const isMoving = progress > 0 && progress < 1;
    const rotationSpeed = isMoving ? fastSpeed : slowSpeed;
    
    setRotation(prev => (prev + rotationSpeed) % 360);
    animationRef.current = requestAnimationFrame(animateRotation);
  };

  const handleScroll = () => {
    if (!iconRef.current) return;
    
    const scrollY = window.scrollY;
    const scrollRange = 500; // Animation completes after 500px of scroll
    
    // Calculate scroll progress (0 to 1)
    let progress = scrollY / scrollRange;
    progress = Math.min(1, Math.max(0, progress)); // Clamp between 0 and 1

    // Check for specific mobile resolution 360x740
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile360 = (vw >= 350 && vw <= 370) && (vh >= 730 && vh <= 750);

    // --- Dynamic Final Transform Calculations ---
    
    // 1. Movement X: Adjust specifically for 360x740 mobile
    let finalX = window.innerWidth * 0.5; // Default behavior for all other dimensions
    if (isMobile360) {
      finalX = window.innerWidth * 0.35; // Optimized movement for 360px width
    }
    const newX = progress * finalX;

    // 2. Movement Y: Adjust specifically for 360x740 mobile
    let finalY = -window.innerHeight * 0.5; // Default behavior for all other dimensions
    if (isMobile360) {
      finalY = -window.innerHeight * 0.35; // Optimized vertical movement for 740px height
    }
    const newY = progress * finalY; 

    // 3. Scaling: Adjust specifically for 360x740 mobile
    const initialScale = 1;
    let finalScale = 0.6; // Default behavior for all other dimensions
    if (isMobile360) {
      finalScale = 0.7; // Optimized scaling for 360x740 screen
    }
    const scaleDiff = initialScale - finalScale;
    const newScale = initialScale - (progress * scaleDiff); 
    
    // Apply transformations (position and scale only, rotation is separate)
    setTranslateAmount(
      `translate(-50%, 50%) translateX(${newX}px) translateY(${newY}px) scale(${newScale})`
    );
  };

  useEffect(() => {
    // Start continuous rotation
    animationRef.current = requestAnimationFrame(animateRotation);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className="animated-icon-container"
      style={{ transform: translateAmount }}
    >
      <img
        src={iconSrc} 
        alt="Lotus Icon"
        className="animated-icon-image"
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
};

export default AnimatedIcon;
