import React, { useEffect, useRef, useState } from 'react';
import './gallery.css';

export const galleryImages: string[] = [
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766933328/DSC01155_yultaq.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766933328/DSC01072_xil4ty.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932916/DSC08105_gpb6tg.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932915/DSC03380_lqa6u0.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932915/IMG-20250610-WA0061_ko72ug.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932914/IMG-20250610-WA0075_ypd1bu.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932913/DSC03545_ugwkr3.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932912/DSC02791_jkmmws.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932911/IMG-20250128-WA0179_ok9p6v.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932910/DSC04008_vuknzg.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932905/DSC_9968_g29nm5.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932899/DSC02701_uqie1e.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932895/concert_vjazjt.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932895/DSC_0952_zlc0qh.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932895/DSC_7978_owb92w.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932888/_MR16501_mxeguw.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932887/DSC_0325_sczuxh.avif',
  'https://res.cloudinary.com/dctuev0mm/image/upload/v1766932886/DSC00450_rqlgbm.avif'
];

interface GalleryProps {
  onPhotoClick: (row: number, index: number) => void;
  registerSection: (id: string, element: HTMLElement | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onPhotoClick, registerSection }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
            {[...row, ...row, ...row].map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="throwback-card"
                onClick={() => onPhotoClick(rowIndex, index % row.length)}
              >
                <img
                  src={img}
                  alt="gallery"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Gallery;
