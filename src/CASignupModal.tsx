import React, { useState, useEffect } from 'react';
import './CAModal.css';
import { API_BASE_URL } from './services/api';
import CollegeSelect from './components/CollegeSelect';

interface CASignupModalProps {
  onClose: () => void;
  onSignupSuccess: (caData: any) => void;
}

interface State {
  no: string;
  name: string;
}

interface District {
  no: string;
  name: string;
  sno: string; // state number reference
}

interface College {
  SNO: number;
  Name: string;
  State: string;
  District: string;
}

const CASignupModal: React.FC<CASignupModalProps> = ({ onClose, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    state: '',
    district: '',
    dateOfBirth: '',
    referralCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [generatedMCAId, setGeneratedMCAId] = useState('');
  
  // Dropdown data
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [isOtherCollege, setIsOtherCollege] = useState(false);

  // Load states, districts, and colleges on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [statesRes, districtsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/location/states`),
          fetch(`${API_BASE_URL}/location/districts`)
        ]);
        
        const statesResponse = await statesRes.json();
        const districtsResponse = await districtsRes.json();
        
        setStates(statesResponse.data || []);
        setDistricts(districtsResponse.data || []);
      } catch (error) {
        console.error('Error loading dropdown data:', error);
      }
    };
    
    loadData();
  }, []);

  // Filter districts when state changes
  useEffect(() => {
    if (formData.state) {
      // Find the selected state to get its "no" (state number)
      const selectedState = states.find(s => s.name === formData.state);
      if (selectedState) {
        const filtered = districts.filter(d => d.sno === selectedState.no);
        setFilteredDistricts(filtered);
      } else {
        setFilteredDistricts([]);
      }
      // Reset district and college if state changes
      setFormData(prev => ({ ...prev, district: '', college: '' }));
    } else {
      setFilteredDistricts([]);
    }
  }, [formData.state, districts, states]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Phone number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Invalid email address');
      return;
    }

    if (!formData.dateOfBirth) {
      alert('Date of Birth is required');
      return;
    }

    // Generate password from DOB (DDMMYYYY format)
    const dob = new Date(formData.dateOfBirth);
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = dob.getFullYear();
    const password = `${day}${month}${year}`;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/campus-ambassador/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: password,
          phone: formData.phone,
          college: formData.college,
          branch: formData.branch,
          state: formData.state,
          district: formData.district,
          dateOfBirth: formData.dateOfBirth,
          referralCode: formData.referralCode.trim() || undefined
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('CA Signup Success:', data);
        
        // Store the generated password and MCA ID
        setGeneratedPassword(password);
        setGeneratedMCAId(data.campusAmbassador.mcaId || data.mcaId);
        
        // Show password card instead of proceeding to login
        setShowPasswordCard(true);
      } else {
        console.error('CA Signup Error:', data);
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('CA Signup Network Error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCardClose = () => {
    setShowPasswordCard(false);
    onClose();
  };

  if (showPasswordCard) {
    // Format password as date for display
    const formatPasswordAsDate = (password: string) => {
      if (password.length === 8) {
        const day = password.substring(0, 2);
        const month = password.substring(2, 4);
        const year = password.substring(4, 8);
        return `${day}/${month}/${year}`;
      }
      return password;
    };

    return (
      <div className="ca-modal-overlay" onClick={handlePasswordCardClose}>
        <div className="ca-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center' }}>
          <button className="ca-modal-close" onClick={handlePasswordCardClose}>×</button>
          <h2 className="ca-modal-title" style={{ color: '#FFD700', marginBottom: '30px' }}>Registration Successful!</h2>
          
          <div className="ca-credentials-box" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '30px', 
            borderRadius: '15px',
            marginBottom: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '3px solid #FFD700',
            animation: 'blinkBorder 1.5s infinite'
          }}>
            <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '1.5rem' }}>Your Campus Ambassador Credentials</h3>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
              <p style={{ color: '#FFD700', marginBottom: '5px', fontSize: '0.9rem' }}>MCA ID</p>
              <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{generatedMCAId}</p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
              <p style={{ color: '#FFD700', marginBottom: '5px', fontSize: '0.9rem' }}>Password (Your DOB)</p>
              <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{formatPasswordAsDate(generatedPassword)}</p>
            </div>
            
            <p style={{ color: '#fff', fontSize: '0.95rem', background: 'rgba(255, 215, 0, 0.15)', padding: '12px', borderRadius: '8px', margin: '0' }}>
              Please save these credentials securely. You'll need them to login.
            </p>
          </div>
          
          <button 
            onClick={handlePasswordCardClose}
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Got it! Take me to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ca-modal-overlay" onClick={onClose}>
      <div className="ca-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="ca-modal-close" onClick={onClose}>×</button>
        <h2 className="ca-modal-title">Campus Ambassador Signup</h2>
        
        {error && <div className="ca-error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="ca-form">
          <div className="ca-form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="ca-form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="ca-form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="10-digit phone number"
              maxLength={10}
            />
          </div>

          <div className="ca-form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max="2010-12-31"
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                if (!target.value) {
                  target.defaultValue = '2009-01-01';
                  try {
                    target.showPicker();
                  } catch (err) {
                    // Fallback for browsers that don't support showPicker
                  }
                }
              }}
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                const selectedDate = new Date(target.value);
                const maxDate = new Date('2010-12-31');
                if (selectedDate > maxDate) {
                  target.setCustomValidity('Date must be before 2011 (Campus Ambassadors must be at least 17 years old)');
                } else {
                  target.setCustomValidity('Please select your date of birth');
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity('');
              }}
              style={{
                colorScheme: 'dark',
                cursor: 'pointer'
              }}
            />
            <small style={{ color: '#FFD700', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
              Your password will be auto-generated from your DOB (DDMMYYYY). Must be born before 2011.
            </small>
          </div>

          <div className="ca-form-group">
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(255, 215, 0, 0.3)', color: '#ffffff', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.no} value={state.name} style={{ color: '#000' }}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ca-form-group">
            <label>District *</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              disabled={!formData.state}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(255, 215, 0, 0.3)', color: '#ffffff', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((district) => (
                <option key={district.no} value={district.name} style={{ color: '#000' }}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ca-form-group">
            <label>College *</label>
            <CollegeSelect
              onChange={(value) => setFormData({ ...formData, college: value })}
              required={true}
              selectedState={formData.state}
              selectedDistrict={formData.district}
              onOtherSelected={(isOther) => setIsOtherCollege(isOther)}
            />
          </div>

          <div className="ca-form-group">
            <label>Branch/Department *</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              placeholder="E.g., CSE, ECE, etc."
            />
          </div>

          <div className="ca-form-group">
            <label>Referral Code (Optional)</label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter referral MCA ID (if any)"
              style={{ textTransform: 'uppercase' }}
            />
            <small style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
              Enter the MCA ID of the Campus Ambassador who referred you
            </small>
          </div>

          <button type="submit" className="ca-submit-button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CASignupModal;
