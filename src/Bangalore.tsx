import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FlowerComponent from './components/FlowerComponent';

const Bangalore: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/zonals');
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
      <div className="fixed -top-32 -right-32 md:-top-64 md:-right-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-25 z-[1]">
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
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .bangalore-container {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            padding: 2rem;
          }

          .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #fff;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(228, 138, 185, 0.4);
            text-transform: uppercase;
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(228, 138, 185, 0.6);
          }

          .bangalore-header {
            text-align: center;
            margin-top: 1.5rem;
            margin-bottom: 3rem;
          }

          .bangalore-title {
            font-family: 'Cinzel Decorative', serif;
            font-size: 4rem;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            letter-spacing: 0.15em;
            margin-bottom: 0.5rem;
          }

          .bangalore-date {
            font-family: 'Cinzel Decorative', serif;
            font-size: 2rem;
            color: #ffffff;
            font-style: italic;
            letter-spacing: 0.05em;
          }

          .bangalore-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 3rem;
            max-width: 1400px;
            margin: 0 auto;
            flex-wrap: wrap;
          }

          .bangalore-card-left {
            background: rgba(184, 147, 189, 0.7);
            border: 3px solid rgba(198, 142, 107, 0.8);
            border-radius: 20px;
            padding: 5rem 3rem;
            min-width: 250px;
            width: 280px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
          }

          .bangalore-card-left span {
            font-size: 2rem;
            font-weight: 600;
            color: #000000;
            text-transform: lowercase;
          }

          .events-table-container {
            flex: 1;
            min-width: 500px;
            max-width: 600px;
          }

          .events-table {
            background: rgba(82, 37, 102, 0.3);
            border: 2px dashed rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            padding: 2rem 2.5rem;
            backdrop-filter: blur(10px);
          }

          .events-table h3 {
            font-size: 1.6rem;
            font-weight: 700;
            color: #ffffff;
            text-align: center;
            margin-bottom: 1.5rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .table-content {
            display: flex;
            gap: 3rem;
            color: #ffffff;
          }

          .sports-column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            min-width: 150px;
          }

          .sport-item {
            display: flex;
            flex-direction: column;
            padding: 1rem 0;
          }

          .sport-item:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }

          .sport-name {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
          }

          .sport-team-size {
            font-size: 1rem;
          }

          .prizes-section {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .prizes-header {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
            margin-bottom: 1rem;
            font-weight: 700;
            font-size: 1.1rem;
          }

          .prizes-header div {
            text-align: center;
          }

          .prizes-rows {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .prize-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
            font-size: 1rem;
          }

          .prize-row div {
            text-align: center;
          }

          .prize-label {
            font-weight: 600;
          }

          .hosting-partner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .hosting-label {
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .partner-logo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          }

          .partner-logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .partner-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #ffffff;
            text-align: center;
            max-width: 200px;
            line-height: 1.4;
          }

          .note-section {
            max-width: 1200px;
            margin: 3rem auto;
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            line-height: 1.6;
            padding: 0 2rem;
          }

          .register-button {
            display: block;
            margin: 2rem auto;
            background: linear-gradient(135deg, #e48ab9, #c96ba1);
            color: #fff;
            padding: 1rem 3rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 5px 15px rgba(228, 138, 185, 0.4);
            text-transform: uppercase;
          }

          .register-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(228, 138, 185, 0.6);
          }

          @media (max-width: 768px) {
            .bangalore-title {
              font-size: 2rem;
              letter-spacing: 0.05em;
            }

            .bangalore-date {
              font-size: 1.2rem;
            }

            .bangalore-content {
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }

            .bangalore-card-left {
              width: 220px;
              height: 250px;
              padding: 4rem 2rem;
            }

            .bangalore-card-left span {
              font-size: 1.5rem;
            }

            .events-table-container {
              min-width: auto;
              width: 100%;
              max-width: 100%;
            }

            .events-table {
              padding: 1.5rem;
            }

            .events-table h3 {
              font-size: 1.2rem;
              margin-bottom: 1rem;
            }

            .table-content {
              flex-direction: column;
              gap: 1.5rem;
            }

            .sports-column {
              min-width: auto;
            }

            .sport-name {
              font-size: 1rem;
            }

            .sport-team-size {
              font-size: 0.9rem;
            }

            .prizes-header {
              gap: 1rem;
              font-size: 0.95rem;
            }

            .prizes-rows {
              gap: 0.5rem;
            }

            .prize-row {
              gap: 1rem;
              font-size: 0.9rem;
            }

            .hosting-partner {
              margin-top: 1rem;
            }

            .partner-logo {
              width: 120px;
              height: 120px;
            }

            .partner-name {
              font-size: 1rem;
            }

            .note-section {
              font-size: 0.9rem;
              margin: 2rem auto;
            }

            .register-button {
              font-size: 1rem;
              padding: 0.875rem 2rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
              font-size: 0.9rem;
            }
          }
            }
          }
        `}
      </style>

      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button" aria-label="Go back">
        BACK
      </button>

      <div className="bangalore-container">
        {/* Header */}
        <div className="bangalore-header">
          <h1 className="bangalore-title">BANGALORE</h1>
          <p className="bangalore-date">(1-2 DEC,2025)</p>
        </div>

        {/* Content */}
        <div className="bangalore-content">
          {/* Left Card */}
          <div className="bangalore-card-left">
            <span>bangalore</span>
          </div>

          {/* Events Table */}
          <div className="events-table-container">
            <div className="events-table">
              <h3>ZONAL EVENTS (MEN)</h3>
              <div className="table-content">
                {/* Sports Column */}
                <div className="sports-column">
                  <div className="sport-item">
                    <div className="sport-name">Volley ball</div>
                    <div className="sport-team-size">(6+4)</div>
                  </div>
                  <div className="sport-item">
                    <div className="sport-name">Basket ball</div>
                    <div className="sport-team-size">(5+5)</div>
                  </div>
                  <div className="sport-item">
                    <div className="sport-name">Kabaddi</div>
                    <div className="sport-team-size">(7+3)</div>
                  </div>
                </div>

                {/* Prizes Section */}
                <div className="prizes-section">
                  <div className="prizes-header">
                    <div></div>
                    <div>Zone<br/>Winners</div>
                    <div>Mahotsav<br/>Winners</div>
                  </div>
                  <div className="prizes-rows">
                    <div className="prize-row">
                      <div className="prize-label">I Prize :</div>
                      <div>10,000</div>
                      <div>30,000</div>
                    </div>
                    <div className="prize-row">
                      <div className="prize-label">II Prize :</div>
                      <div>6,000</div>
                      <div>25,000</div>
                    </div>
                    <div className="prize-row">
                      <div className="prize-label">III Prize :</div>
                      <div>-</div>
                      <div>7,000</div>
                    </div>
                    <div className="prize-row">
                      <div className="prize-label">IV Prize :</div>
                      <div>-</div>
                      <div>3,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hosting Partner */}
          <div className="hosting-partner">
            <div className="hosting-label">HOSTING PARTNER</div>
            <div className="partner-logo">
              <img src={`${import.meta.env.BASE_URL}dayananda.svg`} alt="Dayananda Sagar College" />
            </div>
            <div className="partner-name">
              Dayananda Sagar<br/>College of Engineering
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="note-section">
          <strong>Note : </strong>The semi finalists of each zone will be promoted to higher level rounds during 
          Vignan Mahotsav 2026 organised from 5 - 7 Feb, 2026 at Guntur, Andhra Pradesh.
        </div>

        {/* Register Button */}
        <button className="register-button">
          CLICK HERE TO REGISTER
        </button>
      </div>
    </div>
  );
};

export default Bangalore;
