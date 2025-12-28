import React, { useState } from 'react';
import './CAModal.css';

const API_BASE_URL = 'http://localhost:5000/api';

interface CASignupModalProps {
  onClose: () => void;
  onSignupSuccess: (caData: any) => void;
}

const CASignupModal: React.FC<CASignupModalProps> = ({ onClose, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: '',
    branch: '',
    state: '',
    district: '',
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return;
    }

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
          password: formData.password,
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
        localStorage.setItem('caToken', data.token);
        localStorage.setItem('caData', JSON.stringify(data.campusAmbassador));
        console.log('Stored CA Data:', localStorage.getItem('caData'));
        onSignupSuccess(data.campusAmbassador);
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

          <div className="ca-form-row">
            <div className="ca-form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Min 6 characters"
              />
            </div>

            <div className="ca-form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
              />
            </div>
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
            <label>College *</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              placeholder="Your college name"
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

          <div className="ca-form-row">
            <div className="ca-form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Your state"
              />
            </div>

            <div className="ca-form-group">
              <label>District *</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                placeholder="Your district"
              />
            </div>
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
