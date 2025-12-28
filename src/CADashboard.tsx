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
      <BackButton />
      
      <div className="ca-dashboard-content">
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
      </div>
    </div>
  );
};

export default CADashboard;
