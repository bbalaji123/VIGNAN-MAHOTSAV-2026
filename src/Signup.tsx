import React, { useState, useEffect } from 'react';
import './Signup.css';
import './CAModal.css';
import LoadingAnimation from './components/LoadingAnimation';
import CollegeSelect from './components/CollegeSelect';
import type { SignupData } from './services/api';

interface SignupProps {
  showSignupModal: boolean;
  onClose: () => void;
  signupFormData: SignupData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCollegeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  signupStep: number;
  totalSteps: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  isSubmitting: boolean;
  submitMessage: { type: 'success' | 'error'; text: string } | null;
  onLoginClick: () => void;
  onOtherSelected?: (isOther: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({
  showSignupModal,
  onClose,
  signupFormData,
  onInputChange,
  onCollegeChange,
  onSubmit,
  signupStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  isSubmitting,
  submitMessage,
  onLoginClick,
  onOtherSelected
}) => {
  if (!showSignupModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Loading Animation - Full Screen Overlay */}
      {isSubmitting && (
        <LoadingAnimation 
          message="Creating your Mahotsav account..." 
          size={220}
          fullScreen
        />
      )}
      
      <div className="ca-modal-overlay" onClick={handleOverlayClick}>
        <div className="ca-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="login-modal-header">
          <h2 className="ca-modal-title">Join Mahotsav 2026</h2>
          <button className="signup-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="signup-modal-body">
          <form className="ca-form" onSubmit={onSubmit}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
            
            {/* Single-step form: show all fields together like CA signup */}
            <div className="form-section">
              <h3>PERSONAL INFORMATION</h3>
              <div className="ca-form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signupFormData.name}
                  onChange={onInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="ca-form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupFormData.email}
                  onChange={onInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="ca-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={signupFormData.phone}
                  onChange={onInputChange}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={signupFormData.dateOfBirth || ''}
                  onChange={onInputChange}
                  placeholder="dd-mm-yyyy"
                  max={(() => {
                    const today = new Date();
                    const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
                    return maxDate.toISOString().split('T')[0];
                  })()}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    const selectedDate = new Date(target.value);
                    const today = new Date();
                    const age = today.getFullYear() - selectedDate.getFullYear();
                    if (age < 10) {
                      target.setCustomValidity('You must be at least 10 years old to register');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('');
                  }}
                  required
                />
                <small style={{ color: '#FFD700', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>Your password will be auto-generated from your DOB (DDMMYYYY)</small>
              </div>
              <div className="ca-form-group">
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={signupFormData.gender || ''}
                  onChange={onInputChange}
                  className="gender-select"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <AcademicInfoStep
              signupFormData={signupFormData}
              onInputChange={onInputChange}
              onCollegeChange={onCollegeChange}
              onOtherSelected={onOtherSelected}
            />

            <div className="signup-navigation" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                className="ca-submit-button"
                disabled={isSubmitting}
                style={{ maxWidth: '320px', width: '100%' }}
              >
                {isSubmitting ? 'Signing you up...' : 'Create Account & Get Mahotsav ID'}
              </button>
            </div>
            
            <div className="login-link">
              <p>
                Already have an account?{' '}
                <button type="button" onClick={onLoginClick} className="login-btn-link">
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

// Academic Info Step Component with State and District dropdowns
interface AcademicInfoStepProps {
  signupFormData: SignupData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCollegeChange: (value: string) => void;
  onOtherSelected?: (isOther: boolean) => void;
}

const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({
  signupFormData,
  onInputChange,
  onCollegeChange,
  onOtherSelected
}) => {
  const [states, setStates] = useState<Array<{ no: string; name: string }>>([]);
  const [districts, setDistricts] = useState<Array<{ no: string; sno: string; name: string }>>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<Array<{ no: string; sno: string; name: string }>>([]);

  useEffect(() => {
    // Load states from backend API
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/location/states`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setStates(response.data);
        }
      })
      .catch(err => console.error('Error loading states:', err));

    // Load all districts from backend API
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/location/districts`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setDistricts(response.data);
        }
      })
      .catch(err => console.error('Error loading districts:', err));
  }, []);

  useEffect(() => {
    // Filter districts based on selected state
    if (signupFormData.state && districts.length > 0) {
      const selectedState = states.find(s => s.name === signupFormData.state);
      if (selectedState) {
        const filtered = districts.filter(d => d.sno === selectedState.no);
        setFilteredDistricts(filtered);
      }
    } else {
      setFilteredDistricts([]);
    }
  }, [signupFormData.state, districts, states]);

  return (
    <div className="form-section">
      <h3>ACADEMIC INFORMATION</h3>
      <div className="ca-form-group">
        <label htmlFor="state">State *</label>
        <select
          id="state"
          name="state"
          value={signupFormData.state || ''}
          onChange={onInputChange}
          className="form-input form-select"
          required
        >
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state.no} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="ca-form-group">
        <label htmlFor="district">District *</label>
        <select
          id="district"
          name="district"
          value={signupFormData.district || ''}
          onChange={onInputChange}
          className="form-input form-select"
          required
          disabled={!signupFormData.state}
        >
          <option value="">Select District</option>
          {filteredDistricts.map(district => (
            <option key={district.no} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="ca-form-group">
        <label htmlFor="college">College *</label>
        <CollegeSelect
          onChange={onCollegeChange}
          selectedState={signupFormData.state || ''}
          selectedDistrict={signupFormData.district || ''}
          onOtherSelected={onOtherSelected}
          required
        />
      </div>
      <div className="ca-form-group">
        <label htmlFor="registerId">College Registration Number</label>
        <input
          type="text"
          id="registerId"
          name="registerId"
          value={signupFormData.registerId || ''}
          onChange={onInputChange}
          placeholder="Your college/university registration ID"
          className="form-input"
        />
      </div>
      <div className="ca-form-group">
        <label htmlFor="branch">Branch</label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={signupFormData.branch || ''}
          onChange={onInputChange}
          placeholder="Enter your branch"
          className="form-input"
        />
      </div>
      <div className="ca-form-group">
        <label htmlFor="referralCode">Referral Code (Optional)</label>
        <input
          type="text"
          id="referralCode"
          name="referralCode"
          value={signupFormData.referralCode || ''}
          onChange={onInputChange}
          placeholder="Enter CA referral code (e.g., MCA260001)"
          className="form-input"
          style={{ textTransform: 'uppercase' }}
        />
      </div>
    </div>
  );
};

export default Signup;
