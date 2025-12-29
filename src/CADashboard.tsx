import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CADashboard.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';

interface Referral {
  userId: string;
  userName: string;
  userEmail: string;
  registrationDate: Date;
  paymentStatus: 'pending' | 'paid' | 'failed';
  pointsAwarded: number;
}

interface CAData {
  mcaId: string;
  name: string;
  email: string;
  college: string;
  totalPoints: number;
  tier: string;
  referrals: Referral[];
}

const CADashboard: React.FC = () => {
  const navigate = useNavigate();
  const [caData, setCAData] = useState<CAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('caToken');
        const storedCAData = localStorage.getItem('caData');

        // If there is no token or stored data, send user back to CA login
        if (!token || !storedCAData) {
          navigate('/campus-ambassador');
          return;
        }

        // Safely parse stored CA data (handle legacy "undefined" string)
        let parsedCAData: any;
        try {
          parsedCAData = JSON.parse(storedCAData);
        } catch (parseError) {
          console.error('Invalid CA data in localStorage, clearing it:', storedCAData, parseError);
          localStorage.removeItem('caToken');
          localStorage.removeItem('caData');
          navigate('/campus-ambassador');
          return;
        }

        if (!parsedCAData || !parsedCAData.mcaId) {
          console.error('CA data missing mcaId, clearing it:', parsedCAData);
          localStorage.removeItem('caToken');
          localStorage.removeItem('caData');
          navigate('/campus-ambassador');
          return;
        }

        const mcaId = parsedCAData.mcaId;
        console.log('Fetching dashboard for MCA ID:', mcaId);
        console.log('Using token:', token);

        const API_BASE_URL = 'http://localhost:5000/api';
        const response = await fetch(`${API_BASE_URL}/campus-ambassador/dashboard/${mcaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Dashboard data received:', data);
          setCAData(data);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Dashboard API Error:', response.status, errorData);
          setError(`Failed to load dashboard data: ${errorData.message || response.statusText}`);
        }
      } catch (err) {
        console.error('Dashboard Fetch Error:', err);
        setError(`Network error: ${err instanceof Error ? err.message : 'Please try again.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('caToken');
    localStorage.removeItem('caData');
    navigate('/campus-ambassador');
  };

  const getTierColor = (tier: string) => {
    const colors: { [key: string]: string } = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Platinum': '#E5E4E2',
      'Diamond': '#B9F2FF'
    };
    return colors[tier] || '#FFD700';
  };

  const getTierIcon = (tier: string) => {
    const icons: { [key: string]: string } = {
      'Bronze': '🥉',
      'Silver': '🥈',
      'Gold': '🥇',
      'Platinum': '💎',
      'Diamond': '💠'
    };
    return icons[tier] || '⭐';
  };

  if (loading) {
    return (
      <div className="ca-dashboard-container">
        <FlowerComponent />
        <div className="ca-loading">
          <div className="ca-spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !caData) {
    return (
      <div className="ca-dashboard-container">
        <FlowerComponent />
        <div className="ca-error-container">
          <h2>Error</h2>
          <p>{error || 'Failed to load dashboard'}</p>
          <button onClick={() => navigate('/campus-ambassador')} className="ca-back-button">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const totalReferrals = caData.referrals.length;
  const paidReferrals = caData.referrals.filter(r => r.paymentStatus === 'paid').length;
  const pendingReferrals = caData.referrals.filter(r => r.paymentStatus === 'pending').length;

  return (
    <div className="ca-dashboard-container">
      <FlowerComponent />
      
      <div className="ca-dashboard-content" style={{ position: 'relative' }}>
        {/* Back Button - Top Left */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
          <BackButton />
        </div>

        {/* Header Section */}
        <div className="ca-dashboard-header">
          <div className="ca-profile-section">
            <h1 className="ca-welcome-text">Welcome, {caData.name}!</h1>
            <div className="ca-id-badge">
              <span className="ca-id-label">MCA ID:</span>
              <span className="ca-id-value">{caData.mcaId}</span>
            </div>
            <p className="ca-college-name">{caData.college}</p>
          </div>
          
          <button onClick={handleLogout} className="ca-logout-button">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="ca-stats-grid">
          <div className="ca-stat-card ca-points-card">
            <div className="ca-stat-icon">⭐</div>
            <div className="ca-stat-value">{caData.totalPoints}</div>
            <div className="ca-stat-label">Total Points</div>
          </div>

          <div className="ca-stat-card ca-tier-card" style={{ borderColor: getTierColor(caData.tier) }}>
            <div className="ca-stat-icon">{getTierIcon(caData.tier)}</div>
            <div className="ca-stat-value" style={{ color: getTierColor(caData.tier) }}>{caData.tier}</div>
            <div className="ca-stat-label">Current Tier</div>
          </div>

          <div className="ca-stat-card ca-referrals-card">
            <div className="ca-stat-icon">👥</div>
            <div className="ca-stat-value">{totalReferrals}</div>
            <div className="ca-stat-label">Total Referrals</div>
          </div>

          <div className="ca-stat-card ca-paid-card">
            <div className="ca-stat-icon">✅</div>
            <div className="ca-stat-value">{paidReferrals}</div>
            <div className="ca-stat-label">Paid Referrals</div>
          </div>

          <div className="ca-stat-card ca-pending-card">
            <div className="ca-stat-icon">⏳</div>
            <div className="ca-stat-value">{pendingReferrals}</div>
            <div className="ca-stat-label">Pending Referrals</div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="ca-tier-progress-section">
          <h3>Tier Progress</h3>
          <div className="ca-tier-milestones">
            <div className={`ca-milestone ${caData.totalPoints >= 50 ? 'achieved' : ''}`}>
              <span className="milestone-icon">🥉</span>
              <span className="milestone-name">Bronze</span>
              <span className="milestone-points">50 pts</span>
            </div>
            <div className={`ca-milestone ${caData.totalPoints >= 100 ? 'achieved' : ''}`}>
              <span className="milestone-icon">🥈</span>
              <span className="milestone-name">Silver</span>
              <span className="milestone-points">100 pts</span>
            </div>
            <div className={`ca-milestone ${caData.totalPoints >= 150 ? 'achieved' : ''}`}>
              <span className="milestone-icon">🥇</span>
              <span className="milestone-name">Gold</span>
              <span className="milestone-points">150 pts</span>
            </div>
            <div className={`ca-milestone ${caData.totalPoints >= 200 ? 'achieved' : ''}`}>
              <span className="milestone-icon">💎</span>
              <span className="milestone-name">Platinum</span>
              <span className="milestone-points">200 pts</span>
            </div>
            <div className={`ca-milestone ${caData.totalPoints >= 250 ? 'achieved' : ''}`}>
              <span className="milestone-icon">💠</span>
              <span className="milestone-name">Diamond</span>
              <span className="milestone-points">250 pts</span>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="ca-referrals-section">
          <h3>Referral History</h3>
          {caData.referrals.length === 0 ? (
            <div className="ca-no-referrals">
              <p>No referrals yet. Share your MCA ID to start earning points!</p>
              <div className="ca-share-id">
                <span>Your Referral Code:</span>
                <div className="ca-referral-code">{caData.mcaId}</div>
              </div>
            </div>
          ) : (
            <div className="ca-table-container">
              <table className="ca-referrals-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Payment Status</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {caData.referrals.map((referral, index) => (
                    <tr key={referral.userId}>
                      <td>{index + 1}</td>
                      <td>{referral.userName}</td>
                      <td>{referral.userEmail}</td>
                      <td>{new Date(referral.registrationDate).toLocaleDateString('en-IN')}</td>
                      <td>
                        <span className={`ca-status-badge ${referral.paymentStatus}`}>
                          {referral.paymentStatus === 'paid' && '✅ '}
                          {referral.paymentStatus === 'pending' && '⏳ '}
                          {referral.paymentStatus === 'failed' && '❌ '}
                          {referral.paymentStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="ca-points-cell">
                        {referral.pointsAwarded > 0 ? `+${referral.pointsAwarded}` : '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <footer className="footer-section" style={{
          background: '#000',
          width: '100vw',
          position: 'relative',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          marginTop: '80px',
          marginBottom: '0',
          padding: '0',
          boxSizing: 'border-box'
        }}>
          {/* Footer Content Wrapper */}
          <div className="footer-content" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px 20px 0 20px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
            {/* Logo Section */}
            <div>
              <img 
                src={`${import.meta.env.BASE_URL}image.avif`}
                alt="Mahotsav 2026" 
                className="footer-logo"
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '-60px',
                  marginLeft: '-7px',
                  marginTop: '-80px'
                }}
              />
              {/* Social Media Icons */}
              <h3 className="footer-heading" style={{
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '12px',
                letterSpacing: '1px'
              }}>FOLLOW US ON :</h3>
              <div className="footer-social" style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '25px'
              }}>
                <a href="https://www.instagram.com/vignan_mahotsav/profilecard/?igsh=dDE1MHNpcmM4eXhm" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  border: '2px solid transparent'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  border: '2px solid transparent'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/vignan-mahotsav" target="_blank" rel="noopener noreferrer" className="social-icon" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  border: '2px solid transparent'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Us Section */}
            <div>
              <h3 className="footer-heading" style={{
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '12px',
                letterSpacing: '1px'
              }}>CONTACT US :</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="mailto:mahotsav@vignan.ac.in" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 6 10-6"/>
                  </svg>
                  <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>mahotsav@vignan.ac.in</span>
                </a>
                <a href="tel:+919493033592" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>+91 94930 33592</span>
                </a>
                <a href="tel:+919030557363" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', cursor: 'pointer' }}>+91 90305 57363</span>
                </a>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h3 className="footer-heading" style={{
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '12px',
                letterSpacing: '1px'
              }}>LOCATION :</h3>
              <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="footer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="footer-text" style={{ color: '#fff', fontSize: '0.7rem', lineHeight: '1.6', margin: 0 }}>
                  VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH (DEEMED TO BE UNIVERSITY), VADLAMUDI, GUNTUR, A.P -522213
                </p>
              </div>
              <a 
                href="https://maps.app.goo.gl/5pufqAcYqKrQCyQZ6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  color: '#a78bfa',
                  fontSize: '0.7rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '-3px',
                  paddingLeft: '8px',
                  transition: 'color 0.3s'
                }}
              >
                VIEW ON GOOGLE MAPS
                <svg className="footer-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CADashboard;
