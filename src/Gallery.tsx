import React, { useEffect, useRef, useState } from 'react';
import './gallery.css';

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
  const row1 = galleryImages.slice(0, 6);
  const row2 = galleryImages.slice(6, 12);
  const row3 = galleryImages.slice(12, 18);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  // Start animation ONLY when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        registerSection('throwbacks', el);
      }}
      data-section-id="throwbacks"
      style={{
        position: 'relative',
        padding: '120px 20px 80px',
        overflow: 'hidden'
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: 'bold',
          color: '#fdee71',
          marginBottom: '80px',
          textAlign: 'center',
          fontFamily: 'Woodtrap, sans-serif'
        }}
      >
        Gallery
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* ROW 1 */}
        <div style={{ overflow: 'hidden' }}>
          <div className={`scroll-row ${!animate ? 'scroll-paused' : ''}`}>
            {[...row1, ...row1].map((img, i) => {
              const index = i % row1.length;
              return (
                <div
                  key={i}
                  className="throwback-card"
                  onClick={() => onPhotoClick(1, index)}
                  style={{
                    border: `3px solid ${['#FFD700','#FF69B4','#00FFFF','#8B2BE2','#32CD32','#FFD700'][index % 6]}`,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}gallery/WEBSITES IMAGES AVIF/${img}`}
                    alt="gallery"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    width={280}
                    height={180}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',display: 'block', borderRadius: 'inherit' }}
                    />

                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2 */}
        <div style={{ overflow: 'hidden' }}>
          <div className={`scroll-row scroll-row-2 ${!animate ? 'scroll-paused' : ''}`}>
            
            {[...row2, ...row2].map((img, i) => {
              const index = i % row2.length;
              const global = row1.length + index;
              return (
                <div
                  key={i}
                  className="throwback-card"
                  onClick={() => onPhotoClick(2, global)}
                  style={{
                    border: `3px solid ${['#FF7F50','#9370DB','#FFD700','#00BFFF','#FF1493','#FF7F50'][index % 6]}`,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}gallery/WEBSITES IMAGES AVIF/${img}`}
                    alt="gallery"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    width={280}
                    height={180}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',display: 'block', borderRadius: 'inherit' }}
                    />

                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3 */}
        <div style={{ overflow: 'hidden' }}>
          <div className={`scroll-row scroll-row-3 ${!animate ? 'scroll-paused' : ''}`}>
            {[...row3, ...row3].map((img, i) => {
              const index = i % row3.length;
              const global = row1.length + row2.length + index;
              return (
                <div
                  key={i}
                  className="throwback-card"
                  onClick={() => onPhotoClick(3, global)}
                  style={{
                    border: `3px solid ${['#DAA520','#8B2BE2','#00FFFF','#FF69B4','#32CD32','#DAA520'][index % 6]}`,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}gallery/WEBSITES IMAGES AVIF/${img}`}
                    alt="gallery"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    width={280}
                    height={180}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
                    />

                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: '60px',
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          fontStyle: 'italic'
        }}
      >
        Hover to pause • Swipe through memories
      </p>
    </section>
  );
};

export default Gallery;
