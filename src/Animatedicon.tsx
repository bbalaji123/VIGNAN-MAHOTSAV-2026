import React, { useRef, useEffect, useState } from 'react';
import './Animatedicon.css';

interface AnimatedIconProps {
  iconSrc: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ iconSrc }) => {
  const [translateAmount, setTranslateAmount] = useState('translate(-50%, -50%)');
  const [rotation, setRotation] = useState(0);
  const iconRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Continuous rotation animation (independent of scroll)
  const animateRotation = () => {
    setRotation(prev => (prev + 0.3) % 360); // Much slower rotation - reduced to 0.2 degrees per frame
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
    
    // 1. Movement X: Move icon to far right edge of screen
    const finalX = window.innerWidth * 0.47; // Move to far right edge
    const newX = progress * finalX;

    // 2. Movement Y: Move upward to middle area
    const finalY = -window.innerHeight * 0.4; // Move up by 40% of viewport height
    const newY = progress * finalY; 

    // 3. Scaling: Increase size instead of shrinking
    const initialScale = 1;
    const finalScale = 0.6; // Larger final size (60% instead of 30%)
    const scaleDiff = initialScale - finalScale;
    const newScale = initialScale - (progress * scaleDiff); 
    
    // Apply transformations (position and scale only, rotation is separate)
    setTranslateAmount(
      `translate(-50%, -50%) translateX(${newX}px) translateY(${newY}px) scale(${newScale})`
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
      className="main-lotus-icon"
      style={{ transform: translateAmount }}
    >
      <img
        src={iconSrc} 
        alt="Lotus Icon"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
};

export default AnimatedIcon;
