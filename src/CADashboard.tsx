import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CADashboard.css';
import FlowerComponent from './components/FlowerComponent';
import BackButton from './components/BackButton';
import { API_BASE_URL } from './services/api';

interface Referral {
  userId: string;
  userName: string;
  userEmail: string;
  registrationDate: Date;
  paymentStatus: 'pending' | 'paid' | 'failed';
  pointsAwarded: number;
}

interface CAReferral {
  mcaId: string;
  name: string;
  email: string;
  college: string;
  registeredAt: Date;
  pointsAwarded: number;
}

interface CAData {
  mcaId: string;
  name: string;
  email: string;
  college: string;
  totalPoints: number;
  tier: string;
  caReferrals: number;
  referrals: Referral[];
  caReferralList: CAReferral[];
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
      'Bronze': '',
      'Silver': '',
      'Gold': '',
      'Platinum': '',
      'Diamond': ''
    };
    return icons[tier] || '';
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
  const caReferralsCount = caData.caReferrals || 0;

  return (
    <div className="ca-dashboard-container">
      <FlowerComponent />
      
      <div className="ca-dashboard-grid">
        {/* Box 3 - Top Wide: Welcome, Name, MCA ID, Logout */}
        <div className="ca-box ca-box-3">
          <div className="ca-welcome-section">
            <h2 className="ca-welcome-title">Welcome Back!</h2>
            <h1 className="ca-name-display">{caData.name}</h1>
            <div className="ca-mca-id-display">
              <span className="ca-id-label-inline">MCA ID:</span>
              <span className="ca-id-value-inline">{caData.mcaId}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="ca-logout-btn">
            Logout
          </button>
        </div>

        {/* Box 2 - Left Tall: Points, Tier, User Referrals */}
        <div className="ca-box ca-box-2">
          <h3 className="ca-box-title">Overview</h3>
          
          <div className="ca-points-display">
            <div className="ca-points-value">{caData.totalPoints}</div>
            <div className="ca-points-label">Total Points</div>
          </div>

          <div className="ca-tier-display">
            <div className="ca-tier-badge" style={{ borderColor: getTierColor(caData.tier), color: getTierColor(caData.tier) }}>
              {caData.tier || 'None'}
            </div>
            <div className="ca-tier-label">Current Tier</div>
          </div>

          <div className="ca-referrals-stats">
            <h4 className="ca-stats-subtitle">User Referrals</h4>
            <div className="ca-stat-row">
              <span className="ca-stat-label">Pending</span>
              <span className="ca-stat-value">{pendingReferrals}</span>
            </div>
            <div className="ca-stat-row">
              <span className="ca-stat-label">Paid</span>
              <span className="ca-stat-value">{paidReferrals}</span>
            </div>
            <div className="ca-stat-row ca-stat-total">
              <span className="ca-stat-label">Total</span>
              <span className="ca-stat-value">{totalReferrals}</span>
            </div>
          </div>
        </div>

        {/* Box 4 - Right Tall: CA Referrals */}
        <div className="ca-box ca-box-4">
          <h3 className="ca-box-title">CA Referrals</h3>
          <div className="ca-ca-referrals-content">
            <div className="ca-ca-referral-count">
              <div className="ca-ca-count-value">{caReferralsCount}</div>
              <div className="ca-ca-count-label">Campus Ambassadors Referred</div>
            </div>
            
            {caData.caReferralList && caData.caReferralList.length > 0 ? (
              <div className="ca-ca-referral-list">
                {caData.caReferralList.map((referral, index) => (
                  <div key={referral.mcaId} className="ca-ca-referral-item">
                    <div className="ca-ca-ref-header">
                      <span className="ca-ca-ref-name">{referral.name}</span>
                      <span className="ca-ca-ref-points">+{referral.pointsAwarded}</span>
                    </div>
                    <div className="ca-ca-ref-details">
                      <span className="ca-ca-ref-id">{referral.mcaId}</span>
                      <span className="ca-ca-ref-college">{referral.college}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ca-no-data">
                <p>No CA referrals yet</p>
                <p className="ca-no-data-hint">Share your MCA ID with other potential ambassadors!</p>
              </div>
            )}
          </div>
        </div>

        {/* Box 5 - Bottom Wide: Total Referrals */}
        <div className="ca-box ca-box-5">
          <h3 className="ca-box-title">Total User Referrals</h3>
          {caData.referrals.length === 0 ? (
            <div className="ca-no-data">
              <p>No user referrals yet</p>
              <p className="ca-no-data-hint">Share your referral code: <strong>{caData.mcaId}</strong></p>
            </div>
          ) : (
            <div className="ca-referrals-table-wrapper">
              <table className="ca-modern-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Status</th>
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
                        <span className={`ca-status-pill ca-status-${referral.paymentStatus}`}>
                          {referral.paymentStatus}
                        </span>
                      </td>
                      <td className="ca-points-col">
                        {referral.pointsAwarded > 0 ? `+${referral.pointsAwarded}` : '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CADashboard;
