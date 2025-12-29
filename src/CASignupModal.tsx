import React, { useState, useEffect } from 'react';
import './CAModal.css';
import { API_BASE_URL } from './services/api';

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
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [generatedMCAId, setGeneratedMCAId] = useState('');
  
  // Dropdown data
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);

  // Load states, districts, and colleges on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [statesRes, districtsRes, collegesRes] = await Promise.all([
          fetch('/state.json'),
          fetch('/district.json'),
          fetch('/college.json')
        ]);
        
        const statesData = await statesRes.json();
        const districtsData = await districtsRes.json();
        const collegesData = await collegesRes.json();
        
        setStates(statesData);
        setDistricts(districtsData);
        setColleges(collegesData);
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

  // Filter colleges when state or district changes
  useEffect(() => {
    if (formData.state) {
      let filtered = colleges.filter(c => c.State.toUpperCase() === formData.state.toUpperCase());
      
      if (formData.district) {
        filtered = filtered.filter(c => c.District.toUpperCase() === formData.district.toUpperCase());
      }
      
      setFilteredColleges(filtered);
      // Reset college if district changes
      if (formData.district) {
        setFormData(prev => ({ ...prev, college: '' }));
      }
    } else {
      setFilteredColleges([]);
    }
  }, [formData.state, formData.district, colleges]);

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
      setError('Phone number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return;
    }

    if (!formData.dateOfBirth) {
      setError('Date of Birth is required');
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
          dateOfBirth: formData.dateOfBirth
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
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('CA Signup Network Error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCardClose = () => {
    setShowPasswordCard(false);
    onClose();
  };

  if (showPasswordCard) {
    return (
      <div className="ca-modal-overlay" onClick={handlePasswordCardClose}>
        <div className="ca-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center' }}>
          <button className="ca-modal-close" onClick={handlePasswordCardClose}>×</button>
          <h2 className="ca-modal-title" style={{ color: '#FFD700', marginBottom: '30px' }}>Registration Successful! 🎉</h2>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '30px', 
            borderRadius: '15px',
            marginBottom: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '1.5rem' }}>Your Campus Ambassador Credentials</h3>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
              <p style={{ color: '#FFD700', marginBottom: '5px', fontSize: '0.9rem' }}>MCA ID</p>
              <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{generatedMCAId}</p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              <p style={{ color: '#FFD700', marginBottom: '5px', fontSize: '0.9rem' }}>Password (Your DOB)</p>
              <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{generatedPassword}</p>
            </div>
          </div>
          
          <p style={{ color: '#FFD700', marginBottom: '20px', fontSize: '0.9rem' }}>
            ⚠️ Please save these credentials securely. You'll need them to login.
          </p>
          
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
            />
            <small style={{ color: '#FFD700', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
              Your password will be auto-generated from your DOB (DDMMYYYY)
            </small>
          </div>

          <div className="ca-form-group">
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(255, 215, 0, 0.3)' }}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.no} value={state.name}>
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
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(255, 215, 0, 0.3)' }}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((district) => (
                <option key={district.no} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ca-form-group">
            <label>College *</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              disabled={!formData.state}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid rgba(255, 215, 0, 0.3)' }}
            >
              <option value="">Select College</option>
              {filteredColleges.map((college) => (
                <option key={college.SNO} value={college.Name}>
                  {college.Name}
                </option>
              ))}
            </select>
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

          <button type="submit" className="ca-submit-button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CASignupModal;
