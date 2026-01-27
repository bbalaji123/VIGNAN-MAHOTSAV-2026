import React, { useMemo } from 'react';
import './gallery.css';

export const galleryImages: string[] = [
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584667/DSC02791_zik0lk.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584668/DSC08105_drjm46.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584665/DSC03380_p16fih.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584664/DSC03545_usezzd.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584664/DSC04008_uukrul.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584665/IMG-20250610-WA0075_zznxhl.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584664/IMG-20250610-WA0061_sephhr.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584662/IMG-20250128-WA0179_mvx5dd.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584658/DSC00450_a41xyk.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584657/DSC_0952_xk4xhm.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584654/DSC_9968_fbcwel.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584648/DSC02701_yxqlnj.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584648/DSC_0325_yqz3yi.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584646/concert_yp9sqs.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584645/DSC_7978_zmktxx.avif',
  'https://res.cloudinary.com/dwvdzxefs/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768584643/_MR16501_qyohly.avif'
];

interface GalleryProps {
  onPhotoClick: (row: number, index: number) => void;
  registerSection: (id: string, element: HTMLElement | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onPhotoClick, registerSection }) => {

  const rows = useMemo(() => [
    galleryImages.slice(0, 6),
    galleryImages.slice(6, 12),
    galleryImages.slice(12, 18)
  ], []);

  return (
    <section
      ref={(el) => registerSection('throwbacks', el)}
      data-section-id="throwbacks"
      className="gallery-section"
    >
      <h2 className="gallery-title">Gallery</h2>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row-wrapper">
          <div
            className={`scroll-row run row-${rowIndex}`}
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
                  width={280}
                  height={180}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default React.memo(Gallery);
