import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CADashboard.css';
import { API_BASE_URL } from './services/api';

interface CampusAmbassador {
  _id: string;
  mcaId: string;
  registrationNumber: string;
  name: string;
  email: string;
  whatsapp: string;
  college: string;
  state: string;
  district: string;
  totalPoints: number;
  isActive: boolean;
  referrals: any[];
  createdAt: string;
}

interface ActivityLog {
  action: string;
  targetCA: {
    mcaId: string;
    name: string;
  };
  details: string;
  timestamp: Date;
}

const CAManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ambassadors, setAmbassadors] = useState<CampusAmbassador[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [selectedCA, setSelectedCA] = useState<CampusAmbassador | null>(null);
  const [pointsAmount, setPointsAmount] = useState('');
  const [pointsNotes, setPointsNotes] = useState('');
  const [pointsAction, setPointsAction] = useState<'increase' | 'decrease'>('increase');
  const [activeTab, setActiveTab] = useState<'ambassadors' | 'leaderboard'>('ambassadors');

  useEffect(() => {
    const token = localStorage.getItem('caManagerToken');
    if (!token) {
      navigate('/CA-Manager');
      return;
    }
    fetchAmbassadors();
    fetchActivityLogs();
  }, [navigate]);

  const fetchAmbassadors = async () => {
    try {
      const token = localStorage.getItem('caManagerToken');
      const response = await fetch(`${API_BASE_URL}/ca-manager/ambassadors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAmbassadors(data.ambassadors);
      } else if (response.status === 401) {
        localStorage.removeItem('caManagerToken');
        localStorage.removeItem('caManagerData');
        navigate('/CA-Manager');
      } else {
        setError('Failed to fetch ambassadors');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const token = localStorage.getItem('caManagerToken');
      const response = await fetch(`${API_BASE_URL}/ca-manager/activity-logs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setActivityLogs(data.logs);
      }
    } catch (err) {
      console.error('Failed to fetch logs', err);
    }
  };

  const handlePointsUpdate = async () => {
    if (!selectedCA || !pointsAmount) return;

    try {
      const token = localStorage.getItem('caManagerToken');
      const response = await fetch(`${API_BASE_URL}/ca-manager/update-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mcaId: selectedCA.mcaId,
          points: parseInt(pointsAmount),
          action: pointsAction,
          notes: pointsNotes
        })
      });

      if (response.ok) {
        setShowPointsModal(false);
        setPointsAmount('');
        setPointsNotes('');
        setSelectedCA(null);
        fetchAmbassadors();
        fetchActivityLogs();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update points');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleToggleStatus = async (ca: CampusAmbassador) => {
    const action = ca.isActive ? 'dismiss' : 'activate';
    if (!confirm(`Are you sure you want to ${action} ${ca.name}?`)) return;

    try {
      const token = localStorage.getItem('caManagerToken');
      const response = await fetch(`${API_BASE_URL}/ca-manager/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mcaId: ca.mcaId
        })
      });

      if (response.ok) {
        fetchAmbassadors();
        fetchActivityLogs();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('caManagerToken');
    localStorage.removeItem('caManagerData');
    navigate('/CA-Manager');
  };

  if (loading) {
    return <div className="ca-dashboard-container">Loading...</div>;
  }

  return (
    <div className="ca-dashboard-container">
      <div className="ca-dashboard-header">
        <h1 className="ca-dashboard-title">CA Manager Dashboard</h1>
        <button onClick={handleLogout} className="ca-logout-button">
          Logout
        </button>
      </div>

      {error && <div className="ca-error-message">{error}</div>}

      <div className="ca-manager-tabs">
        <button
          className={`ca-tab-button ${activeTab === 'ambassadors' ? 'active' : ''}`}
          onClick={() => setActiveTab('ambassadors')}
        >
          Campus Ambassadors ({ambassadors.length})
        </button>
        <button
          className={`ca-tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="ca-leaderboard">
          {ambassadors.length === 0 ? (
            <div className="ca-no-data">
              <h3>No Campus Ambassadors Yet</h3>
              <p>The leaderboard will appear once Campus Ambassadors are registered.</p>
            </div>
          ) : (
            <>
              <div className="ca-desktop-only">
                <div className="ca-leaderboard-table">
                  {ambassadors
                    .filter(ca => ca.isActive)
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((ca, index) => (
                      <div key={ca._id} className={`ca-leaderboard-row ${index < 3 ? 'ca-top-three' : ''}`}>
                        <div className="ca-rank">
                          <span className="ca-rank-number">#{index + 1}</span>
                        </div>
                        <div className="ca-leaderboard-info">
                          <div className="ca-leaderboard-name">{ca.name}</div>
                          <div className="ca-leaderboard-details">
                            <span className="ca-leaderboard-id">{ca.mcaId}</span>
                            <span className="ca-leaderboard-separator">•</span>
                            <span className="ca-leaderboard-college">{ca.college}</span>
                          </div>
                        </div>
                        <div className="ca-leaderboard-stats">
                          <div className="ca-leaderboard-points">
                            <span className="ca-points-value">{ca.totalPoints}</span>
                            <span className="ca-points-label">Points</span>
                          </div>
                          <div className="ca-leaderboard-referrals">
                            <span className="ca-referrals-value">{ca.referrals.length}</span>
                            <span className="ca-referrals-label">Referrals</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="ca-mobile-only">
                {ambassadors
                  .filter(ca => ca.isActive)
                  .sort((a, b) => b.totalPoints - a.totalPoints)
                  .map((ca, index) => (
                    <div key={ca._id} className={`ca-leaderboard-card ${index < 3 ? 'ca-top-three' : ''}`}>
                      <div className="ca-leaderboard-card-header">
                        <div className="ca-rank-mobile">
                          <span className="ca-rank-number">#{index + 1}</span>
                        </div>
                        <div className="ca-leaderboard-points-mobile">
                          <span className="ca-points-value">{ca.totalPoints}</span>
                          <span className="ca-points-label">pts</span>
                        </div>
                      </div>
                      <div className="ca-leaderboard-card-body">
                        <h3>{ca.name}</h3>
                        <p className="ca-leaderboard-id">{ca.mcaId}</p>
                        <p className="ca-leaderboard-college">{ca.college}</p>
                        <div className="ca-leaderboard-referrals-mobile">
                          <span className="ca-referrals-value">{ca.referrals.length}</span> Referrals
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'ambassadors' && (
        <div className="ca-ambassadors-list">
          <div className="ca-desktop-only">
            <table className="ca-table">
              <thead>
                <tr>
                  <th>MCA ID</th>
                  <th>Reg. Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Points</th>
                  <th>Referrals</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ambassadors.map((ca) => (
                  <tr key={ca._id}>
                    <td>{ca.mcaId}</td>
                    <td>{ca.registrationNumber}</td>
                    <td>{ca.name}</td>
                    <td>{ca.email}</td>
                    <td>{ca.college}</td>
                    <td className="ca-points-cell">{ca.totalPoints}</td>
                    <td>{ca.referrals.length}</td>
                    <td>
                      <span className={`ca-status-badge ${ca.isActive ? 'active' : 'inactive'}`}>
                        {ca.isActive ? 'Active' : 'Dismissed'}
                      </span>
                    </td>
                    <td>
                      <div className="ca-action-buttons">
                        <button
                          className="ca-btn-increase"
                          onClick={() => {
                            setSelectedCA(ca);
                            setPointsAction('increase');
                            setShowPointsModal(true);
                          }}
                        >
                          +
                        </button>
                        <button
                          className="ca-btn-decrease"
                          onClick={() => {
                            setSelectedCA(ca);
                            setPointsAction('decrease');
                            setShowPointsModal(true);
                          }}
                        >
                          -
                        </button>
                        <button
                          className={ca.isActive ? 'ca-btn-dismiss' : 'ca-btn-activate'}
                          onClick={() => handleToggleStatus(ca)}
                        >
                          {ca.isActive ? 'Dismiss' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ca-mobile-only">
            {ambassadors.map((ca) => (
              <div key={ca._id} className="ca-ambassador-card">
                <div className="ca-card-header">
                  <div>
                    <h3>{ca.name}</h3>
                    <p className="ca-card-id">{ca.mcaId} | {ca.registrationNumber}</p>
                  </div>
                  <span className={`ca-status-badge ${ca.isActive ? 'active' : 'inactive'}`}>
                    {ca.isActive ? 'Active' : 'Dismissed'}
                  </span>
                </div>
                <div className="ca-card-body">
                  <div className="ca-card-row">
                    <span className="ca-card-label">Email:</span>
                    <span>{ca.email}</span>
                  </div>
                  <div className="ca-card-row">
                    <span className="ca-card-label">College:</span>
                    <span>{ca.college}</span>
                  </div>
                  <div className="ca-card-row">
                    <span className="ca-card-label">Points:</span>
                    <span className="ca-points-highlight">{ca.totalPoints}</span>
                  </div>
                  <div className="ca-card-row">
                    <span className="ca-card-label">Referrals:</span>
                    <span>{ca.referrals.length}</span>
                  </div>
                </div>
                <div className="ca-card-actions">
                  <button
                    className="ca-btn-increase"
                    onClick={() => {
                      setSelectedCA(ca);
                      setPointsAction('increase');
                      setShowPointsModal(true);
                    }}
                  >
                    Increase Points
                  </button>
                  <button
                    className="ca-btn-decrease"
                    onClick={() => {
                      setSelectedCA(ca);
                      setPointsAction('decrease');
                      setShowPointsModal(true);
                    }}
                  >
                    Decrease Points
                  </button>
                  <button
                    className={ca.isActive ? 'ca-btn-dismiss' : 'ca-btn-activate'}
                    onClick={() => handleToggleStatus(ca)}
                  >
                    {ca.isActive ? 'Dismiss' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {showPointsModal && selectedCA && (
        <div className="ca-modal-overlay" onClick={() => setShowPointsModal(false)}>
          <div className="ca-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {pointsAction === 'increase' ? 'Increase' : 'Decrease'} Points
            </h2>
            <p>Campus Ambassador: <strong>{selectedCA.name}</strong></p>
            <p>Current Points: <strong>{selectedCA.totalPoints}</strong></p>
            
            <div className="ca-form-group">
              <label>Points Amount *</label>
              <input
                type="number"
                min="1"
                value={pointsAmount}
                onChange={(e) => setPointsAmount(e.target.value)}
                placeholder="Enter points"
              />
            </div>

            <div className="ca-form-group">
              <label>Notes (optional)</label>
              <textarea
                value={pointsNotes}
                onChange={(e) => setPointsNotes(e.target.value)}
                placeholder="Reason for update"
                rows={3}
              />
            </div>

            <div className="ca-modal-buttons">
              <button
                className="ca-submit-button"
                onClick={handlePointsUpdate}
                disabled={!pointsAmount}
              >
                Confirm
              </button>
              <button
                className="ca-cancel-button"
                onClick={() => {
                  setShowPointsModal(false);
                  setPointsAmount('');
                  setPointsNotes('');
                  setSelectedCA(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CAManagerDashboard;
