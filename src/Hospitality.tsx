import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './Hospitality.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

const Hospitality: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs'>('instructions');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "From when can I avail accommodation?",
      answer: "Accommodation can be availed from 4th February, 2026 - 10 pm onwards."
    },
    {
      question: "What documents and proofs are required while coming to Mahotsav?",
      answer: "It is mandatory to bring the College ID card and bonafide certificate when you arrive at registration desk at Vignan University."
    },
    {
      question: "Does the accommodation include food?",
      answer: "No, but you can make use of the canteens/food stalls available during Mahotsav at your own expense. Whereas, for Sports & Games participants, Lunch will be provided"
    },
    {
      question: "When can I come for registration and accommodation?",
      answer: "Accommodation and registration services can be availed from 4th Feb 2026, starting at 10 PM. The Registration and Hospitality desk will operate 24/7 until 5th Feb 2025. Please note that registrations and check-outs are paused during Inaugural and Valedictory functions, so kindly plan accordingly."
    },
    {
      question: "Can I vacate earlier than the registered date?",
      answer: "Yes, however you have to inform to the coordinator regarding your check out."
    },
    {
      question: "Whom and How should I approach for accommodation on arrival?",
      answer: "You have to report at the hospitality desk. You can contact Helpline numbers for any further help.\nHelpline No: 88854 76252"
    },
    {
      question: "Will Mahotsav guarantee security for my luggage and stuff?",
      answer: "The attendees are responsible for managing their own belongings, Mahotsav does not guarantee security of luggage or any personal belongings."
    },
    {
      question: "Can I check out later than my scheduled time of checkout?",
      answer: "You have to checkout at your given time only."
    },
    {
      question: "Are Male and Female students provided with the same accommodations?",
      answer: "No, male and female students would not be provided with the same accommodation."
    },
    {
      question: "Can I expect to private room allotted to me?",
      answer: "No, common halls will be arranged with decent washroom facilities."
    },
    {
      question: "Is there any curfew for students?",
      answer: "Yes, there will be a curfew for girl students. It will be informed during the allocation of room."
    },
    {
      question: "What about the food provision inside the college?",
      answer: "You can make use of the canteens/food stalls available during Mahotsav at your own expense."
    }
  ];

  const handleBackClick = () => {
    navigate('/')
  };

  return (
    <div className="hospitality-bg min-h-screen flex flex-col relative overflow-x-hidden">
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
      <div className="fixed -bottom-32 -left-32 md:-bottom-64 md:-left-64 pointer-events-none w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-55 max-md:z-0 md:z-[1]">
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

          /* Mobile-first responsive styles handled by Tailwind classes in JSX */
        `}
      </style>

      {/* Back Button */}
      <BackButton onClick={handleBackClick} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <h1 className="hospitality-title hospitality-title-color text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8">HOSPITALITY</h1>
        
        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex hospitality-tabs">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`hospitality-tab-btn ${activeTab === 'instructions' ? 'active' : 'inactive'}`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('howToReach')}
            className={`hospitality-tab-btn ${activeTab === 'howToReach' ? 'active' : 'inactive'}`}
          >
            How to Reach
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`hospitality-tab-btn ${activeTab === 'accommodation' ? 'active' : 'inactive'}`}
          >
            Accommodation
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`hospitality-tab-btn ${activeTab === 'contacts' ? 'active' : 'inactive'}`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`hospitality-tab-btn ${activeTab === 'faqs' ? 'active' : 'inactive'}`}
          >
            FAQ's
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        <select 
          className="block md:hidden hospitality-mobile-select touch-manipulation"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as 'instructions' | 'howToReach' | 'accommodation' | 'contacts' | 'faqs')}
          aria-label="Select hospitality section"
        >
          <option value="instructions" className="hospitality-option">Instructions</option>
          <option value="howToReach" className="hospitality-option">How to Reach</option>
          <option value="accommodation" className="hospitality-option">Accommodation</option>
          <option value="contacts" className="hospitality-option">Contacts</option>
          <option value="faqs" className="hospitality-option">FAQ's</option>
        </select>

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="hospitality-tab-content">
            <h2 className="section-heading-primary">Eligibility:</h2>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• <strong>Sports & Games:</strong> Students of any UG / PG program from Technical Deemed Universities, Engineering and Pharmacy institutes are only allowed to participate in sports events.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• <strong>Performing Arts:</strong> Students of any UG / PG program of any discipline are permitted to participate, from institutes of Engineering & Technology, Arts & Sciences, Designing, Fashion, Medical, Pharma etc., in Performing arts / Literature / Visual Arts and Crafts / Fashion events.</p>

            <h2 className="section-heading-primary">Registrations:</h2>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• All external participants have to report at the Registration desk arranged near the main gate before 12 noon on 5th Feb 2026.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Registration fee:</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Sports & Games: Rs.350/- for Men and Rs. 250/- for women</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Performing arts / Literature / Visual Arts and Crafts / Fashion: Rs. 250/-</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base pl-6 sm:pl-8">o Entry is free for PARA sports participants.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• All participants must produce their college ID card and Bonafide certificate.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• On completion of individual registration, a Mahotsav ID will be generated for your account.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• After individual registration, Team captain/leads must report at counters setup for concerned game/ event for registering their team by producing Mahotsav ID cards of all the team members.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Students registered for sports and games events are permitted to participate in any one Team event of sports and games and any number of Track & Field/ Individual sport event Performing Arts / Literature / Visual Arts and Crafts / Fashion.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Students registered for Performing Arts alone will not be permitted to participate in Sports & Games.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants who require accommodation must register at the adjacent hospitality desk by producing a Mahotsav ID card issued upon first come first serve basis.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Any number of individuals / teams are allowed to participate from an institute in an event.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Lunch will be provided on the three days of the fest for Sports & Games participants only.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• All the visitors should also register at the desk with a nominal entry fee.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Winners and Runners will be awarded with cash prizes, memento/medal and appreciation certificate during the valedictory function only i.e., held on 8th Feb 2025 from 6 – 8 p.m.</p>
          <p className="hospitality-content mb-2 text-sm sm:text-base">• Participation certificates will be issued to all the participants at the event venue only upon completion of the event.</p>
          </div>
        )}

        {/* How to Reach Tab */}
        {activeTab === 'howToReach' && (
          <div className="hospitality-tab-content">
            <h2 className="section-heading-primary">How to Reach</h2>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Vignan University is well-connected to neighboring cities and towns, making it easily accessible for visitors. The nearest major city is Guntur, which is approximately 20 kilometers away. Guntur has a railway station and is connected to major cities like Hyderabad, Vijayawada, and Chennai. From Guntur, one can hire a taxi or take a bus that goes to Tenali to reach Vignan.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• The nearest major railway station is in Tenali which is approximately 12 kM from Vignan University and is connected to major cities like Vishakhapatnam, Chennai, Coimbatore, Cochin.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• One can get down at Vijayawada junction that has great connectivity to all parts of India and reach Tenali by bus which would take around 45 minutes.</p>
            <p className="hospitality-content mb-6 sm:mb-8 text-sm sm:text-base">• There are plenty of auto-rickshaws and buses available from Tenali to reach Vignan University.</p>

            <h2 className="section-heading-primary">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 className="section-subheading">For Boys:</h3>
            <div className="hospitality-table-container">
            <table className="hospitality-table">
              <thead>
                <tr >
                  <th >Name</th>
                  <th >Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td >Ashwin</td>
                  <td >88852 84355</td>
                </tr>
                <tr >
                  <td >Ajith anna</td>
                  <td >93461 93840</td>
                </tr>
                <tr >
                  <td >Hemanth</td>
                  <td >88854 76252</td>
                </tr>
                <tr >
                  <td >Phani</td>
                  <td >95426 66866</td>
                </tr>
                <tr >
                  <td >Nawaz Basha</td>
                  <td >99638 76989</td>
                </tr>
                <tr >
                  <td >Yeshwanth</td>
                  <td >83091 90435</td>
                </tr>
              </tbody>
            </table>
            </div>

            <h3 className="section-subheading">For Girls:</h3>
            <div className="hospitality-table-container">
            <table className="hospitality-table">
              <thead>
                <tr >
                  <th >Name</th>
                  <th >Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td >Yamini</td>
                  <td >70939 12677</td>
                </tr>
                <tr >
                  <td >Sravani</td>
                  <td >90147 04929</td>
                </tr>
                <tr >
                  <td >Bindhu</td>
                  <td >99590 22317</td>
                </tr>
              </tbody>
            </table>
            </div>

            <h2 className="section-heading-primary hospitality-heading-centered mt-8">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="hospitality-table-container">
            <table className="hospitality-table">
              <thead>
                <tr >
                  <th >Name</th>
                  <th >Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td >Lohith</td>
                  <td >8309751051</td>
                </tr>
                <tr >
                  <td >Sri Vatsav</td>
                  <td >94419 34549</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* Accommodation Tab */}
        {activeTab === 'accommodation' && (
          <div className="hospitality-tab-content">
            <h2 className="section-heading-primary">Accommodation</h2>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants who require accommodation must register at the hospitality desk by producing the Mahotsav ID card issued post registration process.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants coming from distances more than 100 km from Guntur will only be provided with accommodation upon first come first serve basis depending on the availability with basic amenities.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants are advised to bring their basic bedding and electrical spikes for their charging their gadgets.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Boys and Girls will be accommodated at different venues; common halls will be provided along with decent washroom facilities.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• No additional charge will be taken for accommodation from sports & Games participants; a nominal fee of Rs.100 will be charged from participants of cultural events.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Smoking, drinking and other drug consumption are strictly prohibited and necessary action will be taken by the institute if a participant is found to be in possession of these items.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Any damage to institution facilities and property provided to the participants would result in serious action and necessary reimbursement charges should be paid by the participants found guilty.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants are required to keep the given check-in receipts and ID card safe until they checkout. the candidate has to pay the registration fee again and get a new ID card.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants should report at the accommodation venue to the concerned in-charge with their ID cards every time they enter or exit the room for safety concerns.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants are requested to adhere to the check-out time mentioned in the check-in receipt. Check-out after the time indicated will not be entertained.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Participants are expected to not create any kind of nuisance which might trouble other participants in the room.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• The college will not be responsible for any damage or loss of property or valuables stored in places of accommodation.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Girls should strictly follow the curfew timings of Vignan that are specified during the allocation of room.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• The decision of organizers is final and binding in case of any dispute.</p>
            <p className="hospitality-content mb-2 text-sm sm:text-base">• Faculty members accompanying the students will be provided the facility free of cost, if informed in advance.</p>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="hospitality-tab-content">
            <h2 className="section-heading-primary">FOR QUERIES AND DETAILS ON ACCOMMODATION CONTACT:</h2>
          
            <h3 className="section-subheading hospitality-subheading-padded">For Boys:</h3>
            <div className="hospitality-table-container">
              <table className="hospitality-table">
                <thead>
                  <tr >
                    <th >Name</th>
                    <th >Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td >Mr. Ashwin</td>
                    <td><a href="tel:+91 88852 84355" className="hospitality-table-link">+91 88852 84355</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Ajith</td>
                    <td><a href="tel:+91 93461 93840" className="hospitality-table-link">+91 93461 93840</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Hemanth</td>
                    <td><a href="tel:+91 88854 76252" className="hospitality-table-link">+91 88854 76252</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Phani</td>
                    <td><a href="tel:+91 95426 66866" className="hospitality-table-link">+91 95426 66866</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Nawaz Basha</td>
                    <td><a href="tel:+91 99638 76989" className="hospitality-table-link">+91 99638 76989</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Yeshwanth</td>
                    <td><a href="tel:+91 83091 90435" className="hospitality-table-link">+91 83091 90435</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="section-subheading hospitality-subheading-padded">For Girls:</h3>
            <div className="hospitality-table-container">
              <table className="hospitality-table">
                <thead>
                  <tr >
                    <th >Name</th>
                    <th >Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td >Ms. Yamini</td>
                    <td><a href="tel:+917093912677" className="hospitality-table-link">+91 70939 12677</a></td>
                  </tr>
                  <tr >
                    <td >Ms. Sravani</td>
                    <td><a href="tel:+919014704929" className="hospitality-table-link">+91 90147 04929</a></td>
                  </tr>
                  <tr >
                    <td >Ms. Bindhu</td>
                    <td><a href="tel:+919959022317" className="hospitality-table-link">+91 99590 22317</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="section-heading-primary hospitality-heading-centered">FOR FURTHER QUERIES AND DETAILS CONTACT:</h2>
            <div className="hospitality-table-container">
              <table className="hospitality-table">
                <thead>
                  <tr >
                    <th >Name</th>
                    <th >Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td >Mr. Lohith</td>
                    <td><a href="tel:+918309751051" className="hospitality-table-link">+91 83097 51051</a></td>
                  </tr>
                  <tr >
                    <td >Mr. Sri Vatsav</td>
                    <td><a href="tel:+919441934549" className="hospitality-table-link">+91 94419 34549</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="hospitality-tab-content">
            <h2 className="section-heading-primary">FAQ's</h2>
            
            <div className="faq-container" style={{ marginTop: '2rem' }}>
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    border: '2px solid rgba(253, 238, 113, 0.3)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: openFAQ === index ? 'rgba(253, 238, 113, 0.15)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (openFAQ !== index) {
                        e.currentTarget.style.background = 'rgba(253, 238, 113, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openFAQ !== index) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{
                      color: '#fdee71',
                      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                      fontWeight: '600',
                      paddingRight: '1rem'
                    }}>
                      {index + 1}. {faq.question}
                    </span>
                    <span style={{
                      color: '#fdee71',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}>
                      ▼
                    </span>
                  </button>
                  
                  <div style={{
                    maxHeight: openFAQ === index ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}>
                    <p style={{
                      padding: '1.25rem',
                      color: '#f5e210',
                      fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                      lineHeight: '1.7',
                      margin: 0,
                      whiteSpace: 'pre-line'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitality;
