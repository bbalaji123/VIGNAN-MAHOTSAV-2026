import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
    onFinish?: () => void;
    isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish, isLoading }) => {
    const [currentFrame, setCurrentFrame] = useState(1);
    const totalFrames = 254;
    const requestRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const [isVisible, setIsVisible] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    // Use refs to access latest state inside requestAnimationFrame callback
    const isLoadingRef = useRef(isLoading);
    const hasCompletedLoopRef = useRef(false);
    const percentageStartTimeRef = useRef<number>(0);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    // Preload first few frames to ensure they exist
    useEffect(() => {
        const basePath = import.meta.env.BASE_URL || '/';
        const testFrames = [1, 2, 3, 254];
        
        testFrames.forEach((frameNum) => {
            const padded = frameNum.toString().padStart(3, '0');
            const img = new Image();
            img.onload = () => {
                setLoadedImages(prev => new Set([...prev, frameNum]));
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${frameNum}: ${basePath}pre-loader/ezgif-frame-${padded}.jpg`);
                setImageError(true);
            };
            img.src = `${basePath}pre-loader/ezgif-frame-${padded}.jpg`;
        });
    }, []);

    const animate = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const progress = time - startTimeRef.current;

        // Aim for 30fps = 33.33ms per frame
        const frameIndex = Math.floor(progress / 33.33) + 1;

        if (frameIndex <= totalFrames) {
            setCurrentFrame(frameIndex);

            // Show percentage on last frame
            if (frameIndex === totalFrames && !showPercentage) {
                setShowPercentage(true);
                percentageStartTimeRef.current = time;
            }

            requestRef.current = requestAnimationFrame(animate);
        } else {
            // One loop finished
            hasCompletedLoopRef.current = true;

            // If showing percentage, animate it to 100%
            if (showPercentage) {
                const percentageProgress = time - percentageStartTimeRef.current;
                const percentageDuration = 2000; // 2 seconds to reach 100%
                const percentage = Math.min(100, Math.floor((percentageProgress / percentageDuration) * 100));
                setLoadingPercentage(percentage);

                // Check if we can stop now (percentage at 100% and loading complete)
                if (percentage >= 100 && !isLoadingRef.current) {
                    // Stop animation and finish
                    setIsVisible(false);
                    if (onFinish) onFinish();
                    return;
                }

                requestRef.current = requestAnimationFrame(animate);
            } else {
                // Check if we can stop now
                if (!isLoadingRef.current) {
                    // Stop animation and finish
                    setIsVisible(false);
                    if (onFinish) onFinish();
                    return;
                }

                // Otherwise loop again
                startTimeRef.current = time;
                setCurrentFrame(1);
                requestRef.current = requestAnimationFrame(animate);
            }
        }
    };

    useEffect(() => {
        if (loadedImages.size === 0) return; // Wait for at least one image to load
        
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedImages.size]);
    // Dependency array empty to start animation once.
    // Logic inside checks loading state via ref.

    if (!isVisible) return null;

    // Format frame number to 3 digits (e.g., 001, 010, 100)
    const getFramePath = (frame: number) => {
        const padded = frame.toString().padStart(3, '0');
        const basePath = import.meta.env.BASE_URL || '/';
        return `${basePath}pre-loader/ezgif-frame-${padded}.jpg`;
    };

    const isMobile = window.innerWidth <= 768;

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
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'opacity 0.5s ease-out',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                flexDirection: 'column'
            }}
        >
            {imageError && (
                <div style={{
                    color: '#fff',
                    fontSize: '1rem',
                    marginBottom: '20px',
                    textAlign: 'center',
                    padding: '0 20px'
                }}>
                    Loading assets... Please wait
                </div>
            )}
            <div style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? 'auto' : '100%',
                aspectRatio: isMobile ? '16 / 9' : 'auto',
                maxHeight: isMobile ? '100vh' : '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img
                    src={getFramePath(currentFrame)}
                    alt="Loading..."
                    onError={(e) => {
                        console.error('Image load error for frame:', currentFrame);
                        setImageError(true);
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: currentFrame >= 191 ? 'contain' : 'cover',
                        borderRadius: '0'
                    }}
                />
                {showPercentage && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: isMobile ? '5%' : '10%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#fff',
                            fontSize: window.innerWidth <= 480 ? '1.5rem' : window.innerWidth <= 768 ? '1.75rem' : '2rem',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px rgba(0,0,0,0.8)',
                            fontFamily: 'Arial, sans-serif',
                            textAlign: 'center',
                            padding: '0 10px'
                        }}
                    >
                        {loadingPercentage}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preloader;
