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
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Use refs to access latest state inside requestAnimationFrame callback
    const isLoadingRef = useRef(isLoading);
    const hasCompletedLoopRef = useRef(false);
    const percentageStartTimeRef = useRef<number>(0);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    // Preload critical frames for smoother playback
    useEffect(() => {
        const basePath = import.meta.env.BASE_URL || '/';
        const imagesToPreload: string[] = [];
        
        // Preload first 30 frames and last 10 frames for smooth start/end
        for (let i = 1; i <= 30; i++) {
            const padded = i.toString().padStart(3, '0');
            imagesToPreload.push(`${basePath}pre-loader/ezgif-frame-${padded}.jpg`);
        }
        for (let i = 245; i <= 254; i++) {
            const padded = i.toString().padStart(3, '0');
            imagesToPreload.push(`${basePath}pre-loader/ezgif-frame-${padded}.jpg`);
        }

        let loadedCount = 0;
        const totalToLoad = imagesToPreload.length;

        imagesToPreload.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load preloader image: ${src}`);
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    setImagesLoaded(true);
                }
            };
            img.src = src;
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
        if (!imagesLoaded) return; // Wait for images to load before starting animation
        
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesLoaded]);
    // Dependency array empty to start animation once.
    // Logic inside checks loading state via ref.

    if (!isVisible) return null;

    // Format frame number to 3 digits (e.g., 001, 010, 100)
    const getFramePath = (frame: number) => {
        const padded = frame.toString().padStart(3, '0');
        const basePath = import.meta.env.BASE_URL || '/';
        return `${basePath}pre-loader/ezgif-frame-${padded}.jpg`;
    };

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
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            {!imagesLoaded ? (
                <div style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '20px' }}>Loading...</div>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '5px solid rgba(255,255,255,0.3)',
                        borderTop: '5px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}></div>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : (
                <>
                    <img
                        src={getFramePath(currentFrame)}
                        alt="Loading..."
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: currentFrame >= 191 ? 'contain' : 'cover',
                            maxWidth: currentFrame >= 191 ? '90vw' : '100%',
                            maxHeight: currentFrame >= 191 ? '90vh' : '100%'
                        }}
                    />
                    {showPercentage && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#fff',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                textShadow: '0 0 10px rgba(0,0,0,0.8)',
                                fontFamily: 'Arial, sans-serif'
                            }}
                        >
                            {loadingPercentage}%
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Preloader;
