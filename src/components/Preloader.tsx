import React, { useState, useEffect } from 'react';

interface PreloaderProps {
    onFinish?: () => void;
    isLoading: boolean;
    /**
     * Maximum time (ms) the preloader should remain visible
     * even if `isLoading` never flips to false due to network
     * or chunk loading issues. Defaults to 8000ms.
     */
    maxWaitMs?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish, isLoading, maxWaitMs = 8000 }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setLoadingPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Increment by random amount for realistic feel
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Auto-dismiss safeguard after maxWaitMs in case chunks fail under poor networks
        const timeout = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsVisible(false);
                onFinish?.();
            }, 500); // Wait for fade-out animation
        }, maxWaitMs);
        
        return () => clearTimeout(timeout);
    }, [maxWaitMs, onFinish]);

    useEffect(() => {
        // Close preloader when both loading complete and percentage at 100%
        if (loadingPercentage >= 100 && !isLoading && !isFadingOut) {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsVisible(false);
                onFinish?.();
            }, 500); // Wait for fade-out animation
        }
    }, [loadingPercentage, isLoading, isFadingOut, onFinish]);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'opacity 0.5s ease-out',
                opacity: isFadingOut ? 0 : 1,
                pointerEvents: isFadingOut ? 'none' : 'auto'
            }}
        >
            {/* Animated Logo/Spinner */}
            <div style={{
                width: '120px',
                height: '120px',
                border: '8px solid rgba(255, 255, 255, 0.1)',
                borderTop: '8px solid #fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '30px'
            }}></div>

            {/* Mahotsav Title */}
            <h1 style={{
                color: '#fff',
                fontSize: window.innerWidth <= 768 ? '2rem' : '3rem',
                fontWeight: '700',
                marginBottom: '20px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif'
            }}>
                MAHOTSAV
            </h1>

            {/* Loading Text */}
            <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem',
                marginBottom: '30px',
                fontFamily: 'Arial, sans-serif'
            }}>
                Loading Experience
            </p>

            {/* Percentage */}
            <div style={{
                color: '#fff',
                fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif'
            }}>
                {Math.floor(loadingPercentage)}%
            </div>

            {/* Progress Bar */}
            <div style={{
                width: window.innerWidth <= 768 ? '80%' : '400px',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                marginTop: '20px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${loadingPercentage}%`,
                    height: '100%',
                    backgroundColor: '#fff',
                    transition: 'width 0.3s ease',
                    borderRadius: '2px'
                }}></div>
            </div>

            {/* CSS Animation */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
