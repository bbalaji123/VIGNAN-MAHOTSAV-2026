import React from 'react';
import './Login.css';

interface LoginProps {
  showLoginModal: boolean;
  onClose: () => void;
  loginFormData: {
    identifier: string;
    password: string;
  };
  setLoginFormData: React.Dispatch<
    React.SetStateAction<{
      identifier: string;
      password: string;
    }>
  >;
  onSubmitApi: (payload: any) => Promise<void>;
  isLoggingIn: boolean;
  loginMessage: { type: 'success' | 'error'; text: string } | null;
  setLoginMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({
  showLoginModal,
  onClose,
  loginFormData,
  setLoginFormData,
  onSubmitApi,
  isLoggingIn,
  loginMessage,
  setLoginMessage,
  onSignupClick
}) => {
  if (!showLoginModal) return null;

  /* ===============================
     Validation Function
     =============================== */
  const validateIdentifier = (value: string) => {
    const trimmed = value.trim().toUpperCase();

    const mahotsavIdRegex = /^MH26\d{6}$/; // MH26XXXXXX
    const regNoRegex = /^[A-Z0-9]{5,}$/;  // Generic Reg No

    if (mahotsavIdRegex.test(trimmed)) {
      return { type: 'mahotsavId', value: trimmed };
    }

    if (regNoRegex.test(trimmed)) {
      return { type: 'regNo', value: trimmed };
    }

    return null;
  };

  /* ===============================
     Input Change
     =============================== */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
  };

  /* ===============================
     Submit Handler
     =============================== */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateIdentifier(loginFormData.identifier);

    if (!result) {
      setLoginMessage({
        type: 'error',
        text: 'Enter a valid Registration Number or Mahotsav ID (MH26XXXXXX)'
      });
      return;
    }

    const payload =
      result.type === 'mahotsavId'
        ? { mahotsavId: result.value, password: loginFormData.password }
        : { regNo: result.value, password: loginFormData.password };

    try {
      await onSubmitApi(payload);
    } catch (error) {
      setLoginMessage({
        type: 'error',
        text: 'Login failed. Please try again.'
      });
    }
  };

  /* ===============================
     Overlay Click
     =============================== */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="login-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
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

            {/* Reg No / Mahotsav ID */}
            <div className="form-group">
              <label htmlFor="identifier">
                Registration No / Mahotsav ID
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={loginFormData.identifier}
                onChange={onInputChange}
                placeholder="Reg. No or MH26XXXXXX"
                className="form-input"
                required
              />
            </div>

            {/* Password */}
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

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? '⏳ Logging in...' : '🔑 Login'}
            </button>

            <div className="signup-link">
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="signup-btn"
                >
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
