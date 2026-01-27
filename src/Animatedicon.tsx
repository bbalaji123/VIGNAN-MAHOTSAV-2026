import React, { useRef, useEffect, useState } from 'react';

interface AnimatedIconProps {
  visible?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ visible = true }) => {
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

      // Detect device type based on screen HEIGHT or WIDTH
      const isSmallScreen = vh < 601 || vw < 450;  // Below 601px HEIGHT or 450px WIDTH
      // Specific laptop viewport (e.g., 1349x657) should use a slightly smaller hero flower
      const isMediumLaptop = vw >= 1280 && vw <= 1366 && vh >= 640 && vh <= 700;

      // Set responsive size based on screen dimensions
      let newSize;
      if (isSmallScreen) {
        newSize = 320;  // Smaller size for small screens
      } else if (isMediumLaptop) {
        newSize = 640;  // Slightly smaller for 1280-1366 x 640-700 viewports
      } else {
        newSize = 720;  // Larger size for larger screens
      }

      setSize(newSize);

      // Adjust scroll range based on device
      const scrollRange = isSmallScreen ? 80 : 150;

      let progress = scrollY / scrollRange;
      progress = Math.min(1, Math.max(0, progress));

      // Opacity fade effect - fade out in middle, fade in from right with full opacity
      let newOpacity = 1;
      if (progress < 0.4) {
        // First 40% - fade out
        newOpacity = 1 - (progress / 0.4);
      } else if (progress >= 0.4 && progress < 0.6) {
        // Middle 20% - completely invisible
        newOpacity = 0;
      } else {
        // Last 40% - fade in from right with full opacity
        newOpacity = ((progress - 0.6) / 0.4) * 1;
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
        const finalX = vw * 0.5;  // Final position at right edge for all screen sizes

        // Start from further right (off-screen) and move to final position
        const startX = vw * 0.8; // Start 80% off to the right
        newX = startX - (startX - finalX) * phase2Progress;

        // Final Y position
        const finalY = -vh * 0.5;  // Same for all screen sizes

        newY = finalY * phase2Progress;
      }

      // Scale down
      const initialScale = 1;
      const finalScale = isSmallScreen ? 0.4 : (isMediumLaptop ? 0.5 : 0.55);  // Slightly smaller for medium laptops
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

  // Don't render at all if not visible
  if (!visible) {
    return null;
  }

  return (
    <div
      key={`flower-${size}`}
      ref={iconRef}
      className="drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-none animated-hero-flower"
      style={{
        position: 'fixed',
        bottom: '1px',
        left: '50%',
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        transform,
        opacity: visible ? opacity : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease-out',
        display: visible ? 'block' : 'none',
        zIndex: 5
      }}
    >
      {/* 
        FIXED POSITION DECORATIVE ELEMENT
        - SVG used ONLY as positioning container for PNG assets
        - Transform origin locked at exact center (500, 500) to prevent drift
        - No translateX/translateY in animations to keep position stable
      */}
      <svg
        viewBox="0 0 1000 1000"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          inset: 0
        }}
      >
        {/* 
          PETALS GROUP (ANTI-CLOCKWISE)
          - Rotates anti-clockwise independently
          - Transform origin set to 500,500 in SVG coordinates (exact center)
        */}
        <g
          style={{
            animation: 'rotateAntiClockwise 40s linear infinite',
            transformOrigin: '500px 500px',
            transformBox: 'view-box'
          }}
        >
          {/* Petals (back layer, rotating anti-clockwise) */}
          <image
            x="0"
            y="0"
            width="1000"
            height="1000"
            href="/menu-dashboard/petals.avif"
          />
        </g>

        {/* 
          SUN GROUP (CLOCKWISE)
          - Rotates clockwise independently from petals
          - Transform origin set to 500,500 in SVG coordinates (same center as petals)
        */}
        <g
          style={{
            animation: 'rotateClockwise 20s linear infinite',
            transformOrigin: '500px 500px',
            transformBox: 'view-box'
          }}
        >
          {/* Sun (middle layer, rotating clockwise) */}
          <image
            x="340"
            y="340"
            width="320"
            height="320"
            href="/menu-dashboard/sun.avif"
          />
        </g>

        {/* 
          STATIC MOON (CRITICAL)
          - Placed OUTSIDE the rotating <g> so it does NOT inherit rotation
          - Centered over the sun to create eclipse effect
          - No animation, no transform, completely static
        */}
        <image
          x="360"
          y="360"
          width="280"
          height="280"
          href="/menu-dashboard/moon.avif"
          style={{ zIndex: 10 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedIcon;
