import React from 'react';

interface LotusFlowerProps {
  position: 'top-right' | 'bottom-left';
  size?: number;
}

const LotusFlower: React.FC<LotusFlowerProps> = ({ position, size = 800 }) => {
  const positionClasses = position === 'top-right' 
    ? '-top-64 -right-64' 
    : '-bottom-64 -left-64';

  return (
    <div 
      className={`fixed ${positionClasses} pointer-events-none`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        opacity: 0.25,
        zIndex: 1
      }}
    >
      <div className="animate-spin-slow" style={{ animation: 'spin-slow 120s linear infinite', width: '100%', height: '100%' }}>
        <svg 
          viewBox="0 0 400 400" 
          width={size} 
          height={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(200, 200)">
            {/* Outer Layer - 12 petals */}
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={`outer-${i}`}
                rx="50"
                ry="120"
                fill="rgba(236, 72, 153, 0.5)"
                stroke="rgba(219, 39, 119, 0.3)"
                strokeWidth="1"
                transform={`rotate(${i * 30})`}
              />
            ))}

            {/* Middle Layer - 12 petals, rotated 15° */}
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={`middle-${i}`}
                rx="40"
                ry="90"
                fill="rgba(219, 39, 119, 0.6)"
                stroke="rgba(190, 24, 93, 0.4)"
                strokeWidth="1"
                transform={`rotate(${i * 30 + 15})`}
              />
            ))}

            {/* Inner Layer - 8 petals */}
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={`inner-${i}`}
                rx="30"
                ry="60"
                fill="rgba(190, 24, 93, 0.7)"
                stroke="rgba(157, 23, 77, 0.5)"
                strokeWidth="1"
                transform={`rotate(${i * 45})`}
              />
            ))}

            {/* Center - Three concentric circles */}
            <circle
              r="35"
              fill="rgba(251, 191, 36, 1)"
              stroke="rgba(245, 158, 11, 0.5)"
              strokeWidth="1"
            />
            <circle
              r="25"
              fill="rgba(252, 211, 77, 1)"
              stroke="rgba(251, 191, 36, 0.5)"
              strokeWidth="1"
            />
            <circle
              r="15"
              fill="rgba(253, 224, 71, 1)"
              stroke="rgba(252, 211, 77, 0.5)"
              strokeWidth="1"
            />

            {/* Decorative dots around center */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = Math.cos(angle) * 20;
              const y = Math.sin(angle) * 20;
              return (
                <circle
                  key={`dot-${i}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="rgba(245, 158, 11, 1)"
                />
              );
            })}
          </g>
        </svg>
      </div>

      <style>
        {`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LotusFlower;
