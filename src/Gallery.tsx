import React, { useEffect, useRef, useState } from 'react';
import './gallery.css';

/* ✅ EXPORT FIX (for Dashboard.tsx import) */
export const galleryImages: string[] = [
  'concert.avif',
  'DSC00450.avif',
  'DSC01072.avif',
  'DSC01155.avif',
  'DSC02701.avif',
  'DSC02791.avif',
  'DSC03380.avif',
  'DSC03545.avif',
  'DSC04008.avif',
  'DSC08105.avif',
  'DSC_0325.avif',
  'DSC_0952.avif',
  'DSC_7978.avif',
  'DSC_9968.avif',
  'IMG-20250128-WA0179.avif',
  'IMG-20250610-WA0061.avif',
  'IMG-20250610-WA0075.avif',
  '_MR16501.avif'
];

interface GalleryProps {
  onPhotoClick: (row: number, index: number) => void;
  registerSection: (id: string, element: HTMLElement | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onPhotoClick, registerSection }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const interactionTimer = useRef<number | null>(null);

  /* ▶ Start animation only when section is visible */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ⏸ Pause animation on user interaction */
  useEffect(() => {
    const pauseAnimation = () => {
      setAnimate(false);
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
      interactionTimer.current = window.setTimeout(() => {
        setAnimate(true);
      }, 300);
    };

    window.addEventListener('scroll', pauseAnimation, { passive: true });
    window.addEventListener('keydown', pauseAnimation);
    window.addEventListener('pointerdown', pauseAnimation);

    return () => {
      window.removeEventListener('scroll', pauseAnimation);
      window.removeEventListener('keydown', pauseAnimation);
      window.removeEventListener('pointerdown', pauseAnimation);
    };
  }, []);

  const rows = [
    galleryImages.slice(0, 6),
    galleryImages.slice(6, 12),
    galleryImages.slice(12, 18)
  ];

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        registerSection('throwbacks', el);
      }}
      data-section-id="throwbacks"
      className="gallery-section"
    >
      <h2 className="gallery-title">Gallery</h2>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row-wrapper">
          <div
            className={`scroll-row ${animate ? 'run' : 'paused'} row-${rowIndex}`}
          >
            {row.map((img, index) => (
              <div 
                key={img} 
                className="throwback-card"
                onClick={() => onPhotoClick(rowIndex, index)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}gallery/WEBSITES IMAGES AVIF/${img}`}
                  alt="gallery"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={280}
                  height={180}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="gallery-hint">
        Scroll / key / touch pauses animation • resumes automatically
      </p>
    </section>
  );
};

export default Gallery;
