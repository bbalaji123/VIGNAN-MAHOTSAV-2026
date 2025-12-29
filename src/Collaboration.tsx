import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Collaboration: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
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
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-1000 z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-1000 z-[1]">
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
          
          @media (max-width: 768px) {
            .flower-container-mobile {
              width: 300px;
              height: 300px;
            }
            
            .flower-container-mobile:first-of-type .flower-inner {
              top: -40%;
              right: -40%;
            }
            
            .flower-container-mobile:nth-of-type(2) .flower-inner {
              bottom: -40%;
              left: -40%;
            }
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
            font-family: 'Woodtrap', sans-serif !important;
          }

          .year-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            justify-content: center;
          }

          .year-tab {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            background: rgba(255, 182, 193, 0.6);
            color: white;
            font-size: 1.5rem;
            aspect-ratio: 16 / 9;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'BakeryRoastDemo', sans-serif;
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
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .photo-frame {
            width: 100%;
            aspect-ratio: 16 / 9;
            background: linear-gradient(180deg, #FFB6C1 0%, #FFF 30%, #FFE97F 70%, #90EE90 100%);
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .audio-player {
            width: 100%;
            margin-top: 1rem;
            border-radius: 50px;
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
            border-radius: 20px;
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
            font-family: 'Woodtrap', sans-serif !important;
          }

          .collaboration-text {
            font-size: 1.5rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.5s;
            font-family: 'Woodtrap', sans-serif !important;
          }

          .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
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

          @media (max-width: 768px) {
            .collaboration-title {
              font-size: 2.5rem;
            }

            .collaboration-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
            }
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
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929321/3_dvfsut.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929248/4_w9ppck.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929250/5_sinxan.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929254/6_cuyhzg.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929255/7_fhojic.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929256/8_onyr5b.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929259/9_uev3pg.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929261/10_wni4f6.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929264/11_q25rha.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929266/12_vslte5.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929269/13_qkox2a.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929271/14_q6kzto.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929273/15_voez03.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929277/16_wnub7p.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929286/17_atxyzf.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929290/18_qg24n9.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929290/19_meotku.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929293/20_o9gjwx.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929297/21_z7jcol.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929302/22_fhnvbe.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929302/23_mviqwn.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929304/25_bif5nv.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929305/24_pziuis.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929310/26_mr4ydh.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929311/28_yulk3k.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929313/29_o6tbis.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929316/30_mwqfbc.avif',
            'https://res.cloudinary.com/dctuev0mm/image/upload/v1766929319/32_nmftpg.avif'
          ].map((url, index) => (
            <div key={index} className="collaboration-image-card">
              <img 
                src={url}
                alt={`Collaboration ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
