import React, { useState } from 'react';
import './CAModal.css';
import { API_BASE_URL } from './services/api';

interface CALoginModalProps {
  onClose: () => void;
  onLoginSuccess: (caData: any) => void;
}

const CALoginModal: React.FC<CALoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Generate password from DOB (DDMMYYYY format)
    if (!formData.dateOfBirth) {
      setError('Please enter your date of birth');
      return;
    }

    const dob = new Date(formData.dateOfBirth);
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = dob.getFullYear();
    const password = `${day}${month}${year}`;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/campus-ambassador/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('CA Login Success:', data);
        localStorage.setItem('caToken', data.token);
        localStorage.setItem('caData', JSON.stringify(data.campusAmbassador));
        console.log('Stored CA Data:', localStorage.getItem('caData'));
        onLoginSuccess(data.campusAmbassador);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-modal-overlay" onClick={onClose}>
      <div className="ca-modal-content ca-login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ca-modal-close" onClick={onClose}>×</button>
        <h2 className="ca-modal-title">Campus Ambassador Login</h2>
        
        {error && <div className="ca-error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="ca-form">
          <div className="ca-form-group">
            <label>MCA ID or Email *</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              placeholder="Enter your MCA ID or email"
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
              max={new Date().toISOString().split('T')[0]}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <button type="submit" className="ca-submit-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CALoginModal;
