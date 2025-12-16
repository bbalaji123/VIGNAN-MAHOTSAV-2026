import React from 'react';
import './Login.css';

interface LoginProps {
  showLoginModal: boolean;
  onClose: () => void;
  loginFormData: { email: string; password: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoggingIn: boolean;
  loginMessage: { type: 'success' | 'error'; text: string } | null;
  onForgotPasswordClick: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({
  showLoginModal,
  onClose,
  loginFormData,
  onInputChange,
  onSubmit,
  isLoggingIn,
  loginMessage,
  onForgotPasswordClick,
  onSignupClick
}) => {
  if (!showLoginModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header">
          <h2>Welcome Back!</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="login-modal-body">
          <form className="login-form" onSubmit={onSubmit}>
            {loginMessage && (
              <div className={`submit-message ${loginMessage.type}`}>
                {loginMessage.text}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email or Mahotsav ID</label>
              <input
                type="text"
                id="email"
                name="email"
                value={loginFormData.email}
                onChange={onInputChange}
                placeholder="Enter email or MH26XXXXXX"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginFormData.password}
                onChange={onInputChange}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <button 
                type="button" 
                onClick={onForgotPasswordClick} 
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" className="login-submit-btn" disabled={isLoggingIn}>
              {isLoggingIn ? '⏳ Logging in...' : '🔑 Login'}
            </button>
            <div className="signup-link">
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={onSignupClick} className="signup-btn">
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
