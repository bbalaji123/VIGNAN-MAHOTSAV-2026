import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CAModal.css';
import { API_BASE_URL } from './services/api';

const CAManagerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ca-manager/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('caManagerToken', data.token);
        localStorage.setItem('caManagerData', JSON.stringify(data.manager));
        navigate('/ca-manager/dashboard');
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
    <div className="ca-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="ca-modal-content ca-login-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="ca-modal-title" style={{ color: '#FFD700', marginBottom: '10px' }}>
          CA Manager Login
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Authorized Access Only
        </p>
        
        {error && <div className="ca-error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="ca-form">
          <div className="ca-form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="ca-form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="ca-submit-button"
            disabled={loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CAManagerLogin;
