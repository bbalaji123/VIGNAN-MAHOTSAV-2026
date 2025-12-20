import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import GarudaBubble from './GarudaBubble';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const Hospitality: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs'>('instructions');

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

          .hospitality-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            margin-left: 15%;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hospitality-title {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
          }

          .tab-navigation {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            padding: 0 1rem;
          }

          .tab-dropdown {
            display: none;
            width: 100%;
            max-width: 400px;
            margin: 0 auto 2rem auto;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(251, 191, 36, 0.5);
            border-radius: 12px;
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            text-transform: uppercase;
            cursor: pointer;
            backdrop-filter: blur(10px);
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fbbf24' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 24px;
            padding-right: 3rem;
          }

          .tab-dropdown:focus {
            outline: none;
            border-color: #fbbf24;
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
          }

          .tab-dropdown option {
            background: #522566;
            color: #ffffff;
            padding: 1rem;
          }

          .tab-button {
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(251, 191, 36, 0.3);
            border-radius: 50px;
            color: #ffffff;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .tab-button:hover {
            background: rgba(251, 191, 36, 0.2);
            border-color: rgba(251, 191, 36, 0.6);
            transform: translateY(-2px);
          }

          .tab-button.active {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border-color: #fbbf24;
            color: #000;
            box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
          }

          .section-content {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.1s;
            min-height: 600px;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
          }

          .section-heading {
            font-size: 1.5rem;
            font-weight: bold;
            color: #ef4444;
            margin-bottom: 1rem;
            margin-top: 2rem;
          }

          .section-content p {
            color: #ffffff;
            line-height: 1.8;
            margin-bottom: 0.5rem;
            font-size: 1rem;
            background: none;
            border: none;
            box-shadow: none;
            padding: 0.25rem 0;
          }

          .contact-table {
            width: 100%;
            max-width: 100%;
            margin: 2rem auto;
            border-collapse: collapse;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            overflow: hidden;
            table-layout: fixed;
          }

          .contact-table th,
          .contact-table td {
            padding: 1rem;
            text-align: left;
            border: 1px solid rgba(251, 191, 36, 0.3);
            word-wrap: break-word;
          }

          .contact-table th {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            font-weight: bold;
            text-transform: uppercase;
          }

          .contact-table td {
            color: #ffffff;
          }

          .contact-heading {
            font-size: 1.5rem;
            font-weight: bold;
            color: #ef4444;
            text-align: center;
            margin: 3rem 0 1rem 0;
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
            .hospitality-content {
              padding: 1rem;
              margin-left: 0;
            }

            .hospitality-title {
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }

            .tab-navigation {
              display: none;
            }

            .tab-dropdown {
              display: block;
            }

            .section-heading {
              font-size: 1.25rem;
            }

            .section-content p {
              font-size: 0.9rem;
            }

            .contact-table th,
            .contact-table td {
              padding: 0.75rem;
              font-size: 0.9rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
            }
          }
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="hospitality-content">
        <h1 className="hospitality-title">HOSPITALITY</h1>
        
        {/* Mobile Dropdown Navigation */}
        <select 
          className="tab-dropdown"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as 'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs')}
        >
          <option value="instructions">Instructions</option>
          <option value="howToReach">How to Reach</option>
          <option value="accommodation">Accommodation</option>
          <option value="contacts">Contacts</option>
          <option value="faqs">FAQ's</option>
        </select>

        {/* Desktop Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`tab-button ${activeTab === 'howToReach' ? 'active' : ''}`}
            onClick={() => setActiveTab('howToReach')}
          >
            How to Reach
          </button>
          <button 
            className={`tab-button ${activeTab === 'accommodation' ? 'active' : ''}`}
            onClick={() => setActiveTab('accommodation')}
          >
            Accommodation
          </button>
          <button 
            className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
          <button 
            className={`tab-button ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            FAQ's
          </button>
        </div>

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="section-content">
            <h2 className="section-heading">Eligibility:</h2>
            <p>• <strong>Sports & Games:</strong> Students of any UG / PG program from Technical Deemed Universities, Engineering and Pharmacy institutes are only allowed to participate in sports events.</p>
            <p>• <strong>Performing Arts:</strong> Students of any UG / PG program of any discipline are permitted to participate, from institutes of Engineering & Technology, Arts & Sciences, Designing, Fashion, Medical, Pharma etc., in Performing arts / Literature / Visual Arts and Crafts / Fashion events.</p>

            <h2 className="section-heading">Registrations:</h2>
          <p>• All external participants have to report at the Registration desk arranged near the main gate before 12 noon on 5th Feb 2026.</p>
          <p>• Registration fee:</p>
          <p style={{ paddingLeft: '2rem' }}>o Sports & Games: Rs.350/- for Men and Rs. 250/- for women</p>
          <p style={{ paddingLeft: '2rem' }}>o Performing arts / Literature / Visual Arts and Crafts / Fashion: Rs. 250/-</p>
          <p style={{ paddingLeft: '2rem' }}>o Entry is free for PARA sports participants.</p>
          <p>• All participants must produce their college ID card and Bonafide certificate.</p>
          <p>• On completion of individual registration, a Mahotsav ID will be generated for your account.</p>
          <p>• After individual registration, Team captain/leads must report at counters setup for concerned game/ event for registering their team by producing Mahotsav ID cards of all the team members.</p>
          <p>• Students registered for sports and games events are permitted to participate in any one Team event of sports and games and any number of Track & Field/ Individual sport event Performing Arts / Literature / Visual Arts and Crafts / Fashion.</p>
          <p>• Students registered for Performing Arts alone will not be permitted to participate in Sports & Games.</p>
          <p>• Participants who require accommodation must register at the adjacent hospitality desk by producing a Mahotsav ID card issued upon first come first serve basis.</p>
          <p>• Any number of individuals / teams are allowed to participate from an institute in an event.</p>
          <p>• Lunch will be provided on the three days of the fest for Sports & Games participants only.</p>
          <p>• All the visitors should also register at the desk with a nominal entry fee.</p>
          <p>• Winners and Runners will be awarded with cash prizes, memento/medal and appreciation certificate during the valedictory function only i.e., held on 8th Feb 2025 from 6 – 8 p.m.</p>
          <p>• Participation certificates will be issued to all the participants at the event venue only upon completion of the event.</p>

          <h2 className="contact-heading">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
          <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ashwin</td>
                <td>88852 84355</td>
              </tr>
              <tr>
                <td>Ajith anna</td>
                <td>93461 93840</td>
              </tr>
              <tr>
                <td>Hemanth</td>
                <td>88854 76252</td>
              </tr>
              <tr>
                <td>Phani</td>
                <td>95426 66866</td>
              </tr>
              <tr>
                <td>Nawaz Basha</td>
                <td>99638 76989</td>
              </tr>
              <tr>
                <td>Yeshwanth</td>
                <td>83091 90435</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Yamini</td>
                <td>70939 12677</td>
              </tr>
              <tr>
                <td>Sravani</td>
                <td>90147 04929</td>
              </tr>
              <tr>
                <td>Bindhu</td>
                <td>99590 22317</td>
              </tr>
            </tbody>
          </table>

          <h2 className="contact-heading">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lohith</td>
                <td>8309751051</td>
              </tr>
              <tr>
                <td>Sri Vatsav</td>
                <td>94419 34549</td>
              </tr>
            </tbody>
          </table>
          </div>
        )}

        {/* How to Reach Tab */}
        {activeTab === 'howToReach' && (
          <div className="section-content">
            <h2 className="section-heading">How to Reach</h2>
            <p>• Vignan University is well-connected to neighboring cities and towns, making it easily accessible for visitors. The nearest major city is Guntur, which is approximately 20 kilometers away. Guntur has a railway station and is connected to major cities like Hyderabad, Vijayawada, and Chennai. From Guntur, one can hire a taxi or take a bus that goes to Tenali to reach Vignan.</p>
            <p>• The nearest major railway station is in Tenali which is approximately 12 kM from Vignan University and is connected to major cities like Vishakhapatnam, Chennai, Coimbatore, Cochin.</p>
            <p>• One can get down at Vijayawada junction that has great connectivity to all parts of India and reach Tenali by bus which would take around 45 minutes.</p>
            <p>• There are plenty of auto-rickshaws and buses available from Tenali to reach Vignan University.</p>

            <h2 className="contact-heading">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ashwin</td>
                  <td>88852 84355</td>
                </tr>
                <tr>
                  <td>Ajith anna</td>
                  <td>93461 93840</td>
                </tr>
                <tr>
                  <td>Hemanth</td>
                  <td>88854 76252</td>
                </tr>
                <tr>
                  <td>Phani</td>
                  <td>95426 66866</td>
                </tr>
                <tr>
                  <td>Nawaz Basha</td>
                  <td>99638 76989</td>
                </tr>
                <tr>
                  <td>Yeshwanth</td>
                  <td>83091 90435</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yamini</td>
                  <td>70939 12677</td>
                </tr>
                <tr>
                  <td>Sravani</td>
                  <td>90147 04929</td>
                </tr>
                <tr>
                  <td>Bindhu</td>
                  <td>99590 22317</td>
                </tr>
              </tbody>
            </table>

            <h2 className="contact-heading">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lohith</td>
                  <td>8309751051</td>
                </tr>
                <tr>
                  <td>Sri Vatsav</td>
                  <td>94419 34549</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Accommodation Tab */}
        {activeTab === 'accommodation' && (
          <div className="section-content">
            <h2 className="section-heading">Accommodation</h2>
            <p>• Participants who require accommodation must register at the hospitality desk by producing the Mahotsav ID card issued post registration process.</p>
            <p>• Participants coming from distances more than 100 km from Guntur will only be provided with accommodation upon first come first serve basis depending on the availability with basic amenities.</p>
            <p>• Participants are advised to bring their basic bedding and electrical spikes for their charging their gadgets.</p>
            <p>• Boys and Girls will be accommodated at different venues; common halls will be provided along with decent washroom facilities.</p>
            <p>• No additional charge will be taken for accommodation from sports & Games participants; a nominal fee of Rs.100 will be charged from participants of cultural events.</p>
            <p>• Smoking, drinking and other drug consumption are strictly prohibited and necessary action will be taken by the institute if a participant is found to be in possession of these items.</p>
            <p>• Any damage to institution facilities and property provided to the participants would result in serious action and necessary reimbursement charges should be paid by the participants found guilty.</p>
            <p>• Participants are required to keep the given check-in receipts and ID card safe until they checkout. the candidate has to pay the registration fee again and get a new ID card.</p>
            <p>• Participants should report at the accommodation venue to the concerned in-charge with their ID cards every time they enter or exit the room for safety concerns.</p>
            <p>• Participants are requested to adhere to the check-out time mentioned in the check-in receipt. Check-out after the time indicated will not be entertained.</p>
            <p>• Participants are expected to not create any kind of nuisance which might trouble other participants in the room.</p>
            <p>• The college will not be responsible for any damage or loss of property or valuables stored in places of accommodation.</p>
            <p>• Girls should strictly follow the curfew timings of Vignan that are specified during the allocation of room.</p>
            <p>• The decision of organizers is final and binding in case of any dispute.</p>
            <p>• Faculty members accompanying the students will be provided the facility free of cost, if informed in advance.</p>

            <h2 className="contact-heading">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ashwin</td>
                  <td>88852 84355</td>
                </tr>
                <tr>
                  <td>Ajith anna</td>
                  <td>93461 93840</td>
                </tr>
                <tr>
                  <td>Hemanth</td>
                  <td>88854 76252</td>
                </tr>
                <tr>
                  <td>Phani</td>
                  <td>95426 66866</td>
                </tr>
                <tr>
                  <td>Nawaz Basha</td>
                  <td>99638 76989</td>
                </tr>
                <tr>
                  <td>Yeshwanth</td>
                  <td>83091 90435</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yamini</td>
                  <td>70939 12677</td>
                </tr>
                <tr>
                  <td>Sravani</td>
                  <td>90147 04929</td>
                </tr>
                <tr>
                  <td>Bindhu</td>
                  <td>99590 22317</td>
                </tr>
              </tbody>
            </table>

            <h2 className="contact-heading">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lohith</td>
                  <td>8309751051</td>
                </tr>
                <tr>
                  <td>Sri Vatsav</td>
                  <td>94419 34549</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="section-content">
            <h2 className="contact-heading">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ashwin</td>
                  <td>88852 84355</td>
                </tr>
                <tr>
                  <td>Ajith anna</td>
                  <td>93461 93840</td>
                </tr>
                <tr>
                  <td>Hemanth</td>
                  <td>88854 76252</td>
                </tr>
                <tr>
                  <td>Phani</td>
                  <td>95426 66866</td>
                </tr>
                <tr>
                  <td>Nawaz Basha</td>
                  <td>99638 76989</td>
                </tr>
                <tr>
                  <td>Yeshwanth</td>
                  <td>83091 90435</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yamini</td>
                  <td>70939 12677</td>
                </tr>
                <tr>
                  <td>Sravani</td>
                  <td>90147 04929</td>
                </tr>
                <tr>
                  <td>Bindhu</td>
                  <td>99590 22317</td>
                </tr>
              </tbody>
            </table>

            <h2 className="contact-heading">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lohith</td>
                  <td>8309751051</td>
                </tr>
                <tr>
                  <td>Sri Vatsav</td>
                  <td>94419 34549</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="section-content">
            <h2 className="section-heading">FAQ's</h2>
            
            <p><strong>1) From when can I avail accommodation?</strong></p>
            <p>Accommodation can be availed from 4th February, 2026 - 10 pm onwards.</p>

            <p><strong>2) What documents and proofs are required while coming to Mahotsav?</strong></p>
            <p>It is mandatory to bring the College ID card and bonafide certificate when you arrive at registration desk at Vignan University.</p>

            <p><strong>3) Does the accommodation include food?</strong></p>
            <p>No, but you can make use of the canteens/food stalls available during Mahotsav at your own expense. Whereas, for Sports & Games participants, Lunch will be provided</p>

            <p><strong>4) When can I come for registration and accommodation?</strong></p>
            <p>Accommodation and registration services can be availed from 4th Feb 2026, starting at 10 PM. The Registration and Hospitality desk will operate 24/7 until 5th Feb 2025. Please note that registrations and check-outs are paused during Inaugural and Valedictory functions, so kindly plan accordingly.</p>

            <p><strong>5) Can I vacate earlier than the registered date?</strong></p>
            <p>Yes, however you have to inform to the coordinator regarding your check out.</p>

            <p><strong>6) Whom and How should I approach for accommodation on arrival?</strong></p>
            <p>You have to report at the hospitality desk. You can contact Helpline numbers for any further help.<br />Helpline No: 88854 76252</p>

            <p><strong>7) Will Mahotsav guarantee security for my luggage and stuff?</strong></p>
            <p>The attendees are responsible for managing their own belongings, Mahotsav does not guarantee security of luggage or any personal belongings.</p>

            <p><strong>8) Can I check out later than my scheduled time of checkout?</strong></p>
            <p>You have to checkout at your given time only.</p>

            <p><strong>9) Are Male and Female students provided with the same accommodations?</strong></p>
            <p>No, male and female students would not be provided with the same accommodation.</p>

            <p><strong>10) Can I expect to private room allotted to me?</strong></p>
            <p>No, common halls will be arranged with decent washroom facilities.</p>

            <p><strong>11) Is there any curfew for students?</strong></p>
            <p>Yes, there will be a curfew for girl students. It will be informed during the allocation of room.</p>

            <p><strong>12) What about the food provision inside the college?</strong></p>
            <p>You can make use of the canteens/food stalls available during Mahotsav at your own expense.</p>

            <h2 className="contact-heading">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Boys:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ashwin</td>
                  <td>88852 84355</td>
                </tr>
                <tr>
                  <td>Ajith anna</td>
                  <td>93461 93840</td>
                </tr>
                <tr>
                  <td>Hemanth</td>
                  <td>88854 76252</td>
                </tr>
                <tr>
                  <td>Phani</td>
                  <td>95426 66866</td>
                </tr>
                <tr>
                  <td>Nawaz Basha</td>
                  <td>99638 76989</td>
                </tr>
                <tr>
                  <td>Yeshwanth</td>
                  <td>83091 90435</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>For Girls:</h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yamini</td>
                  <td>70939 12677</td>
                </tr>
                <tr>
                  <td>Sravani</td>
                  <td>90147 04929</td>
                </tr>
                <tr>
                  <td>Bindhu</td>
                  <td>99590 22317</td>
                </tr>
              </tbody>
            </table>

            <h2 className="contact-heading">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lohith</td>
                  <td>8309751051</td>
                </tr>
                <tr>
                  <td>Sri Vatsav</td>
                  <td>94419 34549</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Garuda Floating Bubble */}
      <GarudaBubble />
    </div>
  );
};

export default Hospitality;
