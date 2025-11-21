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

    // --- Dynamic Final Transform Calculations ---
    
    // 1. Movement X: Move icon to right edge with exactly half visible
    const finalX = window.innerWidth * 0.5; // Position so exactly half the flower is visible
    const newX = progress * finalX;

    // 2. Movement Y: Move to exact middle of screen vertically
    const finalY = -window.innerHeight * 0.5; // Exact middle of screen (0% offset)
    const newY = progress * finalY; 

    // 3. Scaling: Increase size instead of shrinking
    const initialScale = 1;
    const finalScale = 0.6; // Larger final size (60% instead of 30%)
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
