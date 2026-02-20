import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Collaboration: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleBackClick = () => {
    navigate('/?menu=true');
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Floating Flower - Top Right */}
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-1000">
        <FlowerComponent
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      {/* Floating Flower - Bottom Left */}
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-1000 ">
        <FlowerComponent
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      <style>
        {`
          .flower-container-mobile {
            width: 500px;
            height: 500px;
            position: fixed;
            overflow: visible;
          }
          
          .flower-inner {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .flower-container-mobile:first-of-type .flower-inner {
            top: -50%;
            right: -50%;
          }
          
          .flower-container-mobile:nth-of-type(2) .flower-inner {
            bottom: -50%;
            left: -50%;
          }
          
          @keyframes petalsRotateAnticlockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          
          @keyframes sunRotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .collaboration-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 80vh;
            padding: 2rem;
            padding-top: 6rem;
          }

          .collaboration-title {
            font-size: 3.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
            font-family: 'Aladin', cursive !important;
          }

          .year-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            justify-content: center;
          }

          .year-tab {
            padding: 1rem 2.5rem;
          
            background: rgba(255, 182, 193, 0.6);
            color: white;
            font-size: 1.5rem;
            aspect-ratio: 16 / 9;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Aladin', cursive;
          }

          .year-tab:hover {
            background: rgba(255, 182, 193, 0.8);
            transform: scale(1.05);
          }

          .year-tab.active {
            background: rgba(255, 182, 193, 1);
            box-shadow: 0 5px 20px rgba(255, 182, 193, 0.5);
          }

          .media-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto 3rem;
            background: linear-gradient(180deg, rgba(255, 182, 193, 0.3) 0%, rgba(253, 238, 113, 0.3) 100%);
            border: 3px solid rgba(59, 130, 246, 0.5);
            
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .photo-frame {
            width: 100%;
            aspect-ratio: 16 / 9;
            background: linear-gradient(180deg, #FFB6C1 0%, #FFF 30%, #FFE97F 70%, #90EE90 100%);
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .audio-player {
            width: 100%;
            margin-top: 1rem;
            overflow: hidden;
          }

          .collaboration-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
            padding: 0 1rem;
          }

          .collaboration-image-card {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
            background: rgba(0, 0, 0, 0.2);
          }

          .collaboration-image-card:nth-child(1) { animation-delay: 0.1s; }
          .collaboration-image-card:nth-child(2) { animation-delay: 0.2s; }
          .collaboration-image-card:nth-child(3) { animation-delay: 0.3s; }
          .collaboration-image-card:nth-child(4) { animation-delay: 0.4s; }
          .collaboration-image-card:nth-child(5) { animation-delay: 0.5s; }
          .collaboration-image-card:nth-child(6) { animation-delay: 0.6s; }
          .collaboration-image-card:nth-child(7) { animation-delay: 0.7s; }
          .collaboration-image-card:nth-child(8) { animation-delay: 0.8s; }
          .collaboration-image-card:nth-child(n+9) { animation-delay: 0.9s; }

          .collaboration-image-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
          }

          .collaboration-image-card img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
          }

          .collaboration-subtitle {
            font-size: 2.5rem;
            font-weight: 600;
            text-align: center;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.3s;
            font-family: 'Aladin', cursive !important;
          }

          .collaboration-text {
            font-size: 1.5rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.5s;
            font-family: 'Aladin', cursive !important;
          }

          .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(251, 191, 36, 0.6);
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="collaboration-content">
        <h1 className="collaboration-title">COLLABORATION</h1>

        <div className="collaboration-grid">
          {[
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357355/3_dvfsut_hlfsxo.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357356/4_w9ppck_duhmv3.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357355/5_sinxan_edxznc.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357357/6_cuyhzg_mkovqw.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357357/7_fhojic_umygyu.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357357/8_onyr5b_pbawi8.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357358/9_uev3pg_vhv38s.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357361/10_wni4f6_fus9jn.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357361/11_q25rha_a9mdts.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357361/12_vslte5_ip1yzn.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357362/13_qkox2a_nhyjut.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357361/14_q6kzto_d6jmet.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357362/15_voez03_bmwgp9.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357362/16_wnub7p_lvkkde.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357367/17_atxyzf_zwpu6z.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357368/18_qg24n9_z2lylt.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357368/19_meotku_b1juwu.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357368/20_o9gjwx_r2beuj.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357369/21_z7jcol_o2jvjh.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357379/22_fhnvbe_ehd82r.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357371/23_mviqwn_txbimh.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357371/25_bif5nv_xale8z.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357372/24_pziuis_jpluai.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357360/26_mr4ydh_w8fq7z.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357359/28_yulk3k_ef40ec.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357360/29_o6tbis_gzgdsu.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357360/30_mwqfbc_ypurys.avif',
            'https://res.cloudinary.com/dffldabvf/image/upload/w_800,f_auto,q_auto/v1768357360/32_nmftpg_yusibk.avif'
          ].map((url, index) => (
            <div key={index} className="collaboration-image-card" onClick={() => handleImageClick(url)} style={{ cursor: 'pointer' }}>
              <img
                src={url}
                alt={`Collaboration ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            cursor: 'pointer'
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontSize: '1.5rem',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10000,
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: window.innerWidth <= 768 ? '95%' : '85%',
              maxHeight: window.innerWidth <= 768 ? '98%' : '85%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              cursor: 'default',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Collaboration);
