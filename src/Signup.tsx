import React, { useState, useEffect } from 'react';
import './Signup.css';
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
  onLoginClick
}) => {
  if (!showSignupModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="signup-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Loading Animation Overlay */}
        {isSubmitting && (
          <div className="signup-loading-overlay">
            <LoadingAnimation 
              message="Creating your Mahotsav account..." 
              size={200}
            />
          </div>
        )}
        
        <div className="login-modal-header">
          <h2>Join Mahotsav 2026</h2>
          <button className="signup-close-btn" onClick={onClose}>×</button>
        </div>
        
        {/* Progress Steps */}
        <div className="signup-steps-indicator">
          <div className={`step ${signupStep >= 1 ? 'active' : ''} ${signupStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">{signupStep > 1 ? '✓' : '1'}</div>
            <div className="step-label">Personal Info</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${signupStep >= 2 ? 'active' : ''} ${signupStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">{signupStep > 2 ? '✓' : '2'}</div>
            <div className="step-label">Academic Info</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${signupStep >= 3 ? 'active' : ''} ${signupStep > 3 ? 'completed' : ''}`}>
            <div className="step-number">{signupStep > 3 ? '✓' : '3'}</div>
            <div className="step-label">Contact Info</div>
          </div>
        </div>

        <div className="signup-modal-body">
          <form className="signup-form" onSubmit={onSubmit}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
            
            {/* Step 1: Personal Information */}
            {signupStep === 1 && (
              <div className="form-section">
                <h3>👤 Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={signupFormData.name}
                      onChange={onInputChange}
                      placeholder="Enter your full name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth * (Your Password)</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={signupFormData.dateOfBirth || ''}
                      onChange={onInputChange}
                      className="form-input"
                      placeholder="DD/MM/YYYY"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    value={signupFormData.gender || ''}
                    onChange={onInputChange}
                    className="form-input form-select"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {signupStep === 2 && (
              <AcademicInfoStep
                signupFormData={signupFormData}
                onInputChange={onInputChange}
                onCollegeChange={onCollegeChange}
              />
            )}

            {/* Step 3: Contact Information */}
            {signupStep === 3 && (
              <div className="form-section">
                <h3>📞 Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={signupFormData.email}
                      onChange={onInputChange}
                      placeholder="your.email@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={signupFormData.phone}
                      onChange={onInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="signup-navigation">
              {signupStep > 1 && (
                <button 
                  type="button" 
                  className="signup-prev-btn"
                  onClick={onPrevStep}
                >
                  ← Previous
                </button>
              )}
              
              {signupStep < totalSteps ? (
                <button 
                  type="button" 
                  className="signup-next-btn"
                  onClick={onNextStep}
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="signup-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Creating Account...' : '🎉 Create Account & Get Mahotsav ID'}
                </button>
              )}
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
  );
};

// Academic Info Step Component with State and District dropdowns
interface AcademicInfoStepProps {
  signupFormData: SignupData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCollegeChange: (value: string) => void;
}

const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({
  signupFormData,
  onInputChange,
  onCollegeChange
}) => {
  const [states, setStates] = useState<Array<{ no: string; name: string }>>([]);
  const [districts, setDistricts] = useState<Array<{ no: string; sno: string; name: string }>>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<Array<{ no: string; sno: string; name: string }>>([]);

  useEffect(() => {
    // Load states
    fetch('/state.json')
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error('Error loading states:', err));

    // Load districts
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data))
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
      <h3>🎓 Academic Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="registerId">Register ID</label>
          <input
            type="text"
            id="registerId"
            name="registerId"
            value={signupFormData.registerId || ''}
            onChange={onInputChange}
            placeholder="Enter your register ID"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="college">College Name *</label>
          <CollegeSelect
            value={signupFormData.college || ''}
            onChange={onCollegeChange}
            required
          />
        </div>
        <div className="form-group">
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
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            name="state"
            value={signupFormData.state || ''}
            onChange={onInputChange}
            className="form-input form-select"
            required
          >
            <option value="">-- Select your state --</option>
            {states.map(state => (
              <option key={state.no} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
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
            <option value="">-- Select your district --</option>
            {filteredDistricts.map(district => (
              <option key={district.no} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="referenceId">Referal code</label>
        <input
          type="text"
          id="referenceId"
          name="referenceId"
          value={signupFormData.referenceId || ''}
          onChange={onInputChange}
          placeholder="Enter referal code (optional)"
          className="form-input"
        />
      </div>
    </div>
  );
};

export default Signup;
