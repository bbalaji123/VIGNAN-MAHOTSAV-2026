import React, { useMemo } from 'react';
import './gallery.css';

export const galleryImages: string[] = [
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357485/DSC02791_jkmmws_p7dbgn.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357480/DSC_9968_g29nm5_fx991y.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357478/DSC02701_uqie1e_inx8bz.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357476/DSC_0952_zlc0qh_gzempw.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357474/DSC00450_rqlgbm_nab3ru.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357470/DSC01155_yultaq_nk3uaw.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357469/DSC01072_xil4ty_exesb0.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357468/DSC_7978_owb92w_pwnmen.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357466/_MR16501_mxeguw_e9to6g.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357465/DSC_0325_sczuxh_d8n9ah.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357461/DSC03380_lqa6u0_d6orml.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357460/concert_vjazjt_hup7pf.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357459/DSC04008_vuknzg_nivfsg.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357457/DSC08105_gpb6tg_mq9ykk.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357449/IMG-20250610-WA0075_ypd1bu_anexxt.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357449/IMG-20250128-WA0179_ok9p6v_kxe9oq.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357447/IMG-20250610-WA0061_ko72ug_b2amfo.avif',
  'https://res.cloudinary.com/dffldabvf/image/upload/w_280,h_180,c_fill,f_auto,q_auto/v1768357447/DSC03545_ugwkr3_dzcmba.avif'
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
                  loading="eager"
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
